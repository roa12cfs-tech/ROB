import { notFound } from "next/navigation";
import { nursingHomes, type CareType } from "@/src/data/nursingHomes";
import { Badge } from "@/components/ui/Badge";

const careTypeLabels: Record<CareType, string> = {
  stationaer: "Stationaer",
  kurzzeit: "Kurzzeitpflege",
  demenz: "Demenzbetreuung",
  "betreutes-wohnen": "Betreutes Wohnen",
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function KeyFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-lg font-semibold text-foreground">{value}</span>
    </div>
  );
}

export default async function PflegeheimDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const home = nursingHomes.find((h) => h.id === id);

  if (!home) return notFound();

  const available = home.availableSlots > 0;
  const priceLabel = Array.from({ length: home.priceLevel }, () => "\u20AC").join("");

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <a href="/" className="transition-colors hover:text-foreground">Startseite</a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href="/suche" className="transition-colors hover:text-foreground">Suche</a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="truncate text-foreground">{home.name}</li>
        </ol>
      </nav>

      {/* Hero header */}
      <header>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {home.name}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">{home.address}</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
            <StarIcon className="h-5 w-5 text-warning" />
            <span className="text-xl font-bold text-foreground">{home.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">/ 5.0</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {home.careTypes.map((ct) => (
            <Badge key={ct} variant="outline">{careTypeLabels[ct]}</Badge>
          ))}
          {available ? (
            <Badge variant="success">
              {home.availableSlots} {home.availableSlots === 1 ? "Platz frei" : "Plaetze frei"}
            </Badge>
          ) : (
            <Badge variant="destructive">Ausgebucht</Badge>
          )}
        </div>
      </header>

      {/* Separator */}
      <div className="my-10 border-t border-border/60" />

      {/* Key facts grid */}
      <section aria-labelledby="facts-heading">
        <h2 id="facts-heading" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Auf einen Blick
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <KeyFact label="Bewertung" value={`${home.rating.toFixed(1)} / 5.0`} />
          <KeyFact label="Preisstufe" value={priceLabel} />
          <KeyFact label="Freie Plaetze" value={available ? String(home.availableSlots) : "Keine"} />
          <KeyFact label="Standort" value={`${home.postalCode} ${home.city}`} />
        </div>
      </section>

      {/* Description */}
      <section className="mt-10" aria-labelledby="desc-heading">
        <h2 id="desc-heading" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Beschreibung
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          {home.description}
        </p>
      </section>

      {/* Amenities */}
      <section className="mt-10" aria-labelledby="amenities-heading">
        <h2 id="amenities-heading" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Ausstattung
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {home.amenities.map((a) => (
            <Badge key={a} variant="secondary" className="px-3 py-1 text-sm">
              {a}
            </Badge>
          ))}
        </div>
      </section>

      {/* Bottom cards: Inquiry + Map placeholder */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Inquiry form */}
        <section className="rounded-2xl border border-border bg-card p-6" aria-labelledby="inquiry-heading">
          <h2 id="inquiry-heading" className="text-base font-semibold text-foreground">
            Anfrage senden
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Wir leiten Ihre Nachricht direkt an die Einrichtung weiter.
          </p>
          <form className="mt-5 flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ihr Name"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                E-Mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="ihre@email.de"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Nachricht
              </label>
              <textarea
                id="message"
                rows={3}
                placeholder="Ihre Nachricht..."
                className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-foreground py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Anfrage absenden
            </button>
          </form>
        </section>

        {/* Map placeholder */}
        <section className="flex flex-col items-center justify-center rounded-2xl border border-border bg-secondary p-6" aria-label="Kartenansicht">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background">
            <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">Kartenansicht</p>
          <p className="mt-1 text-xs text-muted-foreground">{home.address}</p>
        </section>
      </div>

      {/* Back link */}
      <div className="mt-12">
        <a
          href="/suche"
          className="text-sm font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          {"\u2190 Zurueck zur Suche"}
        </a>
      </div>
    </div>
  );
}
