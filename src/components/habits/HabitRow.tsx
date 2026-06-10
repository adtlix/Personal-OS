"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { cn, getISODate } from "@/lib/utils";

interface Completion {
  id: string;
  date: string;
}

interface Habit {
  id: string;
  name: string;
  description: string | null;
  color: string;
  completions: Completion[];
}

interface HabitRowProps {
  habit: Habit;
  weekDates: Date[];
  onUpdate: () => void;
}

export function HabitRow({ habit, weekDates, onUpdate }: HabitRowProps) {
  const [loadingDate, setLoadingDate] = useState<string | null>(null);

  async function toggle(date: Date) {
    const isoDate = getISODate(date);
    setLoadingDate(isoDate);
    try {
      await fetch(`/api/habits/${habit.id}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: isoDate }),
      });
      onUpdate();
    } finally {
      setLoadingDate(null);
    }
  }

  async function deleteHabit() {
    await fetch(`/api/habits/${habit.id}`, { method: "DELETE" });
    onUpdate();
  }

  const completedDates = new Set(habit.completions.map((c) => c.date));
  const today = getISODate();

  return (
    <div className="group flex items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-accent/30">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: habit.color }}
        />
        <span className="truncate text-sm font-medium text-foreground">
          {habit.name}
        </span>
      </div>

      <div className="flex shrink-0 gap-2">
        {weekDates.map((date) => {
          const iso = getISODate(date);
          const done = completedDates.has(iso);
          const isToday = iso === today;
          const isFuture = iso > today;

          return (
            <button
              key={iso}
              onClick={() => !isFuture && toggle(date)}
              disabled={isFuture || loadingDate === iso}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all",
                done
                  ? "text-white"
                  : isToday
                    ? "border-2 border-dashed bg-transparent text-muted-foreground hover:bg-accent"
                    : isFuture
                      ? "cursor-default border border-border/50 bg-transparent text-muted-foreground/30"
                      : "border border-border bg-transparent text-muted-foreground hover:bg-accent",
                done && "opacity-90 hover:opacity-100",
                loadingDate === iso && "opacity-50"
              )}
              style={done ? { backgroundColor: habit.color } : undefined}
              title={iso}
            >
              {done ? "✓" : isToday ? "·" : ""}
            </button>
          );
        })}
      </div>

      <button
        onClick={deleteHabit}
        className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
        aria-label="Delete habit"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
