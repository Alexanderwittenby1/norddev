import { GITHUB_ORG, isProduction } from "./config";

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_API_URL = "https://api.github.com";

/**
 * read:org is the only scope we request. It is the minimum needed to call
 * /user/memberships/orgs, and it grants no write access to the organisation.
 */
const SCOPE = "read:org";

const REQUEST_TIMEOUT_MS = 10_000;

function requireClientCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must both be set to sign in with GitHub."
    );
  }
  return { clientId, clientSecret };
}

export function getRedirectUri(): string {
  const configured = process.env.GITHUB_REDIRECT_URI;
  if (configured) return configured;

  if (isProduction()) {
    throw new Error(
      "GITHUB_REDIRECT_URI must be set in production so the OAuth callback target is pinned."
    );
  }
  return "http://localhost:3000/api/auth/github/callback";
}

export function buildAuthorizeUrl(params: {
  state: string;
  codeChallenge: string;
}): string {
  const { clientId } = requireClientCredentials();
  const url = new URL(GITHUB_AUTHORIZE_URL);

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", getRedirectUri());
  url.searchParams.set("scope", SCOPE);
  url.searchParams.set("state", params.state);
  url.searchParams.set("code_challenge", params.codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  // Always land on the GitHub auth screen instead of silently reusing a
  // still-valid github.com session.
  url.searchParams.set("prompt", "select_account");

  return url.toString();
}

export async function exchangeCodeForToken(params: {
  code: string;
  codeVerifier: string;
}): Promise<string> {
  const { clientId, clientSecret } = requireClientCredentials();

  const response = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: getRedirectUri(),
      code: params.code,
      code_verifier: params.codeVerifier,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub token exchange failed with status ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (typeof payload !== "object" || payload === null) {
    throw new Error("GitHub token exchange returned an unexpected payload.");
  }

  const body = payload as { access_token?: unknown; error?: unknown };
  if (typeof body.access_token !== "string" || body.access_token.length === 0) {
    const reason = typeof body.error === "string" ? body.error : "unknown_error";
    throw new Error(`GitHub token exchange returned no access token (${reason}).`);
  }

  return body.access_token;
}

export type GitHubUser = {
  id: number;
  login: string;
  name: string;
  avatarUrl: string;
};

export async function fetchGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_URL}/user`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not read the GitHub profile (status ${response.status}).`);
  }

  const body = (await response.json()) as {
    id?: unknown;
    login?: unknown;
    name?: unknown;
    avatar_url?: unknown;
  };

  if (typeof body.id !== "number" || typeof body.login !== "string") {
    throw new Error("GitHub returned a profile without a usable id or login.");
  }

  return {
    id: body.id,
    login: body.login,
    name: typeof body.name === "string" && body.name.length > 0 ? body.name : body.login,
    avatarUrl: typeof body.avatar_url === "string" ? body.avatar_url : "",
  };
}

export type MembershipResult = "member" | "not_member" | "unknown";

/**
 * Reads the caller's own org membership rather than the public members list, so
 * members of a private org are recognised too. Requires the read:org scope.
 */
export async function checkOrgMembership(accessToken: string): Promise<MembershipResult> {
  const response = await fetch(
    `${GITHUB_API_URL}/user/memberships/orgs/${encodeURIComponent(GITHUB_ORG)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: "no-store",
    }
  );

  if (response.status === 404) return "not_member";
  if (response.status === 401 || response.status === 403) return "not_member";

  // Rate limited or GitHub is unhappy: we could not prove membership either way.
  if (!response.ok) return "unknown";

  const body = (await response.json()) as { state?: unknown };
  return body.state === "active" ? "member" : "not_member";
}
