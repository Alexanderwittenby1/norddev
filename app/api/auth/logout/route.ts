import { NextResponse, type NextRequest } from "next/server";
import { isSameOrigin } from "@/lib/auth/request";
import { expiredCookieOptions, sessionCookieNames } from "@/lib/auth/session-core";

export const dynamic = "force-dynamic";

/**
 * Ends the /ndev session by expiring both auth cookies.
 * POST only, with an Origin check, so a third-party page cannot log a member out.
 */
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return new Response(JSON.stringify({ success: false, error: "forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = NextResponse.redirect(
    new URL("/ndev/login?loggedOut=1", request.nextUrl.origin),
    303
  );

  for (const name of sessionCookieNames()) {
    response.cookies.set(name, "", expiredCookieOptions());
  }

  return response;
}
