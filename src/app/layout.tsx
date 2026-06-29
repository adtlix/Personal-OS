import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julian Christen — Bewerbung KV Immobilien | Engel & Völkers Chur",
  description:
    "Interaktive Bewerbung von Julian Eric Christen für die kaufmännische Lehre (KV) Immobilien ab Sommer 2027 bei Engel & Völkers in Chur.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${cormorant.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
