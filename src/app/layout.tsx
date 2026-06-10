import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal OS",
  description: "Your personal operating system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden bg-background">
          <Sidebar />
          <main className="ml-56 flex-1 overflow-y-auto">
            <div className="min-h-full p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
