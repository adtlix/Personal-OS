export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { NoteEditor } from "@/components/notes/NoteEditor";

interface PageProps {
  params: { id: string };
}

export default async function NoteEditorPage({ params }: PageProps) {
  const { data: note } = await supabase
    .from("Note")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!note) notFound();

  return (
    <div className="animate-fade-in -m-8 h-[calc(100vh-0px)] overflow-hidden">
      <NoteEditor note={note} />
    </div>
  );
}
