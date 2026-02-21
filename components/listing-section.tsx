"use client";

import { useState, useMemo } from "react";
import { nursingHomes, type CareType } from "@/src/data/nursingHomes";
import { FilterBar } from "./filter-bar";
import { NursingHomeCard } from "./nursing-home-card";
import { SearchX } from "lucide-react";

export function ListingSection() {
  const [selectedCareType, setSelectedCareType] = useState<CareType | "all">("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const cities = useMemo(
    () => [...new Set(nursingHomes.map((h) => h.city))].sort(),
    []
  );

  const filtered = useMemo(() => {
    return nursingHomes.filter((home) => {
      if (selectedCareType !== "all" && !home.careTypes.includes(selectedCareType)) {
        return false;
      }
      if (selectedCity !== "all" && home.city !== selectedCity) {
        return false;
      }
      if (showAvailableOnly && home.availableSlots === 0) {
        return false;
      }
      return true;
    });
  }, [selectedCareType, selectedCity, showAvailableOnly]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Pflegeeinrichtungen
          <span className="ml-2 text-base font-normal text-muted-foreground">
            ({filtered.length} {filtered.length === 1 ? "Ergebnis" : "Ergebnisse"})
          </span>
        </h2>
      </div>

      <div className="mt-4">
        <FilterBar
          selectedCareType={selectedCareType}
          onCareTypeChange={setSelectedCareType}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          showAvailableOnly={showAvailableOnly}
          onAvailableOnlyChange={setShowAvailableOnly}
          cities={cities}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((home) => (
            <NursingHomeCard key={home.id} home={home} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <SearchX className="h-12 w-12 text-muted-foreground/50" />
          <p className="text-lg font-medium text-foreground">
            Keine Ergebnisse gefunden
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Versuchen Sie andere Filtereinstellungen, um passende Einrichtungen zu finden.
          </p>
        </div>
      )}
    </section>
  );
}
