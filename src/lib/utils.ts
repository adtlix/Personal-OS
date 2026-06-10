import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getISODate(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

export function getWeekDates(referenceDate: Date = new Date()): Date[] {
  const day = referenceDate.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export const PRIORITY_ORDER: Record<string, number> = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};
