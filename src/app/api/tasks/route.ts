import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PRIORITY_ORDER } from "@/lib/utils";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: [{ completed: "asc" }, { createdAt: "desc" }],
    });
    const sorted = tasks.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1);
    });
    return NextResponse.json(sorted);
  } catch {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, priority, dueDate } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const validPriorities = ["HIGH", "MEDIUM", "LOW"];
    const safePriority = validPriorities.includes(priority) ? priority : "MEDIUM";

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        priority: safePriority,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
