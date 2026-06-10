"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Eye, Code, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

interface NoteEditorProps {
  note: Note;
}

export function NoteEditor({ note: initialNote }: NoteEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialNote.title);
  const [content, setContent] = useState(initialNote.content);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  const save = useCallback(
    async (newTitle: string, newContent: string) => {
      setSaving(true);
      try {
        await fetch(`/api/notes/${initialNote.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTitle, content: newContent }),
        });
        setSaved(true);
      } finally {
        setSaving(false);
      }
    },
    [initialNote.id]
  );

  function scheduleSave(newTitle: string, newContent: string) {
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => save(newTitle, newContent), 800);
  }

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  async function deleteNote() {
    await fetch(`/api/notes/${initialNote.id}`, { method: "DELETE" });
    router.push("/notes");
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/notes")}
            className="gap-1.5 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Notes
          </Button>
          <span className="text-xs text-muted-foreground">
            {saving ? "Saving..." : saved ? "Saved" : "Unsaved"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 rounded-lg border border-border bg-card p-0.5">
            <button
              onClick={() => setPreview(false)}
              className={cn(
                "rounded-md p-1.5 transition-colors",
                !preview
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Edit"
            >
              <Code className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setPreview(true)}
              className={cn(
                "rounded-md p-1.5 transition-colors",
                preview
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Preview"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={deleteNote}
            className="h-8 w-8 text-muted-foreground hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            scheduleSave(e.target.value, content);
          }}
          placeholder="Untitled"
          className="mb-6 w-full bg-transparent text-2xl font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
        />

        {preview ? (
          <div className="prose-dark min-h-[400px]">
            {content ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground/50 italic">Nothing to preview</p>
            )}
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              scheduleSave(title, e.target.value);
            }}
            placeholder="Start writing in Markdown..."
            className="min-h-[500px] w-full resize-none bg-transparent font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/40"
          />
        )}
      </div>
    </div>
  );
}
