import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { PRIORITY_ORDER } from "@/lib/utils";

export async function GET() {
  const { data, error } = await supabase
    .from("Task")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const sorted = (data ?? []).sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1);
  });

  return NextResponse.json(sorted);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, priority, dueDate } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const validPriorities = ["HIGH", "MEDIUM", "LOW"];
  const safePriority = validPriorities.includes(priority) ? priority : "MEDIUM";

  const { data, error } = await supabase
    .from("Task")
    .insert({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description?.trim() || null,
      priority: safePriority,
      completed: false,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
