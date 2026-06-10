"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, FileText, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatDate } from "@/lib/utils";

interface NoteMeta {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export function NotesList() {
  const router = useRouter();
  const [notes, setNotes] = useState<NoteMeta[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/notes");
      if (res.ok) setNotes(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  async function createNote() {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Untitled", content: "" }),
    });
    if (res.ok) {
      const note = await res.json();
      router.push(`/notes/${note.id}`);
    }
  }

  async function deleteNote(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button size="sm" onClick={createNote} className="gap-1.5 shrink-0">
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
          <FileText className="h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">
            {search ? "No notes match your search" : "No notes yet"}
          </p>
          {!search && (
            <button
              onClick={createNote}
              className="mt-2 text-xs text-primary hover:underline"
            >
              Create your first note
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((note) => (
            <div
              key={note.id}
              onClick={() => router.push(`/notes/${note.id}`)}
              className={cn(
                "group relative cursor-pointer rounded-xl border border-border bg-card p-5 transition-colors hover:border-zinc-600"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="h-4 w-4 shrink-0 text-violet-400" />
                  <p className="truncate text-sm font-medium">{note.title}</p>
                </div>
                <button
                  onClick={(e) => deleteNote(note.id, e)}
                  className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Updated {formatDate(note.updatedAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
