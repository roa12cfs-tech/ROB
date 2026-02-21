import { MapPin, Star, Users } from "lucide-react";
import type { CareType, NursingHome } from "@/src/data/nursingHomes";

const careTypeLabels: Record<CareType, string> = {
  stationaer: "Stationaer",
  kurzzeit: "Kurzzeitpflege",
  demenz: "Demenzbetreuung",
  "betreutes-wohnen": "Betreutes Wohnen",
};

function PriceIndicator({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="text-sm font-medium text-foreground" aria-label={`Preislevel ${level} von 3`}>
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className={i < level ? "text-foreground" : "text-border"}>
          {"€"}
        </span>
      ))}
    </span>
  );
}

function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <Star className="h-4 w-4 fill-warning text-warning" />
      <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export function NursingHomeCard({ home }: { home: NursingHome }) {
  const isAvailable = home.availableSlots > 0;

  return (
    <article className="group flex flex-col rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4 p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-foreground group-hover:text-primary">
              {home.name}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{home.address}</span>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <RatingDisplay rating={home.rating} />
            <PriceIndicator level={home.priceLevel} />
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {home.description}
        </p>

        {/* Care Types */}
        <div className="flex flex-wrap gap-2">
          {home.careTypes.map((type) => (
            <span
              key={type}
              className="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground"
            >
              {careTypeLabels[type]}
            </span>
          ))}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5">
          {home.amenities.map((amenity) => (
            <span
              key={amenity}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-muted-foreground" />
            {isAvailable ? (
              <span className="text-sm font-medium text-success">
                {home.availableSlots} {home.availableSlots === 1 ? "Platz" : "Plaetze"} frei
              </span>
            ) : (
              <span className="text-sm font-medium text-destructive">Ausgebucht</span>
            )}
          </div>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              isAvailable
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "cursor-not-allowed bg-muted text-muted-foreground"
            }`}
            disabled={!isAvailable}
          >
            {isAvailable ? "Anfrage senden" : "Warteliste"}
          </button>
        </div>
      </div>
    </article>
  );
}
