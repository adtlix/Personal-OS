import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, color } = body;

    const habit = await prisma.habit.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(color !== undefined && { color }),
      },
    });
    return NextResponse.json(habit);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to update habit" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.habit.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to delete habit" }, { status: 500 });
  }
}
