import { NotesList } from "@/components/notes/NotesList";

export default function NotesPage() {
  return (
    <div className="animate-fade-in max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Notes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your personal wiki in Markdown
        </p>
      </div>
      <NotesList />
    </div>
  );
}
