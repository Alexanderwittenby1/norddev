import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_BASE_PATH,
  ADMIN_LOGIN_PATH,
  GITHUB_TOKEN_COOKIE,
  ORG_RECHECK_AFTER_MS,
  SESSION_COOKIE,
} from "@/lib/auth/config";
import { checkOrgMembership } from "@/lib/auth/github";
import { sanitizeReturnTo } from "@/lib/auth/request";
import {
  expiredCookieOptions,
  readGitHubTokenFromCookieValue,
  readSessionFromCookieValue,
  reissueSessionCookie,
  sessionCookieNames,
  type NdevSession,
} from "@/lib/auth/session-core";

/** When a GitHub outage stops us confirming membership, retry soon rather than hourly. */
const ORG_RECHECK_RETRY_MS = 5 * 60 * 1000;

const ADMIN_API_PATH = "/api/ndev";

const ADMIN_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
};

function withAdminHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(ADMIN_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

function isAdminApiRequest(pathname: string): boolean {
  return pathname === ADMIN_API_PATH || pathname.startsWith(`${ADMIN_API_PATH}/`);
}

function isLoginPath(pathname: string): boolean {
  return pathname === ADMIN_LOGIN_PATH || pathname === `${ADMIN_LOGIN_PATH}/`;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRequest = isAdminApiRequest(pathname);

  const session = await readSessionFromCookieValue(
    request.cookies.get(SESSION_COOKIE)?.value
  );

  if (isLoginPath(pathname)) {
    // The login page is public, but no need to show it to a signed-in member.
    if (!session) return withAdminHeaders(NextResponse.next());
    return withAdminHeaders(NextResponse.redirect(new URL(ADMIN_BASE_PATH, request.url), 302));
  }

  if (!session) return deny(request, isApiRequest);

  if (isMembershipCheckStale(session.orgCheckedAt)) {
    const refreshed = await refreshMembership(request, session);
    if (refreshed === null) return deny(request, isApiRequest);
    return withAdminHeaders(refreshed);
  }

  return withAdminHeaders(NextResponse.next());
}

/**
 * Re-confirms org membership for sessions older than the recheck window, so
 * removing someone from the GitHub org locks them out within the hour.
 * Returns null when the session must be revoked.
 */
async function refreshMembership(
  request: NextRequest,
  session: NdevSession
): Promise<NextResponse | null> {
  const githubToken = await readGitHubTokenFromCookieValue(
    request.cookies.get(GITHUB_TOKEN_COOKIE)?.value
  );

  // Without a stored token we cannot re-verify, so require a fresh login.
  if (!githubToken) return null;

  let membership: Awaited<ReturnType<typeof checkOrgMembership>>;
  try {
    membership = await checkOrgMembership(githubToken);
  } catch (error) {
    console.error(`[ndev/auth] Membership re-check failed for ${session.login}:`, error);
    membership = "unknown";
  }

  if (membership === "not_member") {
    console.warn(`[ndev/auth] Revoked ${session.login}: no longer in ${session.org}.`);
    return null;
  }

  const orgCheckedAt =
    membership === "member"
      ? Date.now()
      : // Unknown: keep the member in, but look again shortly.
        Date.now() - (ORG_RECHECK_AFTER_MS - ORG_RECHECK_RETRY_MS);

  const cookie = await reissueSessionCookie({ ...session, orgCheckedAt });
  const response = NextResponse.next();
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}

function isMembershipCheckStale(orgCheckedAt: number | undefined): boolean {
  if (typeof orgCheckedAt !== "number") return true;
  return Date.now() - orgCheckedAt > ORG_RECHECK_AFTER_MS;
}

function deny(request: NextRequest, isApiRequest: boolean): NextResponse {
  if (isApiRequest) {
    return new NextResponse(
      JSON.stringify({ success: false, error: "unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
  const returnTo = sanitizeReturnTo(request.nextUrl.pathname + request.nextUrl.search);
  if (returnTo !== ADMIN_BASE_PATH) {
    loginUrl.searchParams.set("returnTo", returnTo);
  }

  const response = NextResponse.redirect(loginUrl, 302);
  for (const name of sessionCookieNames()) {
    response.cookies.set(name, "", expiredCookieOptions());
  }
  return withAdminHeaders(response);
}

// Must be a static value: Next.js reads this at build time.
export const config = {
  matcher: ["/ndev/:path*", "/api/ndev/:path*"],
};
