import { z } from "zod";

/**
 * Board model shared by the admin UI and the JSON file store. Everything in
 * here is pure so the same ordering rules run on the client during a drag and
 * on the server when the move is persisted.
 */

export const TODO_BOARD_VERSION = 1;
export const TODO_TITLE_MAX = 120;

/**
 * Seeds a brand new board, in board order. The ids are fixed rather than random
 * so that two reads of a not-yet-created board agree on them; nothing is written
 * to disk until the first mutation.
 */
export const DEFAULT_COLUMNS = [
  { id: "todo", title: "Att göra" },
  { id: "doing", title: "Pågår" },
  { id: "done", title: "Klar" },
] as const;


const columnIdSchema = z.string().min(1, "Kolumnen saknas.").max(64);
const cardIdSchema = z.string().min(1, "Kortet saknas.").max(64);
const titleSchema = z
  .string()
  .trim()
  .min(1, "Titeln får inte vara tom.")
  .max(TODO_TITLE_MAX, `Titeln får vara högst ${TODO_TITLE_MAX} tecken.`);

export const todoColumnSchema = z.object({
  id: columnIdSchema,
  title: titleSchema,
  order: z.number().int().min(0),
});

export const todoCardSchema = z.object({
  id: cardIdSchema,
  columnId: columnIdSchema,
  title: titleSchema,
  order: z.number().int().min(0),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

export const todoBoardSchema = z.object({
  version: z.literal(TODO_BOARD_VERSION),
  columns: z.array(todoColumnSchema),
  cards: z.array(todoCardSchema),
});

export type TodoColumn = z.infer<typeof todoColumnSchema>;
export type TodoCard = z.infer<typeof todoCardSchema>;
export type TodoBoard = z.infer<typeof todoBoardSchema>;

export const createActionSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("createColumn"), title: titleSchema }),
  z.object({
    kind: z.literal("createCard"),
    columnId: columnIdSchema,
    title: titleSchema,
  }),
]);

export const updateActionSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("renameColumn"), columnId: columnIdSchema, title: titleSchema }),
  z.object({ kind: z.literal("renameCard"), cardId: cardIdSchema, title: titleSchema }),
  z.object({
    kind: z.literal("moveCard"),
    cardId: cardIdSchema,
    toColumnId: columnIdSchema,
    toIndex: z.number().int().min(0),
  }),
]);

export const deleteColumnParamsSchema = z.object({ columnId: columnIdSchema });
export const deleteCardParamsSchema = z.object({ cardId: cardIdSchema });

export function emptyBoard(): TodoBoard {
  return { version: TODO_BOARD_VERSION, columns: [], cards: [] };
}

function byOrder(a: { order: number }, b: { order: number }): number {
  return a.order - b.order;
}

export function cardsInColumn(cards: TodoCard[], columnId: string): TodoCard[] {
  return cards.filter((card) => card.columnId === columnId).sort(byOrder);
}

/**
 * Sorts both lists and rewrites every `order` to a dense 0..n-1 index, dropping
 * cards whose column no longer exists. Applied on every read and write so a
 * hand-edited file can never leave the board in an inconsistent order.
 */
export function normalizeBoard(board: TodoBoard): TodoBoard {
  const columns = [...board.columns].sort(byOrder).map((column, index) => ({ ...column, order: index }));

  const cards: TodoCard[] = [];
  for (const column of columns) {
    const inColumn = board.cards
      .filter((card) => card.columnId === column.id)
      .sort(byOrder);
    inColumn.forEach((card, index) => {
      cards.push({ ...card, order: index });
    });
  }

  return { version: TODO_BOARD_VERSION, columns, cards };
}

/**
 * Moves a card to `toIndex` inside `toColumnId` and renumbers the column.
 * `toIndex` is interpreted in the column *without* the card, which is what the
 * drag handlers compute. Returns the same object when the card already sits
 * there, so a drag that hovers its own slot does not re-render.
 */
export function placeCard(
  board: TodoBoard,
  cardId: string,
  toColumnId: string,
  toIndex: number
): TodoBoard {
  const card = board.cards.find((entry) => entry.id === cardId);
  if (!card) return board;
  if (!board.columns.some((column) => column.id === toColumnId)) return board;

  const target = cardsInColumn(board.cards, toColumnId).filter((entry) => entry.id !== cardId);
  const index = Math.min(Math.max(toIndex, 0), target.length);
  if (card.columnId === toColumnId && card.order === index) return board;

  const moved: TodoCard = {
    ...card,
    columnId: toColumnId,
    order: index,
    updatedAt: new Date().toISOString(),
  };

  return normalizeBoard({
    ...board,
    cards: [...board.cards.filter((entry) => entry.id !== cardId), moved],
  });
}
