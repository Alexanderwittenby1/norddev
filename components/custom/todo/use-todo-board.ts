"use client";

import { useCallback, useRef, useState } from "react";
import { cardsInColumn, placeCard, type TodoBoard } from "@/lib/todo/schema";

const ENDPOINT = "/api/ndev/todos";

/** Board the drag started from, so a failed move can be rolled back. */
type DragOrigin = { board: TodoBoard; cardId: string };

/**
 * Owns the board on the client and mirrors every change to the API.
 *
 * Drags move cards locally while the pointer moves and are persisted once, on
 * drop, so a single drag produces a single request. Everything else saves
 * immediately and rolls back to the server's answer on failure.
 */
export function useTodoBoard(initialBoard: TodoBoard) {
  const [board, setBoard] = useState(initialBoard);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const boardRef = useRef(board);
  boardRef.current = board;
  const dragOrigin = useRef<DragOrigin | null>(null);
  const inFlight = useRef(0);

  const run = useCallback(
    async (request: () => Promise<TodoBoard>, rollback?: TodoBoard) => {
      inFlight.current += 1;
      setSaving(true);
      setError(null);
      try {
        const saved = await request();
        // A drag started since this request went out owns the board; its own
        // drop will bring the server back in line, so don't fight it.
        if (dragOrigin.current === null) setBoard(saved);
      } catch (cause) {
        if (rollback) setBoard(rollback);
        setError(cause instanceof Error ? cause.message : "Kunde inte kontakta servern.");
      } finally {
        inFlight.current -= 1;
        if (inFlight.current === 0) setSaving(false);
      }
    },
    []
  );

  const addColumn = useCallback(
    (title: string) => run(() => send({ kind: "createColumn", title }, "POST")),
    [run]
  );

  const renameColumn = useCallback(
    (columnId: string, title: string) =>
      run(() => send({ kind: "renameColumn", columnId, title }, "PATCH")),
    [run]
  );

  const removeColumn = useCallback(
    (columnId: string) =>
      run(() => send(null, "DELETE", { kind: "deleteColumn", columnId })),
    [run]
  );

  const addCard = useCallback(
    (columnId: string, title: string) =>
      run(() => send({ kind: "createCard", columnId, title }, "POST")),
    [run]
  );

  const renameCard = useCallback(
    (cardId: string, title: string) =>
      run(() => send({ kind: "renameCard", cardId, title }, "PATCH")),
    [run]
  );

  const removeCard = useCallback(
    (cardId: string) => run(() => send(null, "DELETE", { kind: "deleteCard", cardId })),
    [run]
  );

  /**
   * Moves a card while the pointer is still down. Local only: one drag ends up
   * as exactly one request, sent from endDrag.
   */
  const hoverAt = useCallback((cardId: string, columnId: string, toIndex: number) => {
    setBoard((current) => placeCard(current, cardId, columnId, toIndex));
  }, []);

  const beginDrag = useCallback((cardId: string) => {
    dragOrigin.current = { board: boardRef.current, cardId };
  }, []);

  const endDrag = useCallback(() => {
    const origin = dragOrigin.current;
    dragOrigin.current = null;
    if (!origin) return;

    const from = origin.board.cards.find((card) => card.id === origin.cardId);
    const to = boardRef.current.cards.find((card) => card.id === origin.cardId);
    if (!from || !to) {
      setBoard(origin.board);
      return;
    }
    if (from.columnId === to.columnId && from.order === to.order) return;

    const rollback = origin.board;
    void run(
      () =>
        send(
          { kind: "moveCard", cardId: to.id, toColumnId: to.columnId, toIndex: to.order },
          "PATCH"
        ),
      rollback
    );
  }, [run]);

  /**
   * Keyboard and touch fallback for the drag, since the HTML5 backend has no
   * touch support. Appends to the target column and saves straight away.
   */
  const moveCardTo = useCallback(
    (cardId: string, toColumnId: string) => {
      const rollback = boardRef.current;
      const rest = cardsInColumn(rollback.cards, toColumnId).filter(
        (card) => card.id !== cardId
      );
      const next = placeCard(rollback, cardId, toColumnId, rest.length);
      if (next === rollback) return;

      setBoard(next);
      void run(
        () => send({ kind: "moveCard", cardId, toColumnId, toIndex: rest.length }, "PATCH"),
        rollback
      );
    },
    [run]
  );

  return {
    board,
    error,
    saving,
    dismissError: () => setError(null),
    addColumn,
    renameColumn,
    removeColumn,
    addCard,
    renameCard,
    removeCard,
    hoverAt,
    beginDrag,
    endDrag,
    moveCardTo,
  };
}

async function send(body: unknown, method: string, query?: Record<string, string>) {
  const url = query
    ? `${ENDPOINT}?${new URLSearchParams(query).toString()}`
    : ENDPOINT;

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === null ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = payload && typeof payload.error === "string" ? payload.error : null;
    throw new Error(message ?? `Servern svarade med ${response.status}.`);
  }

  const payload: { board?: TodoBoard } = await response.json();
  if (!payload.board) throw new Error("Servern returnerade inget bräde.");
  return payload.board;
}
