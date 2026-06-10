import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getWeekDates, getISODate } from "@/lib/utils";

export async function GET() {
  try {
    const weekDates = getWeekDates();
    const weekStart = getISODate(weekDates[0]);
    const weekEnd = getISODate(weekDates[6]);

    const habits = await prisma.habit.findMany({
      include: {
        completions: {
          where: { date: { gte: weekStart, lte: weekEnd } },
        },
      },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(habits);
  } catch {
    return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, color } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const habit = await prisma.habit.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        color: color ?? "#6366f1",
      },
      include: { completions: true },
    });
    return NextResponse.json(habit, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create habit" }, { status: 500 });
  }
}
