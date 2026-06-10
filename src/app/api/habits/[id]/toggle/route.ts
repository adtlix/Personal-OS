import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { date } = body;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Valid date (YYYY-MM-DD) is required" }, { status: 400 });
    }

    const existing = await prisma.habitCompletion.findUnique({
      where: { habitId_date: { habitId: params.id, date } },
    });

    if (existing) {
      await prisma.habitCompletion.delete({ where: { id: existing.id } });
      return NextResponse.json({ completed: false, date });
    } else {
      const completion = await prisma.habitCompletion.create({
        data: { habitId: params.id, date },
      });
      return NextResponse.json({ completed: true, date, id: completion.id });
    }
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to toggle habit" }, { status: 500 });
  }
}
