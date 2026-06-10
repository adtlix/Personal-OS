import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NoteEditor } from "@/components/notes/NoteEditor";

interface PageProps {
  params: { id: string };
}

export default async function NoteEditorPage({ params }: PageProps) {
  const note = await prisma.note.findUnique({ where: { id: params.id } });
  if (!note) notFound();

  return (
    <div className="animate-fade-in -m-8 h-[calc(100vh-0px)] overflow-hidden">
      <NoteEditor
        note={{
          ...note,
          updatedAt: note.updatedAt.toISOString(),
        }}
      />
    </div>
  );
}
