const careTypes = [
  { value: "", label: "Pflegeart wählen" },
  { value: "stationaer", label: "Stationäre Pflege" },
  { value: "kurzzeit", label: "Kurzzeitpflege" },
  { value: "demenz", label: "Demenzpflege" },
  { value: "betreutes-wohnen", label: "Betreutes Wohnen" },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12 md:pt-16">
      <section className="surface p-8 md:p-12">
        <p className="text-sm font-medium text-slate-500">Pflege in Deutschland</p>
        <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Den passenden Pflegeplatz finden – ruhig, transparent und ohne Umwege.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          PflegeFinder unterstützt Sie bei der ersten Orientierung: nach Ort, Pflegeform und Verfügbarkeit.
        </p>

        <form action="/suche" method="get" className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_240px_auto] md:p-5">
          <div>
            <label htmlFor="q" className="text-sm font-medium text-slate-700">
              Stadt oder PLZ
            </label>
            <input
              id="q"
              name="q"
              placeholder="z. B. Berlin oder 10115"
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            />
          </div>
          <div>
            <label htmlFor="care" className="text-sm font-medium text-slate-700">
              Pflegeart
            </label>
            <select
              id="care"
              name="care"
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              defaultValue=""
            >
              {careTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="h-11 self-end rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Suche starten
          </button>
        </form>

        <dl className="mt-8 grid gap-4 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:grid-cols-3">
          <div>
            <dt className="font-medium text-slate-900">Geprüfte Einträge</dt>
            <dd className="mt-1">Aktuelle Stammdaten und Leistungsprofile.</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-900">Klare Vergleichbarkeit</dt>
            <dd className="mt-1">Bewertungen, Preisniveau und freie Plätze auf einen Blick.</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-900">Kostenfrei nutzbar</dt>
            <dd className="mt-1">Unabhängige Suche ohne Registrierung.</dd>
          </div>
        </dl>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="surface p-6">
          <h2 className="text-lg font-semibold tracking-tight">So funktioniert es</h2>
          <ol className="mt-4 space-y-3 text-sm text-slate-600">
            <li>1. Ort und Pflegeform auswählen.</li>
            <li>2. Ergebnisse nach Verfügbarkeit, Preis und Bewertung filtern.</li>
            <li>3. Details vergleichen und direkt Kontakt aufnehmen.</li>
          </ol>
        </article>
        <article className="surface p-6">
          <h2 className="text-lg font-semibold tracking-tight">Für Angehörige und Betroffene</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Die Suche ist bewusst reduziert gestaltet, damit Entscheidungen in einer anspruchsvollen
            Situation leicht und konzentriert getroffen werden können.
          </p>
        </article>
      </section>
    </div>
  );
}
