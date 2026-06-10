import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      select: { id: true, title: true, createdAt: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(notes);
  } catch {
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const note = await prisma.note.create({
      data: {
        title: title.trim(),
        content: content ?? "",
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
  }
}
