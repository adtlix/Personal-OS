import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const note = await prisma.note.findUnique({ where: { id: params.id } });
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(note);
  } catch {
    return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, content } = body;

    const note = await prisma.note.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(content !== undefined && { content }),
      },
    });
    return NextResponse.json(note);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.note.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}
