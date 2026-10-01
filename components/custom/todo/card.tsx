"use client";

import { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TODO_TITLE_MAX, type TodoCard as TodoCardModel, type TodoColumn } from "@/lib/todo/schema";
import { InlineEdit } from "./inline-edit";

export const CARD_DRAG_TYPE = "ndev-todo-card";

export type CardDragItem = { id: string; columnId: string };

/** Marks the rendered card elements so a column can find them for insertion maths. */
export const CARD_ATTRIBUTE = "data-todo-card";

type TodoCardItemProps = {
  card: TodoCardModel;
  columns: TodoColumn[];
  onMoveTo: (columnId: string) => void;
  onRename: (title: string) => void;
  onDelete: () => void;
  /** Runs once, when a drag of this card begins. */
  onDragStart: () => void;
  /** Runs for every finished drag, including one dropped outside any column. */
  onDragEnd: () => void;
};

export function TodoCardItem({
  card,
  columns,
  onMoveTo,
  onRename,
  onDelete,
  onDragStart,
  onDragEnd,
}: TodoCardItemProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);

  const [{ isDragging }, drag] = useDrag<CardDragItem, unknown, { isDragging: boolean }>(
    () => ({
      type: CARD_DRAG_TYPE,
      // The item factory runs exactly once per drag, which makes it the one
      // reliable place to snapshot the board before anything moves.
      item: () => {
        onDragStart();
        return { id: card.id, columnId: card.columnId };
      },
      // Dragging into another column remounts this card in its new parent, so
      // the default "is this my own drag source" answer turns false mid-drag.
      // Comparing the dragged item instead keeps the dragged look stable.
      isDragging: (monitor) => monitor.getItem()?.id === card.id,
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      end: onDragEnd,
    }),
    [card.id, card.columnId, onDragStart, onDragEnd]
  );

  // A null ref disconnects the drag source, so the title stays editable.
  drag(editing ? null : nodeRef);

  return (
    <div
      ref={nodeRef}
      {...{ [CARD_ATTRIBUTE]: card.id }}
      className={cn(
        "group rounded-[var(--radius)] border border-border bg-card p-3 shadow-xs transition-opacity",
        isDragging && "opacity-40"
      )}
    >
      <div className="flex items-start gap-1">
        <InlineEdit
          value={card.title}
          editing={editing}
          onEditingChange={setEditing}
          onCommit={onRename}
          label={`titel på kortet ${card.title}`}
          maxLength={TODO_TITLE_MAX}
          className="px-1 py-0.5 text-sm font-medium"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label={`Åtgärder för ${card.title}`}
              className="shrink-0 rounded-sm p-1 text-muted-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 group-hover:opacity-100 data-[state=open]:opacity-100"
            >
              <MoreHorizontal className="size-4 " aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={6} className="w-52 bg-white">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Flytta till kolumn</DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={4} alignOffset={-4} collisionPadding={8} className="bg-white ">
                {columns.map((column) => (
                  <DropdownMenuItem
                    className="bg-white text-black hover:bg-black/20 !px-0"
                    key={column.id}
                    disabled={column.id === card.columnId}
                    onSelect={() => onMoveTo(column.id)}
                  >
                    {column.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={onDelete}>
              <Trash2 className="size-4 " aria-hidden="true" />
              Ta bort
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
