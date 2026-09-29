import {
  GITHUB_TOKEN_COOKIE,
  SESSION_AUDIENCE,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  TOKEN_AUDIENCE,
  isProduction,
} from "./config";
import { KEY_PURPOSE, seal, unseal } from "./token";
import type { GitHubUser } from "./github";

export type NdevSession = {
  /** GitHub numeric user id. Stable, unlike the login, which users can rename. */
  sub: number;
  login: string;
  name: string;
  avatarUrl: string;
  org: string;
  /** Epoch ms of the last confirmed GitHub org membership check. */
  orgCheckedAt: number;
  iat?: number;
  exp?: number;
};

export type CookieDescriptor = {
  name: string;
  value: string;
  options: {
    httpOnly: true;
    secure: boolean;
    sameSite: "lax";
    path: string;
    maxAge: number;
  };
};

function sessionCookieOptions() {
  return {
    httpOnly: true as const,
    secure: isProduction(),
    // "lax" still sends the cookie on the top-level GET redirect back from
    // GitHub, but blocks it on cross-site POSTs.
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

/**
 * Builds the cookies that grant /ndev access. The GitHub access token is stored
 * in its own encrypted cookie purely so membership can be re-checked later; it
 * is never exposed to client-side JavaScript and never leaves the server.
 */
export async function issueSessionCookies(
  user: GitHubUser,
  org: string,
  githubAccessToken: string
): Promise<CookieDescriptor[]> {
  const now = Date.now();

  const session: NdevSession = {
    sub: user.id,
    login: user.login,
    name: user.name,
    avatarUrl: user.avatarUrl,
    org,
    orgCheckedAt: now,
  };

  const [sessionValue, tokenValue] = await Promise.all([
    seal(session as unknown as Record<string, unknown>, {
      purpose: KEY_PURPOSE.session,
      audience: SESSION_AUDIENCE,
      ttlSeconds: SESSION_TTL_SECONDS,
    }),
    seal({ token: githubAccessToken }, {
      purpose: KEY_PURPOSE.githubToken,
      audience: TOKEN_AUDIENCE,
      ttlSeconds: SESSION_TTL_SECONDS,
    }),
  ]);

  const options = sessionCookieOptions();

  return [
    { name: SESSION_COOKIE, value: sessionValue, options },
    { name: GITHUB_TOKEN_COOKIE, value: tokenValue, options },
  ];
}

/** Re-issues only the session cookie, e.g. after a successful membership re-check. */
export async function reissueSessionCookie(session: NdevSession): Promise<CookieDescriptor> {
  const value = await seal(session as unknown as Record<string, unknown>, {
    purpose: KEY_PURPOSE.session,
    audience: SESSION_AUDIENCE,
    ttlSeconds: SESSION_TTL_SECONDS,
  });

  return { name: SESSION_COOKIE, value, options: sessionCookieOptions() };
}

export function readSessionFromCookieValue(value: string | undefined | null): Promise<NdevSession | null> {
  return unseal<NdevSession>(value, {
    purpose: KEY_PURPOSE.session,
    audience: SESSION_AUDIENCE,
  });
}

export function readGitHubTokenFromCookieValue(
  value: string | undefined | null
): Promise<string | null> {
  return unseal<{ token?: unknown }>(value, {
    purpose: KEY_PURPOSE.githubToken,
    audience: TOKEN_AUDIENCE,
  }).then((payload) => (typeof payload?.token === "string" ? payload.token : null));
}

export function sessionCookieNames(): string[] {
  return [SESSION_COOKIE, GITHUB_TOKEN_COOKIE];
}

/** Cookie options that immediately expire a cookie with the given name. */
export function expiredCookieOptions() {
  return {
    httpOnly: true as const,
    secure: isProduction(),
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}
