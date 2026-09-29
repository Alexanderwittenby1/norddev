import { TodoStorageError } from "./store";
import * as store from "./store";
import type { TodoBoard } from "./schema";

/** Thrown when a card or column vanished before the mutation could be applied. */
export class TodoNotFoundError extends Error {}

export function createColumn(title: string): Promise<TodoBoard> {
  return run(() => store.createColumn(title));
}

export function createCard(columnId: string, title: string): Promise<TodoBoard> {
  return run(() => store.createCard(columnId, title));
}

export function renameColumn(columnId: string, title: string): Promise<TodoBoard> {
  return run(() => store.renameColumn(columnId, title));
}

export function renameCard(cardId: string, title: string): Promise<TodoBoard> {
  return run(() => store.renameCard(cardId, title));
}

/** Drops the column and every card in it. */
export function deleteColumn(columnId: string): Promise<TodoBoard> {
  return run(() => store.deleteColumn(columnId));
}

export function deleteCard(cardId: string): Promise<TodoBoard> {
  return run(() => store.deleteCard(cardId));
}

export function moveCard(
  cardId: string,
  toColumnId: string,
  toIndex: number
): Promise<TodoBoard> {
  return run(() => store.moveCard(cardId, toColumnId, toIndex));
}

/**
 * Turns the service's 404 into `TodoNotFoundError` so the route handler keeps
 * mapping a card or column that someone else already deleted to a 404. The
 * message comes from the service and is the one the UI should show.
 */
async function run(request: () => Promise<TodoBoard>): Promise<TodoBoard> {
  try {
    return await request();
  } catch (error) {
    if (error instanceof TodoStorageError && error.status === 404) {
      throw new TodoNotFoundError(error.message);
    }
    throw error;
  }
}
