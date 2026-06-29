# Bewerbungs-Landingpage – Anleitung

Diese Landingpage liegt auf der Startseite (`/`). Das Personal-OS-Dashboard ist
nach `/os` umgezogen.

## 1. Deine echten PDFs einsetzen

In diesem Ordner (`/public`) liegen zwei **Platzhalter-PDFs**:

- `Lebenslauf_Julian_Christen (17).pdf`
- `Bewerbungsschreiben Julian Christen.pdf`

Ersetze sie einfach durch deine echten Dateien – **mit exakt demselben Dateinamen**
(inkl. Leerzeichen und Klammern). Die Download-Buttons funktionieren dann sofort.

## 2. Eigene Fotos für das Exposé (optional)

Die Galerie nutzt aktuell hochwertige Beispielbilder von Unsplash. Möchtest du
eigene Fotos zeigen:

1. Lege deine Bilder in `/public/expose` ab (z.B. `wohnzimmer.jpg`).
2. Öffne `src/components/bewerbung/Gallery.tsx` und ändere die URLs im `IMAGES`-Array
   z.B. auf `"/expose/wohnzimmer.jpg"`.

## 3. Lokal starten

```bash
npm install
npm run dev
```

Dann im Browser `http://localhost:3000` öffnen.

## 4. Deployen (z.B. Netlify / Vercel)

Es ist ein Next.js-Projekt. Auf Netlify das Repo verbinden – Build-Command
`npm run build`, das offizielle Next.js-Plugin übernimmt den Rest. Auf Vercel
funktioniert das Deployment out of the box.
