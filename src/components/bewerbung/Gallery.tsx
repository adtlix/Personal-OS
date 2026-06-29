"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Galerie des fiktiven Exposé-Objekts.
 *
 * Eigene Fotos einsetzen: Bilder unter /public/expose ablegen und die URLs unten
 * z.B. auf "/expose/wohnzimmer.jpg" ändern. Aktuell laden hochwertige Beispiel-
 * bilder von Unsplash (funktionieren direkt im Browser / nach dem Netlify-Deploy).
 */
const IMAGES: { src: string; caption: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    caption: "Offener Wohn-/Essbereich mit Eichenparkett",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
    caption: "Designküche mit Kochinsel",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    caption: "Masterbad en suite",
  },
  {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    caption: "Schlafzimmer mit Calandablick",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    caption: "Sonnenterrasse",
  },
];

export function Gallery() {
  const [active, setActive] = useState(0);
  const count = IMAGES.length;

  const go = (dir: number) => setActive((i) => (i + dir + count) % count);

  return (
    <div>
      {/* Hauptbild */}
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES[active].src}
          alt={IMAGES[active].caption}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <button
          type="button"
          aria-label="Vorheriges Bild"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-900 backdrop-blur transition hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Nächstes Bild"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-900 backdrop-blur transition hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3">
          <p className="text-sm font-medium text-white drop-shadow">
            {IMAGES[active].caption}
          </p>
          <span className="rounded-full bg-black/40 px-2.5 py-1 text-xs tabular-nums text-white backdrop-blur">
            {active + 1} / {count}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={img.caption}
            aria-current={i === active}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition ${
              i === active
                ? "ring-2 ring-[#C8102E] ring-offset-2"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.caption}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
