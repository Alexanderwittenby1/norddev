import { normalizeBoard, todoBoardSchema, type TodoBoard } from "./schema";

/**
 * Client for the todo board API. Pure HTTP, no local state: the Java service on
 * Proxmox owns both the data and the ordering, and every mutation answers with
 * the board as of its own commit.
 */

const baseUrl = process.env.NDEV_TODO_API_URL?.trim().replace(/\/+$/, "");
const apiKey = process.env.NDEV_TODO_API_KEY?.trim();
const timeoutMs = 5_000;

/** `status` 0 means the service could not be reached at all. */
export class TodoStorageError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function readBoard(): Promise<TodoBoard> {
  return send("GET", "/board");
}

export function createColumn(title: string): Promise<TodoBoard> {
  return send("POST", "/columns", { title });
}

export function createCard(columnId: string, title: string): Promise<TodoBoard> {
  return send("POST", "/cards", { columnId, title });
}

export function renameColumn(columnId: string, title: string): Promise<TodoBoard> {
  return send("PATCH", `/columns/${encodeURIComponent(columnId)}`, { title });
}

export function renameCard(cardId: string, title: string): Promise<TodoBoard> {
  return send("PATCH", `/cards/${encodeURIComponent(cardId)}`, { title });
}

export function deleteColumn(columnId: string): Promise<TodoBoard> {
  return send("DELETE", `/columns/${encodeURIComponent(columnId)}`);
}

export function deleteCard(cardId: string): Promise<TodoBoard> {
  return send("DELETE", `/cards/${encodeURIComponent(cardId)}`);
}

export function moveCard(cardId: string, toColumnId: string, toIndex: number): Promise<TodoBoard> {
  return send("PUT", `/cards/${encodeURIComponent(cardId)}/position`, {
    columnId: toColumnId,
    index: toIndex,
  });
}

async function send(method: string, path: string, body?: unknown): Promise<TodoBoard> {
  if (!baseUrl) {
    throw new TodoStorageError("NDEV_TODO_API_URL saknas.", 0);
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    throw new TodoStorageError(`Todo-tjänsten svarade inte (${baseUrl}${path}).`, 0);
  }

  if (!response.ok) {
    throw new TodoStorageError(await errorMessage(response), response.status);
  }

  return parseBoard(await response.text());
}

async function errorMessage(response: Response): Promise<string> {
  const raw = await response.text().catch(() => "");
  if (!raw) return `Todo-tjänsten svarade med ${response.status}.`;

  try {
    const message = (JSON.parse(raw) as { error?: unknown }).error;
    if (typeof message === "string" && message) return message;
  } catch {
    // The service answered with something other than our error envelope.
  }
  return raw;
}

/**
 * The service is trusted infrastructure but still a network boundary, so the
 * board is validated before it reaches the UI. A shape change fails here with a
 * readable message instead of surfacing as a rendering error.
 */
function parseBoard(raw: string): TodoBoard {
  let decoded: unknown;
  try {
    decoded = JSON.parse(raw);
  } catch {
    throw new TodoStorageError("Todo-tjänsten returnerade ogiltig JSON.", 502);
  }

  const parsed = todoBoardSchema.safeParse(decoded);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const where = issue?.path.join(".") || "board";
    throw new TodoStorageError(
      `Todo-tjänsten returnerade ett ogiltigt bräde (${where}: ${issue?.message ?? "okänt fel"}).`,
      502
    );
  }

  return normalizeBoard(parsed.data);
}
