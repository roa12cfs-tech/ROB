import { nursingHomes, type CareType } from "@/src/data/nursingHomes";
import { NursingHomeCard } from "@/components/NursingHomeCard";

const careTypeLabels: Record<CareType, string> = {
  stationaer: "Stationaer",
  kurzzeit: "Kurzzeitpflege",
  demenz: "Demenzbetreuung",
  "betreutes-wohnen": "Betreutes Wohnen",
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

type SearchParams = {
  q?: string;
  care?: string;
  available?: string;
  maxPrice?: string;
  minRating?: string;
};

export default async function SuchePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const q = params.q?.toLowerCase().trim() ?? "";
  const care = params.care ?? "";
  const availableOnly = params.available === "1";
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : 3;
  const minRating = params.minRating ? Number(params.minRating) : 0;

  // Filter
  let results = nursingHomes.filter((home) => {
    if (q && !home.name.toLowerCase().includes(q) && !home.city.toLowerCase().includes(q) && !home.postalCode.includes(q)) {
      return false;
    }
    if (care && !home.careTypes.includes(care as CareType)) {
      return false;
    }
    if (availableOnly && home.availableSlots === 0) {
      return false;
    }
    if (home.priceLevel > maxPrice) {
      return false;
    }
    if (home.rating < minRating) {
      return false;
    }
    return true;
  });

  // Sort: rating desc, then availableSlots desc
  results = results.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.availableSlots - a.availableSlots;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Pflegeeinrichtungen finden
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "Ergebnis" : "Ergebnisse"}
          {q ? ` fuer "${params.q}"` : ""}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row">
        {/* -- Filter sidebar -- */}
        <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:h-fit lg:w-64">
          <form action="/suche" method="GET" className="flex flex-col gap-5">
            {/* Search input */}
            <div>
              <label htmlFor="q" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Suche
              </label>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
                <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  id="q"
                  type="text"
                  name="q"
                  defaultValue={params.q ?? ""}
                  placeholder="Stadt, PLZ, Name..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>

            {/* Care type */}
            <div>
              <label htmlFor="care" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pflegeart
              </label>
              <select
                id="care"
                name="care"
                defaultValue={care}
                className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Alle Pflegearten</option>
                {(Object.keys(careTypeLabels) as CareType[]).map((key) => (
                  <option key={key} value={key}>
                    {careTypeLabels[key]}
                  </option>
                ))}
              </select>
            </div>

            {/* Available only */}
            <label className="flex items-center gap-2.5 text-sm text-foreground">
              <input
                type="checkbox"
                name="available"
                value="1"
                defaultChecked={availableOnly}
                className="h-4 w-4 rounded border-border accent-foreground"
              />
              Nur verfuegbare Plaetze
            </label>

            {/* Max price */}
            <div>
              <label htmlFor="maxPrice" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {"Max. Preisstufe"}
              </label>
              <select
                id="maxPrice"
                name="maxPrice"
                defaultValue={String(maxPrice)}
                className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="1">{"€"}</option>
                <option value="2">{"€€"}</option>
                <option value="3">{"€€€ (alle)"}</option>
              </select>
            </div>

            {/* Min rating */}
            <div>
              <label htmlFor="minRating" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mindestbewertung
              </label>
              <select
                id="minRating"
                name="minRating"
                defaultValue={String(minRating)}
                className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="0">Alle</option>
                <option value="3">{"ab 3.0 \u2605"}</option>
                <option value="4">{"ab 4.0 \u2605"}</option>
                <option value="4.5">{"ab 4.5 \u2605"}</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-foreground py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Filter anwenden
            </button>
          </form>
        </aside>

        {/* -- Results -- */}
        <div className="flex-1">
          {results.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {results.map((home) => (
                <NursingHomeCard key={home.id} home={home} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <SearchIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold text-foreground">Keine Ergebnisse</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Versuchen Sie andere Suchbegriffe oder erweitern Sie Ihre Filter.
              </p>
              <a
                href="/suche"
                className="mt-2 text-sm font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Filter zuruecksetzen
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
