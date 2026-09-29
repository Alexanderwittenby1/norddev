"use client";

import { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TODO_TITLE_MAX, type TodoCard, type TodoColumn } from "@/lib/todo/schema";
import {
  CARD_ATTRIBUTE,
  CARD_DRAG_TYPE,
  TodoCardItem,
  type CardDragItem,
} from "./card";
import { InlineEdit } from "./inline-edit";

type TodoColumnViewProps = {
  column: TodoColumn;
  cards: TodoCard[];
  columns: TodoColumn[];
  /** Called continuously while dragging, with an index in the card's new slot. */
  onHoverAt: (cardId: string, columnId: string, toIndex: number) => void;
  onMoveTo: (cardId: string, columnId: string) => void;
  onRename: (title: string) => void;
  onAddCard: (title: string) => void;
  onRenameCard: (cardId: string, title: string) => void;
  onDeleteCard: (cardId: string) => void;
  onDelete: () => void;
  onDragStart: (cardId: string) => void;
  onDragEnd: () => void;
};

export function TodoColumnView({
  column,
  cards,
  columns,
  onHoverAt,
  onMoveTo,
  onRename,
  onAddCard,
  onRenameCard,
  onDeleteCard,
  onDelete,
  onDragStart,
  onDragEnd,
}: TodoColumnViewProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const [{ isOver }, drop] = useDrop<CardDragItem, unknown, { isOver: boolean }>(
    () => ({
      accept: CARD_DRAG_TYPE,
      collect: (monitor) => ({ isOver: monitor.isOver() }),
      hover(item, monitor) {
        const list = listRef.current;
        const offset = monitor.getClientOffset();
        if (!list || !offset) return;

        // Insert where the dragged card's top edge lands relative to the
        // midpoints of the other cards. Excluding the dragged card keeps the
        // index in the same "removed first" space placeCard() expects, and
        // leaves the calculation stable while the list reflows around it.
        const others = [...list.querySelectorAll(`[${CARD_ATTRIBUTE}]`)].filter(
          (node) => node.getAttribute(CARD_ATTRIBUTE) !== item.id
        );

        let toIndex = others.length;
        for (let i = 0; i < others.length; i++) {
          const box = others[i].getBoundingClientRect();
          if (offset.y < box.top + box.height / 2) {
            toIndex = i;
            break;
          }
        }

        onHoverAt(item.id, column.id, toIndex);
      },
    }),
    [column.id, onHoverAt]
  );

  drop(listRef);

  function confirmDelete() {
    const count = cards.length;
    const suffix =
      count === 0 ? "kolumnen är tom" : `${count} ${count === 1 ? "kort" : "kort"} raderas också`;

    if (window.confirm(`Ta bort "${column.title}"? ${suffix}.`)) onDelete();
  }

  return (
    <section
      aria-label={column.title}
      className="flex w-72 shrink-0 flex-col rounded-[var(--radius)] border border-border bg-muted/40"
    >
      <header className="flex items-center gap-2 border-b border-border px-3 py-2">
        <InlineEdit
          value={column.title}
          editing={editing}
          onEditingChange={setEditing}
          onCommit={onRename}
          label={`namn på kolumnen ${column.title}`}
          maxLength={TODO_TITLE_MAX}
          className="px-1 py-0.5 font-roboto-mono text-xs uppercase tracking-widest"
        />

        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 font-roboto-mono text-xs text-muted-foreground tabular-nums">
          {cards.length}
        </span>

        <button
          type="button"
          onClick={confirmDelete}
          aria-label={`Ta bort kolumnen ${column.title}`}
          title="Ta bort kolumnen"
          className="ml-auto shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </button>
      </header>

      <div
        ref={listRef}
        className={cn(
          "flex min-h-24 grow flex-col gap-2 rounded-b-[var(--radius)] p-2 transition-colors",
          isOver && "bg-accent/15"
        )}
      >
        {cards.map((card) => (
          <TodoCardItem
            key={card.id}
            card={card}
            columns={columns}
            onMoveTo={(columnId) => onMoveTo(card.id, columnId)}
            onRename={(title) => onRenameCard(card.id, title)}
            onDelete={() => onDeleteCard(card.id)}
            onDragStart={() => onDragStart(card.id)}
            onDragEnd={onDragEnd}
          />
        ))}

        {cards.length === 0 ? (
          <p className="px-1 py-3 text-center text-xs text-muted-foreground">
            Dra ett hit, eller lägg till ett kort.
          </p>
        ) : null}
      </div>

      <footer className="border-t border-border p-2">
        {adding ? (
          <NewCardField
            onCancel={() => setAdding(false)}
            onCreate={(title) => {
              setAdding(false);
              onAddCard(title);
            }}
          />
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setAdding(true)}
            className="w-full justify-start"
          >
            <Plus className="size-4" aria-hidden="true" />
            Lägg till kort
          </Button>
        )}
      </footer>
    </section>
  );
}

function NewCardField({
  onCreate,
  onCancel,
}: {
  onCreate: (title: string) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");

  function submit() {
    const trimmed = title.trim();
    if (!trimmed) {
      onCancel();
      return;
    }
    setTitle("");
    onCreate(trimmed);
  }

  return (
    <input
      autoFocus
      value={title}
      maxLength={TODO_TITLE_MAX}
      placeholder="Kortets titel"
      aria-label="Nytt kort"
      onChange={(event) => setTitle(event.target.value)}
      onBlur={submit}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          submit();
        } else if (event.key === "Escape") {
          event.preventDefault();
          onCancel();
        }
      }}
      onDragStart={(event) => event.preventDefault()}
      className="w-full rounded-[var(--radius)] border border-border bg-card px-2 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    />
  );
}
