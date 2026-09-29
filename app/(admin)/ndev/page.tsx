import { redirect } from "next/navigation";
import { Clock, Github, ShieldCheck } from "lucide-react";
import { GITHUB_ORG, SESSION_TTL_SECONDS } from "@/lib/auth/config";
import { getSession } from "@/lib/auth/session";

export default async function NdevDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/ndev/login");

  const expiresAt = typeof session.exp === "number" ? new Date(session.exp * 1000) : null;

  const facts = [
    {
      icon: ShieldCheck,
      label: "Åtkomst",
      value: `Verifierad medlem i ${GITHUB_ORG}`,
    },
    {
      icon: Github,
      label: "Inloggad som",
      value: `${session.name} (@${session.login})`,
    },
    {
      icon: Clock,
      label: "Sessionen går ut",
      value: expiresAt
        ? expiresAt.toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })
        : `Om ${Math.round(SESSION_TTL_SECONDS / 3600)} timmar`,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Hej {session.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Det här är den skyddade administrationsytan. Endast medlemmar i{" "}
          {GITHUB_ORG} når den, och medlemskapet kontrolleras om cirka en gång i
          timmen.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {facts.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-[var(--radius)] border border-border bg-card p-5"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon className="size-4" aria-hidden="true" />
              <span className="font-roboto-mono text-xs uppercase tracking-widest">
                {label}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium break-words">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[var(--radius)] border border-dashed border-border bg-card p-8 text-center">
        <h2 className="text-lg font-medium">Inget här ännu</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Den här sidan är autentiserad och redo. Lägg till adminfunktioner här
          nedan.
        </p>
      </div>
    </div>
  );
}
