"use client";

import {
  MapPin,
  Languages,
  Music2,
  Trophy,
  GraduationCap,
  ArrowDownRight,
  FileText,
  Download,
  Sparkles,
  Building2,
  BedDouble,
  Ruler,
  CalendarClock,
} from "lucide-react";
import { Gallery } from "./Gallery";
import { Tragbarkeitsrechner } from "./Tragbarkeitsrechner";

const EV_RED = "#C8102E";

const KOMPETENZEN = [
  "Teamfähig",
  "Kommunikativ",
  "Zuverlässig",
  "Zielorientiert",
  "Lernbereit",
];

const SPRACHEN = [
  { name: "Deutsch", level: "Muttersprache", value: 100 },
  { name: "Italienisch", level: "Fliessend", value: 90 },
  { name: "Englisch", level: "Gut", value: 70 },
  { name: "Französisch", level: "Grundkenntnisse A1", value: 25 },
];

export function BewerbungLanding() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <span className="text-sm font-semibold tracking-tight">
            Julian Christen
          </span>
          <span
            className="text-[11px] font-medium uppercase tracking-[0.25em]"
            style={{ color: EV_RED }}
          >
            Bewerbung
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pb-20 pt-20 sm:pt-28">
        <div className="animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500">
            <MapPin className="h-3.5 w-3.5" style={{ color: EV_RED }} />
            Chur, Graubünden
          </div>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Julian Eric
            <br />
            Christen
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-neutral-600">
            Bewerbung für die{" "}
            <span className="font-medium text-neutral-900">
              kaufmännische Lehre (KV) Immobilien ab Sommer 2027
            </span>{" "}
            bei{" "}
            <span className="font-medium" style={{ color: EV_RED }}>
              Engel &amp; Völkers
            </span>
            .
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#expose"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: EV_RED }}
            >
              Mein Exposé ansehen <ArrowDownRight className="h-4 w-4" />
            </a>
            <a
              href="#unterlagen"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-300 px-7 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
            >
              Unterlagen <FileText className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Über mich */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <SectionLabel>Über mich</SectionLabel>
          <p className="mt-6 max-w-3xl font-serif text-2xl leading-snug text-neutral-800 sm:text-3xl">
            Mehrsprachig aufgewachsen, diszipliniert durch Sport und Musik – und
            fasziniert davon, wie Zahlen, wirtschaftliche Zusammenhänge und der
            direkte Kontakt mit Menschen in der Immobilienwelt zusammenkommen.
          </p>
          <p className="mt-5 max-w-3xl leading-relaxed text-neutral-600">
            Was ich auf dem Cello und auf dem Fussballplatz gelernt habe –
            Ausdauer, Teamgeist und der Wille, besser zu werden – bringe ich auch
            in den Beruf ein. Ich arbeite gerne präzise, denke unternehmerisch und
            gehe offen auf Menschen zu.
          </p>

          {/* Kompetenzen */}
          <div className="mt-8 flex flex-wrap gap-2">
            {KOMPETENZEN.map((k) => (
              <span
                key={k}
                className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-700"
              >
                {k}
              </span>
            ))}
          </div>

          {/* Fakten-Grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FactCard
              icon={<Languages className="h-5 w-5" />}
              title="Vier Sprachen"
              body={
                <div className="mt-3 space-y-2.5">
                  {SPRACHEN.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span className="font-medium text-neutral-700">
                          {s.name}
                        </span>
                        <span>{s.level}</span>
                      </div>
                      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${s.value}%`, backgroundColor: EV_RED }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              }
            />
            <FactCard
              icon={<Music2 className="h-5 w-5" />}
              title="Disziplin & Musik"
              body={
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Cellist, ausgezeichnet mit dem{" "}
                  <span className="font-medium text-neutral-800">
                    Lyonspreis Surselva
                  </span>
                  . Fussballspieler bei Orion Chur – Teamgeist und Ausdauer aus
                  erster Hand.
                </p>
              }
            />
            <FactCard
              icon={<Trophy className="h-5 w-5" />}
              title="Verantwortung"
              body={
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Zertifizierter Jugendleiter (
                  <span className="font-medium text-neutral-800">1418-Coach</span>
                  ) – ich übernehme früh Verantwortung und leite andere an.
                </p>
              }
            />
            <FactCard
              icon={<GraduationCap className="h-5 w-5" />}
              title="7 Schnuppertage"
              body={
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Sieben eigenständig organisierte Schnuppertage – ich gehe meine
                  Berufswahl strukturiert und selbstständig an.
                </p>
              }
            />
            <FactCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Digitale Affinität"
              body={
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Ich nutze KI, um eigene Web-Experiences zu programmieren – diese
                  Seite ist eines davon. So hebe ich mich von
                  Standardbewerbungen ab.
                </p>
              }
            />
            <FactCard
              icon={<CalendarClock className="h-5 w-5" />}
              title="Zur Person"
              body={
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Geboren am 23. Februar 2010, wohnhaft in Chur. Verfügbar für die
                  Lehre ab Sommer 2027.
                </p>
              }
            />
          </div>
        </div>
      </section>

      {/* Immobilien-Showcase */}
      <section id="expose" className="border-t border-neutral-100">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <SectionLabel>Immobilien-Showcase</SectionLabel>
          <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <h2 className="font-serif text-3xl text-neutral-900 sm:text-4xl">
              Wie ich Immobilien digital präsentiere
            </h2>
            <p className="max-w-sm text-sm text-neutral-500">
              Ein fiktives Exposé – um zu zeigen, wie ich ein Objekt edel in Szene
              setze und durchrechne.
            </p>
          </div>

          {/* Exposé-Karte */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <Gallery />
              <div className="mt-6">
                <p
                  className="text-xs font-medium uppercase tracking-[0.2em]"
                  style={{ color: EV_RED }}
                >
                  Engel &amp; Völkers · Chur Masans
                </p>
                <h3 className="mt-2 font-serif text-2xl text-neutral-900">
                  4.5-Zimmer-Attikawohnung mit Calandablick
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Lichtdurchflutete Attika in begehrter Wohnlage – grosszügige
                  Terrasse, hochwertiger Ausbau und ein freier Blick auf das
                  Calanda-Massiv.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Spec icon={<Ruler className="h-4 w-4" />} label="Wohnfläche" value="142 m²" />
                  <Spec icon={<BedDouble className="h-4 w-4" />} label="Zimmer" value="4.5" />
                  <Spec icon={<Building2 className="h-4 w-4" />} label="Baujahr" value="2023" />
                  <Spec icon={<MapPin className="h-4 w-4" />} label="Preis" value="1,25 Mio." />
                </div>
              </div>
            </div>

            <Tragbarkeitsrechner />
          </div>
        </div>
      </section>

      {/* Unterlagen / Downloads */}
      <section id="unterlagen" className="border-t border-neutral-100 bg-neutral-900">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center">
          <p
            className="text-xs font-medium uppercase tracking-[0.25em]"
            style={{ color: "#ff5a6e" }}
          >
            Unterlagen
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl text-white sm:text-4xl">
            Alles für Ihre Entscheidung – nur einen Klick entfernt.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-neutral-400">
            Lebenslauf und Bewerbungsschreiben als PDF zum Download.
          </p>

          <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <DownloadButton
              file="Lebenslauf_Julian_Christen (17).pdf"
              label="Lebenslauf"
              sub="PDF · Werdegang & Kompetenzen"
              primary
            />
            <DownloadButton
              file="Bewerbungsschreiben Julian Christen.pdf"
              label="Bewerbungsschreiben"
              sub="PDF · Meine Motivation"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 px-5 pb-14">
        <div className="mx-auto max-w-5xl border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-serif text-lg text-white">Julian Eric Christen</p>
              <p className="text-sm text-neutral-500">Chur · Graubünden</p>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-neutral-500">
              Diese Seite habe ich mit Hilfe von KI selbst programmiert – um zu
              zeigen, wie ich digitale Affinität in echte Resultate übersetze.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-medium uppercase tracking-[0.25em]"
      style={{ color: EV_RED }}
    >
      {children}
    </p>
  );
}

function FactCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-neutral-300">
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: "rgba(200,16,46,0.08)", color: EV_RED }}
        >
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      </div>
      {body}
    </div>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 p-3">
      <span className="text-neutral-400">{icon}</span>
      <p className="mt-2 text-[11px] uppercase tracking-wider text-neutral-400">
        {label}
      </p>
      <p className="font-serif text-lg text-neutral-900">{value}</p>
    </div>
  );
}

function DownloadButton({
  file,
  label,
  sub,
  primary,
}: {
  file: string;
  label: string;
  sub: string;
  primary?: boolean;
}) {
  return (
    <a
      href={`/${encodeURIComponent(file)}`}
      download={file}
      className={`group flex flex-1 items-center gap-4 rounded-2xl px-6 py-5 text-left transition ${
        primary
          ? "text-white hover:opacity-90"
          : "border border-white/20 text-white hover:bg-white/5"
      }`}
      style={primary ? { backgroundColor: EV_RED } : undefined}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          primary ? "bg-white/15" : "bg-white/10"
        }`}
      >
        <Download className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs text-white/70">{sub}</span>
      </span>
    </a>
  );
}
