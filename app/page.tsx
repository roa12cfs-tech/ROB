import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const careTypes = [
  { value: "", label: "Alle Pflegearten" },
  { value: "stationaer", label: "Stationäre Pflege" },
  { value: "kurzzeit", label: "Kurzzeitpflege" },
  { value: "demenz", label: "Demenzpflege" },
  { value: "betreutes-wohnen", label: "Betreutes Wohnen" },
];

export default function HomePage() {
  return (
    <div className="container-shell pb-16 pt-12 md:pt-16">
      <section>
        <p className="text-sm font-medium text-slate-500">Pflege in Deutschland</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Den passenden Pflegeplatz finden – klar, ruhig und verlässlich.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          Vergleichen Sie Einrichtungen nach Ort, Pflegeart, Verfügbarkeit, Preisniveau und Bewertung.
        </p>
      </section>

      <Card className="mt-8 p-5 md:p-6">
        <form action="/suche" method="get" className="grid gap-4 md:grid-cols-[1fr_240px_auto]">
          <div>
            <label htmlFor="q" className="text-sm font-medium text-slate-700">
              Stadt oder PLZ
            </label>
            <Input id="q" name="q" placeholder="z. B. Berlin oder 10115" className="mt-2" />
          </div>
          <div>
            <label htmlFor="care" className="text-sm font-medium text-slate-700">
              Pflegeart
            </label>
            <Select id="care" name="care" defaultValue="" className="mt-2">
              {careTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <Button type="submit" className="self-end">
            Suche starten
          </Button>
        </form>
        <p className="mt-3 text-xs text-slate-500">Hinweis: Diese Anwendung arbeitet mit Demo-Daten.</p>
      </Card>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <h2 className="text-sm font-semibold text-slate-900">Geprüfte Einträge</h2>
          <p className="mt-1 text-sm text-slate-600">Kompakte Stammdaten zur ersten Orientierung.</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-sm font-semibold text-slate-900">Transparenter Vergleich</h2>
          <p className="mt-1 text-sm text-slate-600">Bewertung, Preisniveau und Verfügbarkeit auf einen Blick.</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-sm font-semibold text-slate-900">Kostenfrei nutzbar</h2>
          <p className="mt-1 text-sm text-slate-600">Suche ohne Anmeldung oder versteckte Gebühren.</p>
        </Card>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">So funktioniert’s</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {["Ort und Pflegeart wählen", "Ergebnisse filtern und vergleichen", "Details prüfen und Anfrage senden"].map(
            (step, index) => (
              <Card key={step} className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Schritt {index + 1}</p>
                <p className="mt-2 text-sm text-slate-700">{step}</p>
              </Card>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
