export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getGreeting, getISODate, PRIORITY_ORDER } from "@/lib/utils";
import { CheckSquare, FileText, Activity, ArrowRight, Flame } from "lucide-react";
import Link from "next/link";

async function getDashboardData() {
  const today = getISODate();

  const [allTasks, incompleteTasks, notes, habits] = await Promise.all([
    prisma.task.count(),
    prisma.task.findMany({
      where: { completed: false },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.note.count(),
    prisma.habit.findMany({
      include: {
        completions: { where: { date: today } },
      },
    }),
  ]);

  const topTasks = incompleteTasks
    .sort(
      (a, b) =>
        (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1)
    )
    .slice(0, 5);

  const habitsCompleted = habits.filter((h) => h.completions.length > 0).length;

  return {
    allTasks,
    incompleteTasks: incompleteTasks.length,
    topTasks,
    notes,
    habits: habits.length,
    habitsCompleted,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  const greeting = getGreeting();
  const today = new Date();

  const priorityColors: Record<string, string> = {
    HIGH: "text-red-400",
    MEDIUM: "text-amber-400",
    LOW: "text-zinc-500",
  };

  const priorityDots: Record<string, string> = {
    HIGH: "bg-red-500",
    MEDIUM: "bg-amber-500",
    LOW: "bg-zinc-500",
  };

  return (
    <div className="animate-fade-in max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-muted-foreground">
          {today.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
          {greeting}
        </h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <Link href="/tasks" className="group">
          <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-zinc-600">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
                <CheckSquare className="h-4 w-4 text-indigo-400" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="mt-4 text-2xl font-semibold tabular-nums">
              {data.incompleteTasks}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Tasks remaining
            </p>
          </div>
        </Link>

        <Link href="/notes" className="group">
          <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-zinc-600">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                <FileText className="h-4 w-4 text-violet-400" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="mt-4 text-2xl font-semibold tabular-nums">
              {data.notes}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">Notes</p>
          </div>
        </Link>

        <Link href="/habits" className="group">
          <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-zinc-600">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <Activity className="h-4 w-4 text-emerald-400" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="mt-4 text-2xl font-semibold tabular-nums">
              {data.habitsCompleted}
              <span className="text-base font-normal text-muted-foreground">
                /{data.habits}
              </span>
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Habits today
            </p>
          </div>
        </Link>
      </div>

      {/* Top tasks */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-amber-400" />
            <h2 className="text-sm font-medium">Priority Tasks</h2>
          </div>
          <Link
            href="/tasks"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {data.topTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckSquare className="h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">
              All caught up!
            </p>
            <Link
              href="/tasks"
              className="mt-2 text-xs text-primary hover:underline"
            >
              Add a task
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {data.topTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-4 px-5 py-3.5"
              >
                <div
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${priorityDots[task.priority] ?? "bg-zinc-500"}`}
                />
                <span className="flex-1 truncate text-sm text-foreground">
                  {task.title}
                </span>
                <span
                  className={`shrink-0 text-xs font-medium ${priorityColors[task.priority] ?? "text-zinc-500"}`}
                >
                  {task.priority}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
