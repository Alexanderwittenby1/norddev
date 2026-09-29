"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AlertCircle, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cardsInColumn, TODO_TITLE_MAX, type TodoBoard } from "@/lib/todo/schema";
import { TodoColumnView } from "./column";
import { useTodoBoard } from "./use-todo-board";

export function TodoBoard({ initialBoard }: { initialBoard: TodoBoard }) {
  const {
    board,
    error,
    saving,
    dismissError,
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
  } = useTodoBoard(initialBoard);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {error ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-[var(--radius)] border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p className="grow break-words">{error}</p>
            <button
              type="button"
              onClick={dismissError}
              aria-label="Dölj felmeddelandet"
              className="shrink-0 rounded-sm p-0.5 hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}

        <div className="flex gap-4 overflow-x-auto pb-4">
          {board.columns.map((column) => (
            <TodoColumnView
              key={column.id}
              column={column}
              cards={cardsInColumn(board.cards, column.id)}
              columns={board.columns}
              onHoverAt={hoverAt}
              onMoveTo={moveCardTo}
              onRename={(title) => renameColumn(column.id, title)}
              onAddCard={(title) => addCard(column.id, title)}
              onRenameCard={renameCard}
              onDeleteCard={removeCard}
              onDelete={() => removeColumn(column.id)}
              onDragStart={beginDrag}
              onDragEnd={endDrag}
            />
          ))}

          <AddColumn onCreate={addColumn} />
        </div>

        <p aria-live="polite" className="sr-only">
          {saving ? "Sparar" : "Alla ändringar sparade"}
        </p>
      </div>
    </DndProvider>
  );
}

function AddColumn({ onCreate }: { onCreate: (title: string) => void }) {
  const [adding, setAdding] = useState(false);

  if (!adding) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => setAdding(true)}
        className="h-10 w-72 shrink-0 justify-start"
      >
        <Plus className="size-4" aria-hidden="true" />
        Ny kolumn
      </Button>
    );
  }

  return (
    <input
      autoFocus
      maxLength={TODO_TITLE_MAX}
      placeholder="Kolumnens namn"
      aria-label="Ny kolumn"
      onBlur={(event) => submit(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          submit(event.currentTarget.value);
        } else if (event.key === "Escape") {
          event.preventDefault();
          setAdding(false);
        }
      }}
      onDragStart={(event) => event.preventDefault()}
      className="h-10 w-72 shrink-0 rounded-[var(--radius)] border border-border bg-card px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    />
  );

  function submit(value: string) {
    const trimmed = value.trim();
    setAdding(false);
    if (trimmed) onCreate(trimmed);
  }
}
