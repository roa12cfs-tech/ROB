import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PflegeFinder – Pflegeheime in Deutschland",
  description:
    "Finden und vergleichen Sie Pflegeeinrichtungen in Deutschland. Transparent, ruhig und professionell.",
};

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
};

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="/" className="inline-flex items-center gap-3" aria-label="PflegeFinder Startseite">
          <span className="h-6 w-6 rounded-md bg-slate-900" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-tight text-slate-900">PflegeFinder</span>
        </a>
        <nav aria-label="Hauptnavigation" className="flex items-center gap-2">
          <a
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            Start
          </a>
          <a
            href="/suche"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            Suche
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="h-4 w-4 rounded-sm bg-slate-900" aria-hidden="true" />
          <span className="font-medium text-slate-900">PflegeFinder</span>
        </div>
        <p>© 2026 PflegeFinder. Sachlich. Unabhängig. Klar.</p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
