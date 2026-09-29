export const ADMIN_BASE_PATH = "/ndev";
export const ADMIN_LOGIN_PATH = `${ADMIN_BASE_PATH}/login`;

export const GITHUB_ORG = (process.env.GITHUB_ORG ?? "Nordendev").trim();

/** How long an /ndev session stays valid before it must be re-issued by a new login. */
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

/** How long the in-flight OAuth state + PKCE verifier may live in the browser. */
export const OAUTH_TTL_SECONDS = 60 * 10;

/**
 * While a session is younger than this, trust the membership check made at login.
 * Older sessions get their GitHub org membership re-verified in middleware, so
 * removing someone from the org locks them out within this window.
 */
export const ORG_RECHECK_AFTER_MS = 60 * 60 * 1000;

export const SESSION_COOKIE = "ndev_session";
export const GITHUB_TOKEN_COOKIE = "ndev_gh_token";
export const OAUTH_STATE_COOKIE = "ndev_oauth_state";

export const SESSION_AUDIENCE = "ndev:session";
export const OAUTH_AUDIENCE = "ndev:oauth";
export const TOKEN_AUDIENCE = "ndev:github-token";

export const SESSION_ISSUER = "nordiskdev";

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function requireAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET is not set. Generate one with: openssl rand -base64 32"
    );
  }
  if (secret.length < 32) {
    throw new Error("AUTH_SECRET must be at least 32 characters long.");
  }
  return secret;
}
