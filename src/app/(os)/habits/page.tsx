import { HabitTracker } from "@/components/habits/HabitTracker";

export default function HabitsPage() {
  return (
    <div className="animate-fade-in max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Habits</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your daily habits this week
        </p>
      </div>
      <HabitTracker />
    </div>
  );
}
