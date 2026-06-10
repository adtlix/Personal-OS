"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckSquare } from "lucide-react";
import { TaskItem } from "./TaskItem";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
}

type Filter = "all" | "active" | "completed";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("active");
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) setTasks(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filtered =
    filter === "all"
      ? tasks
      : filter === "active"
        ? tasks.filter((t) => !t.completed)
        : tasks.filter((t) => t.completed);

  const filters: { key: Filter; label: string }[] = [
    { key: "active", label: "Active" },
    { key: "all", label: "All" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 rounded-lg border border-border bg-card p-0.5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f.key
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <CreateTaskDialog onCreated={fetchTasks} />
      </div>

      <div className="rounded-xl border border-border bg-card">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CheckSquare className="h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">
              {filter === "completed"
                ? "No completed tasks yet"
                : "No tasks here"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border p-2">
            {filtered.map((task) => (
              <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
