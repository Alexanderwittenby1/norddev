"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type InlineEditProps = {
  value: string;
  /** Owned by the parent, because the card must stop being draggable while editing. */
  editing: boolean;
  onEditingChange: (editing: boolean) => void;
  onCommit: (value: string) => void;
  /** Plain text, used for the button and input labels. */
  label: string;
  maxLength: number;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
};

export function InlineEdit({
  value,
  editing,
  onEditingChange,
  onCommit,
  label,
  maxLength,
  className,
  inputClassName,
  placeholder,
}: InlineEditProps) {
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  /** Blur and Enter can both fire for one interaction; only the first wins. */
  const settled = useRef(true);

  useEffect(() => {
    if (!editing) return;
    setDraft(value);
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [editing, value]);

  function start() {
    settled.current = false;
    onEditingChange(true);
  }

  function commit() {
    if (settled.current) return;
    settled.current = true;
    onEditingChange(false);
    if (draft.trim() !== value) onCommit(draft.trim());
  }

  function cancel() {
    if (settled.current) return;
    settled.current = true;
    setDraft(value);
    onEditingChange(false);
  }

  if (!editing) {
    return (
      <button
        type="button"
        onClick={start}
        title="Klicka för att redigera"
        aria-label={`Redigera ${label}`}
        className={cn(
          "w-full cursor-text truncate rounded-sm text-left hover:bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
          className
        )}
      >
        {value || placeholder}
      </button>
    );
  }

  return (
    <input
      ref={inputRef}
      value={draft}
      maxLength={maxLength}
      aria-label={label}
      placeholder={placeholder}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          commit();
        } else if (event.key === "Escape") {
          event.preventDefault();
          cancel();
        }
      }}
      // The card behind this input is a drag source; keep the drag out of text editing.
      onDragStart={(event) => event.preventDefault()}
      className={cn(
        "w-full rounded-sm border border-border bg-background px-1 py-0.5 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        inputClassName
      )}
    />
  );
}
