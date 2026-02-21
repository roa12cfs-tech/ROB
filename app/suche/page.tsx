import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { NursingHomeCard } from "@/components/NursingHomeCard";
import type { CareType } from "@/src/data/nursingHomes";
import { nursingHomes } from "@/src/data/nursingHomes";

const careTypeLabels: Record<CareType, string> = {
  stationaer: "Stationäre Pflege",
  kurzzeit: "Kurzzeitpflege",
  demenz: "Demenzpflege",
  "betreutes-wohnen": "Betreutes Wohnen",
};

type SearchParams = {
  q?: string;
  care?: CareType;
  onlyAvailable?: string;
  maxPrice?: string;
  minRating?: string;
};

function parsePrice(value?: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 3;
  return Math.min(3, Math.max(1, Math.round(parsed))) as 1 | 2 | 3;
}

function parseRating(value?: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return [0, 3.5, 4.0, 4.5].includes(parsed) ? parsed : 0;
}

function getActiveFilters({
  q,
  care,
  onlyAvailable,
  maxPrice,
  minRating,
}: {
  q: string;
  care: "" | CareType;
  onlyAvailable: string;
  maxPrice: string;
  minRating: string;
}) {
  const filters: string[] = [];
  if (q) filters.push(`Ort: ${q}`);
  if (care) filters.push(careTypeLabels[care]);
  if (onlyAvailable === "on") filters.push("Nur freie Plätze");
  if (maxPrice !== "3") filters.push(`Max. Preis: ${"€".repeat(Number(maxPrice))}`);
  if (minRating !== "0") filters.push(`Ab ${Number(minRating).toFixed(1)} ★`);
  return filters;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const care = params.care ?? "";
  const onlyAvailable = params.onlyAvailable ?? "";
  const maxPrice = String(parsePrice(params.maxPrice));
  const minRating = String(parseRating(params.minRating));

  const query = q.toLowerCase();
  const results = nursingHomes
    .filter((home) => {
      const qMatch =
        q.length === 0 ||
        home.name.toLowerCase().includes(query) ||
        home.city.toLowerCase().includes(query) ||
        home.postalCode.includes(q);
      const careMatch = !care || home.careTypes.includes(care as CareType);
      const availableMatch = onlyAvailable !== "on" || home.availableSlots > 0;
      const priceMatch = home.priceLevel <= Number(maxPrice);
      const ratingMatch = home.rating >= Number(minRating);
      return qMatch && careMatch && availableMatch && priceMatch && ratingMatch;
    })
    .sort((a, b) => b.rating - a.rating || b.availableSlots - a.availableSlots);

  const activeFilters = getActiveFilters({ q, care, onlyAvailable, maxPrice, minRating });

  const baseQuery = new URLSearchParams({
    ...(q ? { q } : {}),
    ...(care ? { care } : {}),
    ...(onlyAvailable ? { onlyAvailable } : {}),
    ...(maxPrice ? { maxPrice } : {}),
    ...(minRating ? { minRating } : {}),
  }).toString();

  return (
    <div className="container-shell pb-16 pt-10">
      <header>
        <p className="text-sm font-medium text-slate-500">Suche</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Pflegeheime vergleichen</h1>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
        <Card className="p-5 lg:sticky lg:top-24" aria-label="Filterbereich">
          <form action="/suche" method="get" className="space-y-4">
            <div>
              <label htmlFor="q" className="text-sm font-medium text-slate-700">
                Stadt oder PLZ
              </label>
              <Input id="q" name="q" defaultValue={q} className="mt-1.5" />
            </div>

            <div>
              <label htmlFor="care" className="text-sm font-medium text-slate-700">
                Pflegeart
              </label>
              <Select id="care" name="care" defaultValue={care} className="mt-1.5">
                <option value="">Alle Pflegearten</option>
                {Object.entries(careTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex min-h-11 items-center gap-2">
              <input
                id="onlyAvailable"
                type="checkbox"
                name="onlyAvailable"
                defaultChecked={onlyAvailable === "on"}
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
              <Select id="maxPrice" name="maxPrice" defaultValue={maxPrice} className="mt-1.5">
                <option value="1">€</option>
                <option value="2">€€</option>
                <option value="3">€€€</option>
              </Select>
            </div>

            <div>
              <label htmlFor="minRating" className="text-sm font-medium text-slate-700">
                Mindestbewertung
              </label>
              <Select id="minRating" name="minRating" defaultValue={minRating} className="mt-1.5">
                <option value="0">Keine</option>
                <option value="3.5">Ab 3.5</option>
                <option value="4">Ab 4.0</option>
                <option value="4.5">Ab 4.5</option>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Filter anwenden
            </Button>
          </form>
        </Card>

        <section aria-live="polite">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">{results.length} Ergebnis(se)</p>
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2" aria-label="Aktive Filter">
                {activeFilters.map((filter) => (
                  <Badge key={filter}>{filter}</Badge>
                ))}
              </div>
            )}
          </div>

          {results.length === 0 ? (
            <Card className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
              <h2 className="text-xl font-semibold text-slate-900">Keine passenden Einrichtungen gefunden</h2>
              <p className="mt-2 max-w-md text-sm text-slate-600">
                Versuchen Sie eine allgemeinere Stadtangabe oder lockern Sie einzelne Filter.
              </p>
              <a href="/suche" className="mt-5">
                <Button variant="secondary">Filter zurücksetzen</Button>
              </a>
            </Card>
          ) : (
            <div className="space-y-4">
              {results.map((home) => (
                <NursingHomeCard
                  key={home.id}
                  home={home}
                  href={`/pflegeheim/${home.id}${baseQuery ? `?${baseQuery}` : ""}`}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
