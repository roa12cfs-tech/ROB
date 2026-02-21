import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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

export function NursingHomeCard({ home, href }: { home: NursingHome; href?: string }) {
  const hasSlots = home.availableSlots > 0;

  return (
    <Card className="p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold tracking-tight text-slate-900">{home.name}</h3>
          <p className="mt-1 truncate text-sm text-slate-600">{home.address}</p>
        </div>
        <Badge variant="rating">★ {home.rating.toFixed(1)}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {home.careTypes.map((careType) => (
          <Badge key={careType}>{careTypeLabels[careType]}</Badge>
        ))}
      </div>

      <div className="subtle-divider mt-6 flex items-center justify-between pt-4">
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
        <a href={href ?? `/pflegeheim/${home.id}`} aria-label={`Details zu ${home.name}`}>
          <Button variant="secondary" className="h-10">
            Details
          </Button>
        </a>
      </div>
    </Card>
  );
}
