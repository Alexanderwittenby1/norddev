import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { TodoBoard } from "@/components/custom/todo/board";
import { getSession } from "@/lib/auth/session";
import { readBoard } from "@/lib/todo/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Todo - Admin - NordiskDev",
  robots: { index: false, follow: false, nocache: true },
};

export default async function TodoPage() {
  const session = await getSession();
  if (!session) redirect("/ndev/login");

  let board;
  try {
    board = await readBoard();
  } catch (error) {
    // The board stays hidden rather than rendering empty: the first save would
    // otherwise overwrite whatever the file actually contains.
    console.error("[ndev/todo] Kunde inte läsa brädet:", error);
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Todo</h1>
        <div
          role="alert"
          className="flex items-start gap-3 rounded-[var(--radius)] border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-medium">Todo-brädet kunde inte läsas.</p>
            <p className="break-words">
              {error instanceof Error ? error.message : "Okänt fel."} Kontrollera serverloggen
              innan du försöker igen, så inget kort skrivs över.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Todo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dra kort mellan kolumner för att ändra status. Klicka på en titel för att byta
          namn. Boarden delas mellan alla medlemmar i {session.org}.
        </p>
      </div>

      <TodoBoard initialBoard={board} />
    </div>
  );
}
