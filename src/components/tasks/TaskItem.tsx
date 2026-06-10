"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatDate } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
}

const priorityStyles: Record<string, { dot: string; label: string }> = {
  HIGH: { dot: "bg-red-500", label: "text-red-400" },
  MEDIUM: { dot: "bg-amber-500", label: "text-amber-400" },
  LOW: { dot: "bg-zinc-500", label: "text-zinc-500" },
};

export function TaskItem({ task, onUpdate }: TaskItemProps) {
  const [loading, setLoading] = useState(false);

  async function toggleComplete() {
    setLoading(true);
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      onUpdate();
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask() {
    setLoading(true);
    try {
      await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      onUpdate();
    } finally {
      setLoading(false);
    }
  }

  const style = priorityStyles[task.priority] ?? priorityStyles.MEDIUM;

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg border border-transparent px-4 py-3 transition-colors hover:bg-accent/50",
        loading && "opacity-50 pointer-events-none"
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={toggleComplete}
        className="mt-0.5 shrink-0"
      />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm leading-snug",
            task.completed
              ? "text-muted-foreground line-through"
              : "text-foreground"
          )}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {task.description}
          </p>
        )}
        <div className="mt-1 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
            <span className={`text-xs font-medium ${style.label}`}>
              {task.priority}
            </span>
          </div>
          {task.dueDate && (
            <span className="text-xs text-muted-foreground">
              Due {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={deleteTask}
        className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
        aria-label="Delete task"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
