"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Activity,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/habits", label: "Habits", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-full w-56 flex-col border-r border-border bg-card">
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
          <Cpu className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Personal OS
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </aside>
  );
}
