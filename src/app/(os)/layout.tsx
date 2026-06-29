import { Sidebar } from "@/components/layout/Sidebar";

export default function OsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <main className="ml-56 flex-1 overflow-y-auto">
        <div className="min-h-full p-8">{children}</div>
      </main>
    </div>
  );
}
