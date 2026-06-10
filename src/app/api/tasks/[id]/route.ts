import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { title, description, priority, completed, dueDate } = body;
  const validPriorities = ["HIGH", "MEDIUM", "LOW"];

  const updates: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  if (title !== undefined) updates.title = title.trim();
  if (description !== undefined) updates.description = description?.trim() || null;
  if (priority !== undefined && validPriorities.includes(priority)) updates.priority = priority;
  if (completed !== undefined) updates.completed = completed;
  if (dueDate !== undefined) updates.dueDate = dueDate || null;

  const { data, error } = await supabase
    .from("Task")
    .update(updates)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase.from("Task").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return new NextResponse(null, { status: 204 });
}
