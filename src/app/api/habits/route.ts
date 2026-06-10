import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getWeekDates, getISODate } from "@/lib/utils";

export async function GET() {
  const weekDates = getWeekDates();
  const weekStart = getISODate(weekDates[0]);
  const weekEnd = getISODate(weekDates[6]);

  const { data: habits, error: habitsError } = await supabase
    .from("Habit")
    .select("*")
    .order("createdAt", { ascending: true });

  if (habitsError) return NextResponse.json({ error: habitsError.message }, { status: 500 });

  const habitIds = (habits ?? []).map((h) => h.id);

  if (habitIds.length === 0) return NextResponse.json([]);

  const { data: completions, error: compError } = await supabase
    .from("HabitCompletion")
    .select("*")
    .in("habitId", habitIds)
    .gte("date", weekStart)
    .lte("date", weekEnd);

  if (compError) return NextResponse.json({ error: compError.message }, { status: 500 });

  const result = (habits ?? []).map((habit) => ({
    ...habit,
    completions: (completions ?? []).filter((c) => c.habitId === habit.id),
  }));

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, color } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("Habit")
    .insert({
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description?.trim() || null,
      color: color ?? "#6366f1",
      createdAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ...data, completions: [] }, { status: 201 });
}
