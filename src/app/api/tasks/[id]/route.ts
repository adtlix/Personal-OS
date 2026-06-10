import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, priority, completed, dueDate } = body;

    const validPriorities = ["HIGH", "MEDIUM", "LOW"];

    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(priority !== undefined && validPriorities.includes(priority) && { priority }),
        ...(completed !== undefined && { completed }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
      },
    });
    return NextResponse.json(task);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.task.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
