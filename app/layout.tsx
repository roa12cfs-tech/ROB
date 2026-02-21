import type { Metadata, Viewport } from "next";
import { Button } from "@/components/ui/Button";
import "./globals.css";

export const metadata: Metadata = {
  title: "PflegeFinder – Pflegeheime in Deutschland",
  description:
    "Finden und vergleichen Sie Pflegeeinrichtungen in Deutschland. Ruhig, transparent und unabhängig.",
};

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
};

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between">
        <a href="/" className="inline-flex items-center gap-3" aria-label="PflegeFinder Startseite">
          <span className="h-6 w-6 rounded-md bg-slate-900" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-tight text-slate-900">PflegeFinder</span>
        </a>
        <div className="flex items-center gap-1">
          <a
            href="/"
            className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Start
          </a>
          <a
            href="/suche"
            className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Suche
          </a>
          <a href="/suche" className="ml-2">
            <Button className="h-10">Jetzt suchen</Button>
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/70">
      <div className="container-shell flex flex-col gap-3 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="h-4 w-4 rounded-sm bg-slate-900" aria-hidden="true" />
          <span className="font-medium text-slate-900">PflegeFinder</span>
        </div>
        <p>Demo-Daten zur Orientierung. Für verbindliche Angaben kontaktieren Sie die Einrichtung direkt.</p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <div className="flex min-h-screen flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
