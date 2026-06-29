import { TaskList } from "@/components/tasks/TaskList";

export default function TasksPage() {
  return (
    <div className="animate-fade-in max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your to-do list
        </p>
      </div>
      <TaskList />
    </div>
  );
}
