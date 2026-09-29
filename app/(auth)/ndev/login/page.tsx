import type { Metadata } from "next";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADMIN_BASE_PATH, GITHUB_ORG } from "@/lib/auth/config";
import { sanitizeReturnTo } from "@/lib/auth/request";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Logga in - NordiskDev",
  description: "Inloggning till NordiskDev.",
  robots: { index: false, follow: false },
};

const ERROR_MESSAGES: Record<string, string> = {
  not_member: `Du är inte medlem i ${GITHUB_ORG}-organisationen på GitHub. Be en administratör för organisationen om hjälp att bli medlem.`,
  access_denied: "Inloggningen avbröts.",
  invalid_state: "Inloggningen tog för länge eller var ogiltig. Försök igen.",
  signin_unavailable:
    "Kunde inte verifiera ditt medlemskap just nu. Försök igen om en stund.",
};

export default async function NdevLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; loggedOut?: string; returnTo?: string }>;
}) {
  const params = await searchParams;
  const errorMessage = params.error ? ERROR_MESSAGES[params.error] : undefined;
  const returnTo = sanitizeReturnTo(params.returnTo);
  const signInHref =
    returnTo === ADMIN_BASE_PATH
      ? "/api/auth/github"
      : `/api/auth/github?returnTo=${encodeURIComponent(returnTo)}`;

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-roboto-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            {ADMIN_BASE_PATH}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Logga in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            NordiskDevs administrationsyta. Endast för organisationens medlemmar.
          </p>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-sm">
          {errorMessage ? (
            <p
              role="alert"
              className="mb-5 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            >
              {errorMessage}
            </p>
          ) : null}

          {params.loggedOut ? (
            <p className="mb-5 rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground">
              Du är utloggad.
            </p>
          ) : null}

          <Button asChild size="lg" className="h-11 w-full">
            <a href={signInHref}>
              <Github className="size-5" aria-hidden="true" />
              Logga in med GitHub
            </a>
          </Button>

          <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
            Du behöver vara aktiv medlem i{" "}
            <span className="font-roboto-mono text-foreground">{GITHUB_ORG}</span>{" "}
            på GitHub. Vi begär endast läsbehörighet till din
            organisationsmedlemskap.
          </p>
        </div>
      </div>
    </div>
  );
}
