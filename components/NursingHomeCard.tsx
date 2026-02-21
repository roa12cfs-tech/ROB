import { Badge } from "@/components/ui/Badge";
import type { CareType, NursingHome } from "@/src/data/nursingHomes";

const careTypeLabels: Record<CareType, string> = {
  stationaer: "Stationär",
  kurzzeit: "Kurzzeitpflege",
  demenz: "Demenzpflege",
  "betreutes-wohnen": "Betreutes Wohnen",
};

function PriceLevel({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="text-sm text-slate-500" aria-label={`Preisstufe ${level} von 3`}>
      <span className="text-slate-900">{"€".repeat(level)}</span>
      <span className="text-slate-300">{"€".repeat(3 - level)}</span>
    </span>
  );
}

export function NursingHomeCard({ home }: { home: NursingHome }) {
  const hasSlots = home.availableSlots > 0;

  return (
    <article className="surface group p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_46px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">{home.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{home.address}</p>
        </div>
        <Badge variant="rating">★ {home.rating.toFixed(1)}</Badge>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">{home.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {home.careTypes.map((careType) => (
          <Badge key={careType}>{careTypeLabels[careType]}</Badge>
        ))}
      </div>

      <div className="subtle-separator mt-6 flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          {hasSlots ? (
            <Badge variant="success">
              {home.availableSlots} {home.availableSlots === 1 ? "freier Platz" : "freie Plätze"}
            </Badge>
          ) : (
            <Badge variant="danger">Keine freien Plätze</Badge>
          )}
          <PriceLevel level={home.priceLevel} />
        </div>
        <a
          href={`/pflegeheim/${home.id}`}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 group-hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          aria-label={`Details zu ${home.name}`}
        >
          Details
        </a>
      </div>
    </article>
  );
}
