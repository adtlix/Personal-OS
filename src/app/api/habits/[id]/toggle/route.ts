import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { date } = body;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Valid date (YYYY-MM-DD) is required" }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from("HabitCompletion")
    .select("id")
    .eq("habitId", params.id)
    .eq("date", date)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("HabitCompletion")
      .delete()
      .eq("id", existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ completed: false, date });
  } else {
    const { data, error } = await supabase
      .from("HabitCompletion")
      .insert({
        id: crypto.randomUUID(),
        habitId: params.id,
        date,
        createdAt: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ completed: true, date, id: data.id });
  }
}
