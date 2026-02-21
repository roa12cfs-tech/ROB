import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { nursingHomes } from "@/src/data/nursingHomes";

function PriceLevel({ level }: { level: 1 | 2 | 3 }) {
  return (
    <p className="text-sm text-slate-600" aria-label={`Preisstufe ${level} von 3`}>
      Preisniveau: <span className="font-medium text-slate-900">{"€".repeat(level)}</span>
      <span className="text-slate-300">{"€".repeat(3 - level)}</span>
    </p>
  );
}

export default async function NursingHomeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const routeParams = await params;
  const home = nursingHomes.find((entry) => entry.id === routeParams.id);
  if (!home) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
      <section className="surface p-8 md:p-10">
        <p className="text-sm font-medium text-slate-500">Einrichtungsprofil</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{home.name}</h1>
        <p className="mt-3 text-sm text-slate-600">{home.address}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Bewertung</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">★ {home.rating.toFixed(1)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Freie Plätze</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{home.availableSlots}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Preisstufe</p>
            <PriceLevel level={home.priceLevel} />
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="surface p-6 md:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Über die Einrichtung</h2>
          <p className="mt-4 leading-relaxed text-slate-600">{home.description}</p>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">Leistungen</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {home.amenities.map((amenity) => (
              <Badge key={amenity}>{amenity}</Badge>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="surface p-6">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">Anfrage senden</h2>
            <form className="mt-4 space-y-3">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Ihr Name
                </label>
                <input id="name" className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  E-Mail
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-slate-700">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Worum geht es in Ihrer Anfrage?"
                />
              </div>
              <button
                type="button"
                className="h-10 w-full rounded-xl bg-slate-900 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Anfrage absenden
              </button>
            </form>
          </section>

          <section className="surface p-6" aria-label="Kartenbereich">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">Lage</h2>
            <div className="mt-4 flex h-44 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              Kartenansicht Platzhalter
            </div>
            <p className="mt-3 text-sm text-slate-600">{home.address}</p>
          </section>
        </div>
      </div>

      <a
        href="/suche"
        className="mt-8 inline-flex rounded-lg px-2 py-1 text-sm font-medium text-slate-700 underline underline-offset-4 transition hover:text-slate-900"
      >
        Zurück zur Suche
      </a>
    </div>
  );
}
