import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-card px-4 pb-10 pt-12 md:px-6 md:pb-14 md:pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Das passende Pflegeheim finden
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
          Vergleichen Sie Pflegeeinrichtungen in ganz Deutschland.
          Transparent, unabhaengig und kostenlos.
        </p>
        <div className="mx-auto mt-8 flex max-w-md items-center gap-0 rounded-lg border border-border bg-background shadow-sm">
          <Search className="ml-4 h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Stadt oder Einrichtung suchen..."
            className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Pflegeheim suchen"
          />
          <button className="mr-1.5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Suchen
          </button>
        </div>
      </div>
    </section>
  );
}
