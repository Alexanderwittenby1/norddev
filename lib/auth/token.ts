import { EncryptJWT, jwtDecrypt } from "jose";
import { SESSION_ISSUER, requireAuthSecret } from "./config";

const encoder = new TextEncoder();

/**
 * Purpose strings for HKDF key derivation. Every cookie kind gets its own key so
 * that a token minted for one purpose can never be replayed as another, even
 * though they all share a single AUTH_SECRET.
 */
export const KEY_PURPOSE = {
  session: "nordiskdev/ndev/session/v1",
  oauth: "nordiskdev/ndev/oauth-state/v1",
  githubToken: "nordiskdev/ndev/github-token/v1",
} as const;

export type KeyPurpose = (typeof KEY_PURPOSE)[keyof typeof KEY_PURPOSE];

const HKDF_SALT = encoder.encode("nordiskdev/ndev/salt/v1");

const keyCache = new Map<KeyPurpose, Promise<CryptoKey>>();

async function deriveKeyBytes(purpose: KeyPurpose): Promise<Uint8Array> {
  const ikm = encoder.encode(requireAuthSecret());
  const baseKey = await crypto.subtle.importKey("raw", ikm, "HKDF", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: HKDF_SALT,
      info: encoder.encode(purpose),
    },
    baseKey,
    256
  );
  return new Uint8Array(bits);
}

function deriveKey(purpose: KeyPurpose): Promise<CryptoKey> {
  const cached = keyCache.get(purpose);
  if (cached) return cached;

  const promise = deriveKeyBytes(purpose)
    .then((bytes) =>
      // "AES-GCM" is the WebCrypto name for what JOSE calls A256GCM.
      crypto.subtle.importKey("raw", bytes, { name: "AES-GCM" }, false, [
        "encrypt",
        "decrypt",
      ])
    )
    .catch((error) => {
      // Never cache a failure, or a fixed environment would keep denying access
      // until the process restarts.
      keyCache.delete(purpose);
      throw error;
    });

  keyCache.set(purpose, promise);
  return promise;
}

export type SealOptions = {
  purpose: KeyPurpose;
  audience: string;
  ttlSeconds: number;
};

/**
 * Encrypts and authenticates a payload into a compact JWE (AES-256-GCM).
 * A256GCM is an AEAD cipher, so tampering is detected on decrypt and the
 * plaintext is never readable by the client.
 */
export async function seal(payload: Record<string, unknown>, options: SealOptions): Promise<string> {
  const key = await deriveKey(options.purpose);

  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM", typ: "JWT" })
    .setIssuer(SESSION_ISSUER)
    .setAudience(options.audience)
    .setIssuedAt()
    .setExpirationTime(`${options.ttlSeconds}s`)
    .encrypt(key);
}

/**
 * Decrypts a token previously produced by `seal`. Returns null for anything
 * unexpected (missing, tampered, expired, wrong key, wrong audience) so callers
 * fail closed rather than throwing.
 */
export async function unseal<T>(
  token: string | null | undefined,
  options: { purpose: KeyPurpose; audience: string }
): Promise<T | null> {
  if (!token) return null;

  try {
    const key = await deriveKey(options.purpose);
    const { payload } = await jwtDecrypt(token, key, {
      issuer: SESSION_ISSUER,
      audience: options.audience,
      keyManagementAlgorithms: ["dir"],
      contentEncryptionAlgorithms: ["A256GCM"],
      clockTolerance: 5,
    });
    return payload as T;
  } catch {
    return null;
  }
}

export function randomToken(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

export function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function pkceChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(verifier));
  return base64UrlEncode(new Uint8Array(digest));
}

/** Length-independent string comparison for high-entropy secrets. */
export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
