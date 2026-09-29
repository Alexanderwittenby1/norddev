import { ADMIN_BASE_PATH } from "./config";

/**
 * Restricts post-login redirects to absolute paths inside /ndev.
 * Rejects absolute and protocol-relative URLs, which would otherwise turn
 * /ndev/login into an open redirect.
 */
export function sanitizeReturnTo(value: string | null | undefined): string {
  const fallback = ADMIN_BASE_PATH;
  if (!value) return fallback;
  if (!isSafeAdminPath(value)) return fallback;

  let decoded: string;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return fallback;
  }
  // Also validate the decoded form, to catch percent-encoded traversal.
  if (!isSafeAdminPath(decoded)) return fallback;

  return value;
}

function isSafeAdminPath(value: string): boolean {
  if (!value.startsWith("/")) return false;
  // Protocol-relative "//host" is an absolute URL, not a path.
  if (value.startsWith("//")) return false;
  if (hasUnsafeChars(value)) return false;
  // Reject "." and ".." segments, which would normalise to a path outside /ndev.
  for (const segment of value.split("/")) {
    if (segment === "." || segment === "..") return false;
  }
  return value === ADMIN_BASE_PATH || value.startsWith(ADMIN_BASE_PATH + "/");
}

/** Rejects backslashes and control characters, which enable path confusion. */
function hasUnsafeChars(value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code === 92) return true;
    if (code < 0x20 || code === 0x7f) return true;
  }
  return false;
}

/**
 * Guards state-changing admin endpoints against cross-site requests.
 * SameSite=Lax already blocks the session cookie on cross-site POSTs; this is
 * the second layer. A missing Origin header is treated as trusted, while a
 * present-and-mismatched Origin always fails.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
