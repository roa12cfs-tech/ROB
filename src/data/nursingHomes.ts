export type CareType = "stationaer" | "kurzzeit" | "demenz" | "betreutes-wohnen";

export type NursingHome = {
  id: string;
  name: string;
  city: string;
  postalCode: string;
  address: string;
  rating: number; // 0..5
  priceLevel: 1 | 2 | 3; // € €€ €€€
  availableSlots: number;
  careTypes: CareType[];
  amenities: string[];
  description: string;
};

export const nursingHomes: NursingHome[] = [
  {
    id: "sonnenhof-berlin",
    name: "Pflegezentrum Sonnenhof",
    city: "Berlin",
    postalCode: "10115",
    address: "Beispielstraße 12, 10115 Berlin",
    rating: 4.6,
    priceLevel: 2,
    availableSlots: 3,
    careTypes: ["stationaer", "demenz"],
    amenities: ["Einzelzimmer", "Garten", "Aufzug", "Physiotherapie"],
    description:
      "Ruhiges Pflegezentrum mit Schwerpunkt Demenzbetreuung. Zentrale Lage, familiäre Atmosphäre.",
  },
  {
    id: "weserblick-bremen",
    name: "Seniorenresidenz Weserblick",
    city: "Bremen",
    postalCode: "28195",
    address: "Uferweg 8, 28195 Bremen",
    rating: 4.2,
    priceLevel: 3,
    availableSlots: 0,
    careTypes: ["stationaer", "kurzzeit"],
    amenities: ["Einzelzimmer", "Cafeteria", "Friseur", "Aufzug"],
    description:
      "Moderne Residenz mit Kurzzeitpflege-Angebot. Hohes Komfortniveau und umfangreiche Serviceleistungen.",
  },
  {
    id: "alpenruh-muenchen",
    name: "Haus Alpenruh",
    city: "München",
    postalCode: "80331",
    address: "Altstadtgasse 3, 80331 München",
    rating: 4.8,
    priceLevel: 2,
    availableSlots: 5,
    careTypes: ["betreutes-wohnen", "stationaer"],
    amenities: ["Garten", "Ergotherapie", "Einzelzimmer", "Nahverkehr"],
    description:
      "Betreutes Wohnen mit optionalen Pflegeleistungen. Sehr gute Bewertungen und kurze Wege in die Innenstadt.",
  },
];
