"use client";

import type { CareType } from "@/src/data/nursingHomes";

const careTypeLabels: Record<CareType, string> = {
  stationaer: "Stationaer",
  kurzzeit: "Kurzzeitpflege",
  demenz: "Demenzbetreuung",
  "betreutes-wohnen": "Betreutes Wohnen",
};

type FilterBarProps = {
  selectedCareType: CareType | "all";
  onCareTypeChange: (value: CareType | "all") => void;
  selectedCity: string;
  onCityChange: (value: string) => void;
  showAvailableOnly: boolean;
  onAvailableOnlyChange: (value: boolean) => void;
  cities: string[];
};

export function FilterBar({
  selectedCareType,
  onCareTypeChange,
  selectedCity,
  onCityChange,
  showAvailableOnly,
  onAvailableOnlyChange,
  cities,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={selectedCareType}
        onChange={(e) => onCareTypeChange(e.target.value as CareType | "all")}
        className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Pflegeart filtern"
      >
        <option value="all">Alle Pflegearten</option>
        {(Object.keys(careTypeLabels) as CareType[]).map((key) => (
          <option key={key} value={key}>
            {careTypeLabels[key]}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Stadt filtern"
      >
        <option value="all">Alle Staedte</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={showAvailableOnly}
          onChange={(e) => onAvailableOnlyChange(e.target.checked)}
          className="h-4 w-4 rounded accent-primary"
        />
        <span>Nur verfuegbar</span>
      </label>
    </div>
  );
}
