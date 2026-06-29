"use client";

import { useMemo, useState } from "react";

const chf = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  maximumFractionDigits: 0,
});

// Schweizer Standard-Annahmen für die Tragbarkeitsprüfung
const KALK_ZINS = 0.05; // kalkulatorischer Zinssatz (5 %)
const NEBENKOSTEN = 0.01; // Unterhalt/Nebenkosten (1 % des Kaufpreises)
const REAL_ZINS = 0.015; // beispielhafter aktueller Marktzins (1,5 %)
const AMORT_JAHRE = 15; // Amortisation der 2. Hypothek auf 66 % Belehnung

export function Tragbarkeitsrechner() {
  const [preis, setPreis] = useState(1_250_000);
  const [ekProzent, setEkProzent] = useState(20);

  const r = useMemo(() => {
    const eigenkapital = preis * (ekProzent / 100);
    const hypothek = Math.max(preis - eigenkapital, 0);
    const belehnung = preis > 0 ? hypothek / preis : 0;

    // 1. Hypothek bis 66 % bleibt bestehen, der Teil darüber wird in 15 J amortisiert
    const zweiteHypothek = Math.max(hypothek - preis * 0.66, 0);
    const amortisation = zweiteHypothek / AMORT_JAHRE;

    const kalkZinsKosten = hypothek * KALK_ZINS;
    const nebenkosten = preis * NEBENKOSTEN;
    const jahresKostenKalk = kalkZinsKosten + nebenkosten + amortisation;

    // Tragbarkeit: Kosten dürfen max. ein Drittel des Bruttoeinkommens sein
    const benoetigtesEinkommen = jahresKostenKalk / (1 / 3);

    // tatsächliche Kosten beim aktuellen Marktzins (ohne kalk. Aufschlag)
    const realMonatlich = (hypothek * REAL_ZINS + nebenkosten + amortisation) / 12;

    return {
      eigenkapital,
      hypothek,
      belehnung,
      jahresKostenKalk,
      benoetigtesEinkommen,
      realMonatlich,
      ekZuNiedrig: ekProzent < 20,
    };
  }, [preis, ekProzent]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C8102E]">
          Interaktiv
        </p>
        <h3 className="mt-2 font-serif text-2xl text-neutral-900">
          Tragbarkeits&shy;rechner
        </h3>
        <p className="mt-1 text-sm text-neutral-500">
          Wie viel Einkommen braucht es für dieses Objekt? Schieberegler bewegen –
          die Zahlen aktualisieren sich live.
        </p>
      </div>

      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="preis" className="text-sm font-medium text-neutral-700">
              Kaufpreis
            </label>
            <span className="font-serif text-lg tabular-nums text-neutral-900">
              {chf.format(preis)}
            </span>
          </div>
          <input
            id="preis"
            type="range"
            min={400_000}
            max={3_000_000}
            step={10_000}
            value={preis}
            onChange={(e) => setPreis(Number(e.target.value))}
            className="mt-3 w-full accent-[#C8102E]"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="ek" className="text-sm font-medium text-neutral-700">
              Eigenkapital
            </label>
            <span className="font-serif text-lg tabular-nums text-neutral-900">
              {ekProzent}% · {chf.format(r.eigenkapital)}
            </span>
          </div>
          <input
            id="ek"
            type="range"
            min={10}
            max={50}
            step={1}
            value={ekProzent}
            onChange={(e) => setEkProzent(Number(e.target.value))}
            className="mt-3 w-full accent-[#C8102E]"
          />
          {r.ekZuNiedrig && (
            <p className="mt-2 text-xs text-[#C8102E]">
              In der Schweiz sind in der Regel mindestens 20% Eigenkapital nötig.
            </p>
          )}
        </div>
      </div>

      {/* Ergebnis */}
      <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 text-center">
        <Cell label="Hypothek" value={chf.format(r.hypothek)} />
        <Cell label="Belehnung" value={`${Math.round(r.belehnung * 100)}%`} />
        <Cell
          label="Kalk. Kosten / Jahr"
          value={chf.format(r.jahresKostenKalk)}
        />
        <Cell
          label="Tatsächlich / Monat"
          value={chf.format(r.realMonatlich)}
          sub={`bei ${(REAL_ZINS * 100).toLocaleString("de-CH")}% Zins`}
        />
      </div>

      <div className="mt-4 rounded-xl bg-neutral-900 p-5 text-center text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          Benötigtes Bruttoeinkommen
        </p>
        <p className="mt-1 font-serif text-3xl tabular-nums">
          {chf.format(r.benoetigtesEinkommen)}
          <span className="text-base font-normal text-neutral-400"> / Jahr</span>
        </p>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-neutral-400">
        Unverbindliche Beispielrechnung nach gängigen Schweizer Annahmen
        (kalkulatorischer Zins {KALK_ZINS * 100}%, Nebenkosten {NEBENKOSTEN * 100}%,
        Amortisation auf 66% Belehnung über {AMORT_JAHRE} Jahre, Tragbarkeit max. ⅓
        des Bruttoeinkommens).
      </p>
    </div>
  );
}

function Cell({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white p-4">
      <p className="text-[11px] uppercase tracking-wider text-neutral-400">
        {label}
      </p>
      <p className="mt-1 font-serif text-xl tabular-nums text-neutral-900">
        {value}
      </p>
      {sub && <p className="text-[11px] text-neutral-400">{sub}</p>}
    </div>
  );
}
