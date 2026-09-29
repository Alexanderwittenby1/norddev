import { NextResponse } from "next/server";
import { z } from "zod";
import { isSameOrigin } from "@/lib/auth/request";
import { getSession } from "@/lib/auth/session";
import {
  TodoNotFoundError,
  createCard,
  createColumn,
  deleteCard,
  deleteColumn,
  moveCard,
  renameCard,
  renameColumn,
} from "@/lib/todo/board-ops";
import {
  createActionSchema,
  deleteCardParamsSchema,
  deleteColumnParamsSchema,
  updateActionSchema,
  type TodoBoard,
} from "@/lib/todo/schema";
import { readBoard } from "@/lib/todo/store";

export const dynamic = "force-dynamic";

/** Raised for a body we cannot even parse, before zod gets a chance. */
class InvalidRequestError extends Error {}

/** Every action this endpoint accepts, for a readable "unknown action" error. */
const KINDS = new Set([
  "createColumn",
  "createCard",
  "renameColumn",
  "renameCard",
  "moveCard",
]);

export async function GET() {
  if (!(await isAuthorised())) return fail(401, "unauthorized");
  return respond(() => readBoard());
}

export async function POST(request: Request) {
  if (!(await isAuthorised())) return fail(401, "unauthorized");
  if (!isSameOrigin(request)) return fail(403, "Ogiltig källa.");

  return respond(async () => {
    const action = await parseAction(createActionSchema, request);
    return action.kind === "createColumn"
      ? createColumn(action.title)
      : createCard(action.columnId, action.title);
  });
}

export async function PATCH(request: Request) {
  if (!(await isAuthorised())) return fail(401, "unauthorized");
  if (!isSameOrigin(request)) return fail(403, "Ogiltig källa.");

  return respond(async () => {
    const action = await parseAction(updateActionSchema, request);

    switch (action.kind) {
      case "renameColumn":
        return renameColumn(action.columnId, action.title);
      case "renameCard":
        return renameCard(action.cardId, action.title);
      case "moveCard":
        return moveCard(action.cardId, action.toColumnId, action.toIndex);
    }
  });
}

export async function DELETE(request: Request) {
  if (!(await isAuthorised())) return fail(401, "unauthorized");
  if (!isSameOrigin(request)) return fail(403, "Ogiltig källa.");

  return respond(() => {
    const params = new URL(request.url).searchParams;

    if (params.get("kind") === "deleteColumn") {
      const { columnId } = deleteColumnParamsSchema.parse({ columnId: params.get("columnId") });
      return deleteColumn(columnId);
    }
    if (params.get("kind") === "deleteCard") {
      const { cardId } = deleteCardParamsSchema.parse({ cardId: params.get("cardId") });
      return deleteCard(cardId);
    }
    throw new InvalidRequestError("Okänd åtgärd.");
  });
}

/** Middleware already blocks anonymous requests; this keeps a bad matcher from exposing the board. */
async function isAuthorised(): Promise<boolean> {
  return (await getSession()) !== null;
}

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new InvalidRequestError("Begäran innehöll inte giltig JSON.");
  }
}

/**
 * Checks the action name before handing the body to zod, so an unsupported one
 * reports a readable message instead of zod's English discriminator text.
 */
async function parseAction<T>(schema: z.ZodType<T>, request: Request): Promise<T> {
  const body = await readJson(request);
  const kind = (body as { kind?: unknown } | null)?.kind;

  if (typeof kind !== "string" || !KINDS.has(kind)) {
    throw new InvalidRequestError("Okänd åtgärd.");
  }
  return schema.parse(body);
}

async function respond(run: () => Promise<TodoBoard>) {
  try {
    return NextResponse.json({ success: true, board: await run() });
  } catch (error) {
    if (error instanceof TodoNotFoundError) return fail(404, error.message);
    if (error instanceof InvalidRequestError) return fail(400, error.message);
    if (error instanceof z.ZodError) {
      return fail(400, error.issues[0]?.message ?? "Ogiltig begäran.");
    }
    // Operator-facing paths are useful here and only reach signed-in members.
    console.error("[ndev/todo]", error);
    return fail(500, error instanceof Error ? error.message : "Kunde inte hantera begäran.");
  }
}

function fail(status: number, error: string) {
  return NextResponse.json({ success: false, error }, { status });
}
