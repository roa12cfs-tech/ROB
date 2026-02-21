import { NursingHomeCard } from "@/components/NursingHomeCard";
import type { CareType } from "@/src/data/nursingHomes";
import { nursingHomes } from "@/src/data/nursingHomes";

const careTypeLabels: Record<CareType, string> = {
  stationaer: "Stationäre Pflege",
  kurzzeit: "Kurzzeitpflege",
  demenz: "Demenzpflege",
  "betreutes-wohnen": "Betreutes Wohnen",
};

function parsePrice(value?: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 3;
  return Math.min(3, Math.max(1, Math.round(parsed))) as 1 | 2 | 3;
}

function parseRating(value?: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(5, Math.max(0, parsed));
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    care?: CareType;
    onlyAvailable?: string;
    maxPrice?: string;
    minRating?: string;
  }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const qLower = q.toLowerCase();
  const care = params.care;
  const onlyAvailable = params.onlyAvailable === "on";
  const maxPrice = parsePrice(params.maxPrice);
  const minRating = parseRating(params.minRating);

  const results = nursingHomes
    .filter((home) => {
      const queryMatch =
        q.length === 0 ||
        home.city.toLowerCase().includes(qLower) ||
        home.postalCode.includes(q) ||
        home.address.toLowerCase().includes(qLower);

      const careMatch = !care || home.careTypes.includes(care);
      const availabilityMatch = !onlyAvailable || home.availableSlots > 0;
      const priceMatch = home.priceLevel <= maxPrice;
      const ratingMatch = home.rating >= minRating;

      return queryMatch && careMatch && availabilityMatch && priceMatch && ratingMatch;
    })
    .sort((a, b) => b.rating - a.rating || b.availableSlots - a.availableSlots);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Pflegeheime finden</h1>
        <p className="mt-2 text-sm text-slate-600">
          Filtern Sie nach Pflegeform, Verfügbarkeit, Preisniveau und Bewertung.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
        <aside className="surface p-5 lg:sticky lg:top-24" aria-label="Filterbereich">
          <form action="/suche" method="get" className="space-y-4">
            <div>
              <label htmlFor="q" className="text-sm font-medium text-slate-700">
                Stadt oder PLZ
              </label>
              <input
                id="q"
                name="q"
                defaultValue={q}
                className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                placeholder="z. B. München"
              />
            </div>

            <div>
              <label htmlFor="care" className="text-sm font-medium text-slate-700">
                Pflegeart
              </label>
              <select
                id="care"
                name="care"
                defaultValue={care ?? ""}
                className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
              >
                <option value="">Alle Pflegearten</option>
                {Object.entries(careTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="onlyAvailable"
                type="checkbox"
                name="onlyAvailable"
                defaultChecked={onlyAvailable}
                className="h-4 w-4 rounded border-slate-300"
              />
              <label htmlFor="onlyAvailable" className="text-sm text-slate-700">
                Nur freie Plätze
              </label>
            </div>

            <div>
              <label htmlFor="maxPrice" className="text-sm font-medium text-slate-700">
                Maximale Preisstufe
              </label>
              <select
                id="maxPrice"
                name="maxPrice"
                defaultValue={String(maxPrice)}
                className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
              >
                <option value="1">€</option>
                <option value="2">€€</option>
                <option value="3">€€€</option>
              </select>
            </div>

            <div>
              <label htmlFor="minRating" className="text-sm font-medium text-slate-700">
                Mindestbewertung: {minRating.toFixed(1)}
              </label>
              <input
                id="minRating"
                type="range"
                min="0"
                max="5"
                step="0.1"
                name="minRating"
                defaultValue={String(minRating)}
                className="mt-2 w-full accent-slate-900"
              />
            </div>

            <button
              type="submit"
              className="h-10 w-full rounded-xl bg-slate-900 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Filter anwenden
            </button>
          </form>
        </aside>

        <section aria-live="polite">
          <div className="mb-4 text-sm text-slate-600">{results.length} Ergebnis(se)</div>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((home) => (
                <NursingHomeCard key={home.id} home={home} />
              ))}
            </div>
          ) : (
            <div className="surface flex min-h-72 flex-col items-center justify-center p-8 text-center">
              <h2 className="text-xl font-semibold text-slate-900">Keine passenden Einrichtungen gefunden</h2>
              <p className="mt-2 max-w-md text-sm text-slate-600">
                Erweitern Sie die Suche, indem Sie den Ort allgemeiner wählen oder Filter lockern.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
