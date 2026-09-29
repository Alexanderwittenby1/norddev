import { NextResponse } from "next/server";
import {
  GITHUB_TOKEN_COOKIE,
  OAUTH_AUDIENCE,
  OAUTH_STATE_COOKIE,
  OAUTH_TTL_SECONDS,
  SESSION_COOKIE,
  isProduction,
} from "@/lib/auth/config";
import { buildAuthorizeUrl } from "@/lib/auth/github";
import { sanitizeReturnTo } from "@/lib/auth/request";
import { KEY_PURPOSE, pkceChallenge, randomToken, seal } from "@/lib/auth/token";

export const dynamic = "force-dynamic";

/**
 * Step 1 of the GitHub login: mints a single-use `state`, a PKCE verifier and a
 * return target, seals them into a short-lived HttpOnly cookie, then bounces the
 * browser to GitHub. Nothing in the URL is trusted on the way back.
 */
export async function GET(request: Request) {
  const returnTo = sanitizeReturnTo(
    new URL(request.url).searchParams.get("returnTo")
  );

  const state = randomToken(32);
  // 64 random bytes base64url-encode to 86 characters, inside the 43-128 range
  // PKCE allows.
  const codeVerifier = randomToken(64);
  const codeChallenge = await pkceChallenge(codeVerifier);

  const sealedState = await seal({ state, codeVerifier, returnTo }, {
    purpose: KEY_PURPOSE.oauth,
    audience: OAUTH_AUDIENCE,
    ttlSeconds: OAUTH_TTL_SECONDS,
  });

  const response = NextResponse.redirect(buildAuthorizeUrl({ state, codeChallenge }), 302);

  response.cookies.set(OAUTH_STATE_COOKIE, sealedState, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    // Narrowed to the callback so no other route can read the verifier.
    path: "/api/auth/github",
    maxAge: OAUTH_TTL_SECONDS,
  });

  // Drop any existing session so re-logging-in cannot inherit a stale one.
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  response.cookies.set(GITHUB_TOKEN_COOKIE, "", { path: "/", maxAge: 0 });

  return response;
}
