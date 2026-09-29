import { NextResponse, type NextRequest } from "next/server";
import {
  GITHUB_ORG,
  OAUTH_AUDIENCE,
  OAUTH_STATE_COOKIE,
  isProduction,
} from "@/lib/auth/config";
import {
  checkOrgMembership,
  exchangeCodeForToken,
  fetchGitHubUser,
} from "@/lib/auth/github";
import { sanitizeReturnTo } from "@/lib/auth/request";
import { issueSessionCookies } from "@/lib/auth/session-core";
import { KEY_PURPOSE, constantTimeEqual, unseal } from "@/lib/auth/token";

export const dynamic = "force-dynamic";

type OAuthState = {
  state: string;
  codeVerifier: string;
  returnTo: string;
};

/**
 * Step 2 of the GitHub login. Every branch fails closed: a session is only ever
 * minted after `state` matches, the code exchanges successfully, and GitHub
 * confirms the user is an active member of the NordiskDev org.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");

  const sealedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  /** Redirects to the login page, always consuming the state cookie. */
  const fail = (reason: string) => {
    const response = NextResponse.redirect(
      new URL(`/ndev/login?error=${reason}`, url.origin),
      302
    );
    response.cookies.set(OAUTH_STATE_COOKIE, "", {
      path: "/api/auth/github",
      maxAge: 0,
      httpOnly: true,
      secure: isProduction(),
      sameSite: "lax",
    });
    return response;
  };

  if (oauthError) return fail("access_denied");
  if (!code || !state) return fail("invalid_state");

  const stored = await unseal<OAuthState>(sealedState, {
    purpose: KEY_PURPOSE.oauth,
    audience: OAUTH_AUDIENCE,
  });
  if (!stored || typeof stored.state !== "string" || typeof stored.codeVerifier !== "string") {
    return fail("invalid_state");
  }

  // Constant-time compare so the check does not leak the state byte by byte.
  if (!constantTimeEqual(state, stored.state)) return fail("invalid_state");

  let accessToken: string;
  let user: Awaited<ReturnType<typeof fetchGitHubUser>>;
  let membership: Awaited<ReturnType<typeof checkOrgMembership>>;

  try {
    accessToken = await exchangeCodeForToken({ code, codeVerifier: stored.codeVerifier });
    user = await fetchGitHubUser(accessToken);
    membership = await checkOrgMembership(accessToken);
  } catch (error) {
    console.error("[ndev/auth] GitHub sign-in failed:", error);
    return fail("signin_unavailable");
  }

  if (membership === "not_member") {
    console.warn(`[ndev/auth] Denied ${user.login}: not an active member of ${GITHUB_ORG}.`);
    return fail("not_member");
  }
  if (membership !== "member") {
    // Could not prove membership (rate limit, GitHub outage). Deny rather than guess.
    console.error(`[ndev/auth] Could not confirm org membership for ${user.login}.`);
    return fail("signin_unavailable");
  }

  const sessionCookies = await issueSessionCookies(user, GITHUB_ORG, accessToken);
  const destination = sanitizeReturnTo(stored.returnTo);
  const response = NextResponse.redirect(new URL(destination, url.origin), 302);

  for (const cookie of sessionCookies) {
    response.cookies.set(cookie.name, cookie.value, cookie.options);
  }
  response.cookies.set(OAUTH_STATE_COOKIE, "", {
    path: "/api/auth/github",
    maxAge: 0,
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
  });

  return response;
}
