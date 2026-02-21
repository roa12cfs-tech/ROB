import { nursingHomes } from "@/src/data/nursingHomes";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-semibold text-foreground md:text-3xl">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
        {number}
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  const totalSlots = nursingHomes.reduce((sum, h) => sum + h.availableSlots, 0);
  const cities = new Set(nursingHomes.map((h) => h.city)).size;

  return (
    <div>
      {/* Hero */}
      <section className="px-6 pb-16 pt-20 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Die richtige Pflege finden.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Vergleichen Sie Pflegeeinrichtungen in ganz Deutschland.
            Transparent, unabhaengig und kostenlos.
          </p>

          {/* Search card */}
          <form
            action="/suche"
            method="GET"
            className="mx-auto mt-10 flex max-w-lg items-center gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <SearchIcon className="ml-5 h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              name="q"
              placeholder="Stadt, PLZ oder Name..."
              className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              aria-label="Suchbegriff eingeben"
            />
            <select
              name="care"
              className="border-l border-border bg-transparent px-3 py-4 text-sm text-muted-foreground focus:outline-none"
              aria-label="Pflegeart waehlen"
            >
              <option value="">Alle Pflegearten</option>
              <option value="stationaer">Stationaer</option>
              <option value="kurzzeit">Kurzzeitpflege</option>
              <option value="demenz">Demenzbetreuung</option>
              <option value="betreutes-wohnen">Betreutes Wohnen</option>
            </select>
            <button
              type="submit"
              className="m-1.5 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Suchen
            </button>
          </form>
        </div>
      </section>

      {/* Separator */}
      <div className="mx-auto max-w-6xl border-t border-border/60" />

      {/* Trust metrics */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-8">
          <Metric value={String(nursingHomes.length)} label="Einrichtungen" />
          <Metric value={String(cities)} label="Staedte" />
          <Metric value={String(totalSlots)} label="Freie Plaetze" />
        </div>
      </section>

      {/* Separator */}
      <div className="mx-auto max-w-6xl border-t border-border/60" />

      {/* How it works */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            So funktioniert es
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <Step
              number="1"
              title="Suchen"
              description="Geben Sie Ihren Standort oder eine Pflegeart ein und finden Sie passende Einrichtungen."
            />
            <Step
              number="2"
              title="Vergleichen"
              description="Bewertungen, Preise und Ausstattung auf einen Blick. Filtern Sie nach Ihren Kriterien."
            />
            <Step
              number="3"
              title="Anfragen"
              description="Kontaktieren Sie Einrichtungen direkt und erhalten Sie alle wichtigen Informationen."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
