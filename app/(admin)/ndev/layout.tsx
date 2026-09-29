import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import NdevNav from "@/components/custom/ndev-nav";
import { ADMIN_LOGIN_PATH } from "@/lib/auth/config";
import { getSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - NordiskDev",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Guarded shell for every /ndev page. Middleware already blocks unauthenticated
 * requests at the edge; this second check means a misconfigured matcher can never
 * alone expose the admin area.
 */
export default async function NdevAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) redirect(ADMIN_LOGIN_PATH);

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-[var(--accent)]" aria-hidden="true" />
            <span className="font-roboto-mono text-sm uppercase tracking-widest">
              ndev
            </span>
          </div>

          <NdevNav />

          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-3">
              {session.avatarUrl ? (
                <Image
                  src={session.avatarUrl}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 rounded-full border border-border"
                  unoptimized
                />
              ) : null}
              <div className="leading-tight">
                <p className="text-sm font-medium">{session.name}</p>
                <p className="font-roboto-mono text-xs text-muted-foreground">
                  @{session.login}
                </p>
              </div>
            </div>

            <form action="/api/auth/logout" method="post">
              <Button type="submit" variant="outline" size="sm">
                <LogOut className="size-4" aria-hidden="true" />
                Logga ut
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl grow px-6 py-10">{children}</main>
    </div>
  );
}
