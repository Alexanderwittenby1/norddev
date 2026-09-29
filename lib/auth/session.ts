import { cookies } from "next/headers";
import { GITHUB_TOKEN_COOKIE, SESSION_COOKIE } from "./config";
import {
  readGitHubTokenFromCookieValue,
  readSessionFromCookieValue,
  type NdevSession,
} from "./session-core";

/**
 * Server-only accessor for the current /ndev session.
 * Imported from server components, server actions and route handlers only.
 */
export async function getSession(): Promise<NdevSession | null> {
  const store = await cookies();
  return readSessionFromCookieValue(store.get(SESSION_COOKIE)?.value);
}

export async function getGitHubToken(): Promise<string | null> {
  const store = await cookies();
  return readGitHubTokenFromCookieValue(store.get(GITHUB_TOKEN_COOKIE)?.value);
}
