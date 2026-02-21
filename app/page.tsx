export default function LandingPage() {
  return (
    <div className="px-6 py-10 md:py-14">
      {/* Hero card */}
      <section className="mx-auto max-w-4xl rounded-2xl border border-border bg-card px-6 py-10 md:px-12 md:py-14">
        <p className="text-sm font-medium text-muted-foreground">
          Pflege in Deutschland
        </p>

        <h1 className="mt-4 max-w-lg text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
          Den passenden Pflegeplatz finden – ruhig, transparent und ohne Umwege.
        </h1>

        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          PflegeFinder unterst&uuml;tzt Sie bei der ersten Orientierung: nach
          Ort, Pflegeform und Verf&uuml;gbarkeit.
        </p>

        {/* Search form */}
        <form
          action="/suche"
          method="GET"
          className="mt-10 rounded-xl border border-border bg-card p-5"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end">
            {/* Stadt oder PLZ */}
            <div className="flex-1">
              <label
                htmlFor="q"
                className="text-sm font-medium text-foreground"
              >
                Stadt oder PLZ
              </label>
              <input
                id="q"
                type="text"
                name="q"
                placeholder="z. B. Berlin oder 10115"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Pflegeart */}
            <div className="md:w-52">
              <label
                htmlFor="care"
                className="text-sm font-medium text-foreground"
              >
                Pflegeart
              </label>
              <select
                id="care"
                name="care"
                className="mt-2 w-full appearance-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Pflegeart w&auml;hlen"
              >
                <option value="">{"Pflegeart w\u00e4hlen"}</option>
                <option value="stationaer">{"Station\u00e4r"}</option>
                <option value="kurzzeit">Kurzzeitpflege</option>
                <option value="demenz">Demenzbetreuung</option>
                <option value="betreutes-wohnen">Betreutes Wohnen</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Suche starten
            </button>
          </div>
        </form>

        {/* Feature highlights */}
        <div className="mt-8 border-t border-border pt-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {"Gepr\u00fcfte Eintr\u00e4ge"}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Aktuelle Stammdaten und Leistungsprofile.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Klare Vergleichbarkeit
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {"Bewertungen, Preisniveau und freie Pl\u00e4tze auf einen Blick."}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Kostenfrei nutzbar
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {"Unabh\u00e4ngige Suche ohne Registrierung."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two info cards */}
      <div className="mx-auto mt-6 grid max-w-4xl gap-6 md:grid-cols-2">
        {/* How it works */}
        <div className="rounded-2xl border border-border bg-card px-6 py-8 md:px-8">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            So funktioniert es
          </h2>
          <ol className="mt-5 flex flex-col gap-3">
            <li className="text-sm leading-relaxed text-muted-foreground">
              {"1. Ort und Pflegeform ausw\u00e4hlen."}
            </li>
            <li className="text-sm leading-relaxed text-muted-foreground">
              {"2. Ergebnisse nach Verf\u00fcgbarkeit, Preis und Bewertung filtern."}
            </li>
            <li className="text-sm leading-relaxed text-muted-foreground">
              3. Details vergleichen und direkt Kontakt aufnehmen.
            </li>
          </ol>
        </div>

        {/* For relatives */}
        <div className="rounded-2xl border border-border bg-card px-6 py-8 md:px-8">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            {"F\u00fcr Angeh\u00f6rige und Betroffene"}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {"Die Suche ist bewusst reduziert gestaltet, damit Entscheidungen in einer anspruchsvollen Situation leicht und konzentriert getroffen werden k\u00f6nnen."}
          </p>
        </div>
      </div>
    </div>
  );
}
