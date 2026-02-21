import type { NursingHome, CareType } from "@/src/data/nursingHomes";
import { Badge } from "@/components/ui/Badge";

const careTypeLabels: Record<CareType, string> = {
  stationaer: "Stationaer",
  kurzzeit: "Kurzzeitpflege",
  demenz: "Demenzbetreuung",
  "betreutes-wohnen": "Betreutes Wohnen",
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function PricePills({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span
      className="text-sm tracking-wide text-muted-foreground"
      aria-label={`Preisstufe ${level} von 3`}
    >
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className={i < level ? "text-foreground" : "text-border"}>
          {"€"}
        </span>
      ))}
    </span>
  );
}

export function NursingHomeCard({ home }: { home: NursingHome }) {
  const available = home.availableSlots > 0;

  return (
    <a
      href={`/pflegeheim/${home.id}`}
      className="card-hover group flex flex-col rounded-2xl border border-border bg-card p-6"
    >
      {/* Top row: name + rating */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-foreground group-hover:text-foreground/80">
            {home.name}
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {home.address}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <StarIcon className="h-4 w-4 text-warning" />
          <span className="text-sm font-semibold text-foreground">
            {home.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {home.description}
      </p>

      {/* Care type chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {home.careTypes.map((ct) => (
          <Badge key={ct} variant="secondary">
            {careTypeLabels[ct]}
          </Badge>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4" style={{ marginTop: "1.25rem" }}>
        <div className="flex items-center gap-3">
          {available ? (
            <Badge variant="success">
              {home.availableSlots} {home.availableSlots === 1 ? "Platz frei" : "Plaetze frei"}
            </Badge>
          ) : (
            <Badge variant="destructive">Ausgebucht</Badge>
          )}
          <PricePills level={home.priceLevel} />
        </div>
        <span className="text-sm font-medium text-foreground group-hover:underline">
          {"Details \u2192"}
        </span>
      </div>
    </a>
  );
}
