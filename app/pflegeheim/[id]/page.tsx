import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { nursingHomes } from "@/src/data/nursingHomes";

const careTypeLabels = {
  stationaer: "Stationär",
  kurzzeit: "Kurzzeitpflege",
  demenz: "Demenzpflege",
  "betreutes-wohnen": "Betreutes Wohnen",
} as const;

function PriceLevel({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="text-sm text-slate-600" aria-label={`Preisstufe ${level} von 3`}>
      <span className="font-medium text-slate-900">{"€".repeat(level)}</span>
      <span className="text-slate-300">{"€".repeat(3 - level)}</span>
    </span>
  );
}

export default async function NursingHomeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const routeParams = await params;
  const currentSearchParams = await searchParams;
  const home = nursingHomes.find((entry) => entry.id === routeParams.id);

  if (!home) notFound();

  const q = typeof currentSearchParams.q === "string" ? currentSearchParams.q : "";
  const care = typeof currentSearchParams.care === "string" ? currentSearchParams.care : "";
  const onlyAvailable =
    typeof currentSearchParams.onlyAvailable === "string" ? currentSearchParams.onlyAvailable : "";
  const maxPrice = typeof currentSearchParams.maxPrice === "string" ? currentSearchParams.maxPrice : "";
  const minRating = typeof currentSearchParams.minRating === "string" ? currentSearchParams.minRating : "";

  const backQuery = new URLSearchParams({
    ...(q ? { q } : {}),
    ...(care ? { care } : {}),
    ...(onlyAvailable ? { onlyAvailable } : {}),
    ...(maxPrice ? { maxPrice } : {}),
    ...(minRating ? { minRating } : {}),
  }).toString();

  return (
    <div className="container-shell pb-16 pt-10">
      <a
        href={backQuery ? `/suche?${backQuery}` : "/suche"}
        className="inline-flex min-h-11 items-center text-sm font-medium text-slate-700 underline underline-offset-4 transition hover:text-slate-900"
      >
        Zurück zur Suche
      </a>

      <Card className="mt-4 p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Einrichtungsprofil</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{home.name}</h1>
            <p className="mt-2 text-sm text-slate-600">{home.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="rating">★ {home.rating.toFixed(1)}</Badge>
            {home.availableSlots > 0 ? (
              <Badge variant="success">{home.availableSlots} freie Plätze</Badge>
            ) : (
              <Badge variant="danger">Keine freien Plätze</Badge>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Pflegearten</p>
            <p className="mt-1 text-sm text-slate-800">
              {home.careTypes.map((type) => careTypeLabels[type]).join(", ")}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Preisstufe</p>
            <p className="mt-1">
              <PriceLevel level={home.priceLevel} />
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Verfügbarkeit</p>
            <p className="mt-1 text-sm text-slate-800">{home.availableSlots} Plätze</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Hinweis</p>
            <p className="mt-1 text-sm text-slate-800">Demo-Daten, unverbindlich.</p>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card className="p-6 md:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Über die Einrichtung</h2>
          <p className="mt-4 leading-relaxed text-slate-600">{home.description}</p>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">Ausstattung</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {home.amenities.map((amenity) => (
              <Badge key={amenity}>{amenity}</Badge>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">Anfrage (Demo)</h2>
            <form className="mt-4 space-y-3">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Name
                </label>
                <Input id="name" className="mt-1.5" />
              </div>
              <div>
                <label htmlFor="contact" className="text-sm font-medium text-slate-700">
                  Kontakt (E-Mail oder Telefon)
                </label>
                <Input id="contact" className="mt-1.5" />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-slate-700">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  placeholder="Worum geht es in Ihrer Anfrage?"
                />
              </div>
              <Button type="button" className="w-full">
                Anfrage absenden
              </Button>
            </form>
          </Card>

          <Card className="p-6" aria-label="Kartenbereich">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">Lage</h2>
            <div className="mt-4 flex h-44 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              Kartenansicht (Platzhalter)
            </div>
            <p className="mt-3 text-sm text-slate-600">{home.address}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
