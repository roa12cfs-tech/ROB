import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PflegeFinder -- Pflegeheime in Deutschland",
  description:
    "Finden und vergleichen Sie Pflegeeinrichtungen in ganz Deutschland. Transparent, unabhaengig, kostenlos.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

function Nav() {
  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-border/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2.5" aria-label="PflegeFinder Startseite">
          <div className="h-7 w-7 rounded-md bg-foreground" aria-hidden="true" />
          <span className="text-base font-semibold tracking-tight text-foreground">
            PflegeFinder
          </span>
        </a>
        <nav aria-label="Hauptnavigation" className="flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Startseite
          </a>
          <a
            href="/suche"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Suche
          </a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 md:flex-row md:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-5 w-5 rounded-sm bg-foreground" aria-hidden="true" />
          <span className="text-sm font-medium text-foreground">PflegeFinder</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {"© 2026 PflegeFinder. Alle Rechte vorbehalten."}
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
