"use client";

import { useCallback, useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { HabitRow } from "./HabitRow";
import { CreateHabitDialog } from "./CreateHabitDialog";
import { getWeekDates, getISODate } from "@/lib/utils";

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

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const weekDates = getWeekDates();
  const today = getISODate();

  const fetchHabits = useCallback(async () => {
    try {
      const res = await fetch("/api/habits");
      if (res.ok) setHabits(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const totalToday = habits.length;
  const completedToday = habits.filter((h) =>
    h.completions.some((c) => c.date === today)
  ).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        {totalToday > 0 && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {completedToday}/{totalToday}
            </span>{" "}
            completed today
          </p>
        )}
        <div className="ml-auto">
          <CreateHabitDialog onCreated={fetchHabits} />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        {/* Header row */}
        <div className="flex items-center gap-4 border-b border-border px-4 py-2">
          <div className="flex-1">
            <span className="text-xs font-medium text-muted-foreground">
              HABIT
            </span>
          </div>
          <div className="flex shrink-0 gap-2">
            {weekDates.map((date, i) => {
              const iso = getISODate(date);
              const isToday = iso === today;
              return (
                <div
                  key={iso}
                  className="flex h-8 w-8 flex-col items-center justify-center"
                >
                  <span
                    className={`text-[10px] font-medium uppercase leading-none ${
                      isToday ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {DAY_LABELS[i]}
                  </span>
                  <span
                    className={`mt-0.5 text-[10px] tabular-nums leading-none ${
                      isToday ? "text-primary font-semibold" : "text-muted-foreground/60"
                    }`}
                  >
                    {date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-8 shrink-0" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        ) : habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Activity className="h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">
              No habits yet
            </p>
          </div>
        ) : (
          <div className="p-2">
            {habits.map((habit) => (
              <HabitRow
                key={habit.id}
                habit={habit}
                weekDates={weekDates}
                onUpdate={fetchHabits}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
