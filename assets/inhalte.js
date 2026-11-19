/* =====================================================================
   INHALTE DER LERNSEITE
   Hier pflegst du alles: Klassen, Lernbereiche, Themen und Lernpakete.
   Die Seiten (Startseite, Klassenseite, Lernpaket) bauen sich daraus auf.

   - Jedes Thema braucht eine eindeutige id (z. B. "lin-steigung").
   - link: Pfad zur Lernseite, relativ zum Hauptordner.
   - kann: „Ich kann …“-Satz, der im Lernpaket als Lernziel angezeigt wird.
   - ap: true markiert Themen für die Seite „Abschlussprüfung“.
   - pruefung: true bei einer Klasse zeigt dort den Lernweg „Für die Prüfung trainieren“
     (nur Abschlussklassen V10 und Z11).
   - zweig: "vierstufig" oder "zweistufig" – danach sortiert die Startseite.
   - Ein Lernpaket listet nur die ids der Themen, die drankommen.
   ===================================================================== */

/* Abschlussklasse: V10 (vierstufig) und Z11 (zweistufig) haben denselben Stoff.
   Beide Klassen verweisen deshalb auf diese gemeinsame Liste. */
const ABSCHLUSS = [
  {
    id: "lin",
    titel: "Lineare Funktionen",
    beschreibung: "Grundlagen, Graphen und Übungsaufgaben zu y = m·x + t",
    typ: "Präsentation",
    link: "lineare_funktionen.html#1",
    themen: [
      { id: "lin-grund",    titel: "Was ist eine lineare Funktion? Was bewirken m und t?", link: "lineare_funktionen.html#2",  art: "Erklärung", kann: "Ich kann erklären, was m und t in y = m·x + t bewirken." },
      { id: "lin-steigung", titel: "Die Steigung m – das Steigungsdreieck",                link: "lineare_funktionen.html#4",  art: "Erklärung", kann: "Ich kann die Steigung m mit dem Steigungsdreieck bestimmen." },
      { id: "lin-graph",    titel: "Graph zeichnen in 3 Schritten · typische Fälle",         link: "lineare_funktionen.html#5",  art: "Erklärung", kann: "Ich kann den Graphen einer linearen Funktion zeichnen." },
      { id: "lin-null",     titel: "Nullstelle und Punktprobe",                             link: "lineare_funktionen.html#7",  art: "Erklärung", kann: "Ich kann die Nullstelle berechnen und eine Punktprobe machen." },
      { id: "lin-zweip",    titel: "Funktionsgleichung aus zwei Punkten",                   link: "lineare_funktionen.html#8",  art: "Erklärung", kann: "Ich kann die Gleichung einer Geraden durch zwei Punkte aufstellen." },
      { id: "lin-schnitt",  titel: "Lage zweier Geraden & Schnittpunkt",                    link: "lineare_funktionen.html#9",  art: "Erklärung", kann: "Ich kann die Lage zweier Geraden bestimmen und ihren Schnittpunkt berechnen." },
      { id: "lin-alltag",   titel: "Lineare Funktionen im Alltag",                          link: "lineare_funktionen.html#10", art: "Erklärung", kann: "Ich kann lineare Funktionen im Alltag erkennen und nutzen." },
      { id: "lin-ueben",    titel: "Übungen: m, t, Steigung, Nullstellen, Schnittpunkt",    link: "lineare_funktionen.html#11", art: "Übungen", kann: "Ich kann gemischte Aufgaben zu linearen Funktionen lösen." },
      { id: "lin-sach",     titel: "Sachaufgaben: Kfz-Werkstatt & Tankinhalt",              link: "lineare_funktionen.html#18", art: "Sachaufgaben" , ap: true, kann: "Ich kann Sachaufgaben mit linearen Funktionen lösen." },
      { id: "lin-kurz",     titel: "Das Wichtigste auf einen Blick",                        link: "lineare_funktionen.html#20", art: "Zusammenfassung", kann: "Ich kenne das Wichtigste zu linearen Funktionen auf einen Blick." }
    ]
  },
  {
    id: "quad",
    titel: "Quadratische Funktionen",
    beschreibung: "Erklärung, Beispiel, interaktives Schaubild und Übungen mit Prüfen-Knopf",
    typ: "Lern-App",
    link: "quadratische_funktionen.html#start",
    themen: [
      { id: "quad-grund", titel: "Parabel-Grundlagen: Scheitelform, allgemeine Form, Öffnungsfaktor a, Umrechnen", link: "quadratische_funktionen.html#s1", art: "Kapitel 1", kann: "Ich kann eine Parabel von der Scheitelform in die allgemeine Form umrechnen (und umgekehrt)." },
      { id: "quad-gl",    titel: "Quadratische Gleichungen: Lösungsformel, Diskriminante, Nullstellen",           link: "quadratische_funktionen.html#s2", art: "Kapitel 2", kann: "Ich kann quadratische Gleichungen mit der Lösungsformel lösen und die Diskriminante deuten." },
      { id: "quad-auf",   titel: "Funktionsgleichung aufstellen: Parabel aus Punkten, Gleichsetzungsverfahren",   link: "quadratische_funktionen.html#s3", art: "Kapitel 3", kann: "Ich kann die Gleichung einer Parabel aus Punkten aufstellen." },
      { id: "quad-gp",    titel: "Gerade & Parabel: Sekante, Tangente, Passante – Schnittpunkte",                 link: "quadratische_funktionen.html#s4", art: "Kapitel 4", kann: "Ich kann die Schnittpunkte von Gerade und Parabel berechnen und Sekante, Tangente, Passante unterscheiden." }
    ]
  },
  {
    id: "pruef",
    titel: "Prüfungsaufgaben Funktionen",
    beschreibung: "Sachaufgaben und echte Abschlussprüfungen mit gestuften Tipps",
    typ: "Training",
    link: "funktionaler-zusammenhang.html",
    themen: [
      { id: "pruef-strat",   titel: "Was ist zu tun? Anwendungsaufgaben richtig anpacken", link: "funktionaler-zusammenhang.html#strategie",  art: "Strategie" , ap: true, kann: "Ich weiß, wie ich eine Anwendungsaufgabe anpacke." },
      { id: "pruef-funk",    titel: "Prüfungsaufgaben zu Parabeln und Geraden", link: "quadratische_funktionen.html#s5",           art: "Prüfung" , ap: true, kann: "Ich kann Prüfungsaufgaben zu Parabeln und Geraden lösen." },
      { id: "pruef-ap2025",  titel: "AP 2025: Torbogen mit Skywalk",            link: "funktionaler-zusammenhang.html#ap2025-torbogen", art: "Abschlussprüfung" , ap: true, kann: "Ich habe die AP 2025 (Torbogen mit Skywalk) gerechnet." },
      { id: "pruef-ap2024",  titel: "AP 2024: Minigolf mit Fangnetz",           link: "funktionaler-zusammenhang.html#ap2024-minigolf", art: "Abschlussprüfung" , ap: true, kann: "Ich habe die AP 2024 (Minigolf mit Fangnetz) gerechnet." }
    ]
  },
  {
    id: "ruf",
    titel: "Raum und Form",
    beschreibung: "Zylinder, quadratische Pyramide und Kreiskegel – Netz, Oberfläche und Volumen",
    typ: "Lern-App",
    link: "raum_und_form.html#start",
    themen: [
      { id: "ruf-zyl",   titel: "Zylinder: Netz, Mantel, Oberfläche und Volumen",                      link: "raum_und_form.html#s1", art: "Kapitel 1", kann: "Ich kann Oberfläche und Volumen eines Zylinders berechnen." },
      { id: "ruf-pyr",   titel: "Quadratische Pyramide: Seitenhöhe, Seitenkante, Oberfläche, Volumen", link: "raum_und_form.html#s2", art: "Kapitel 2", kann: "Ich kann Seitenhöhe, Oberfläche und Volumen einer quadratischen Pyramide berechnen." },
      { id: "ruf-kegel", titel: "Kreiskegel: Mantellinie, Netz, Oberfläche und Volumen",               link: "raum_und_form.html#s3", art: "Kapitel 3", kann: "Ich kann Mantellinie, Oberfläche und Volumen eines Kegels berechnen." },
      { id: "ruf-ueber", titel: "Überblick: alle Formeln, Einheiten umrechnen, gemischtes Training",   link: "raum_und_form.html#s4", art: "Kapitel 4", kann: "Ich kann Einheiten umrechnen und die richtige Körperformel auswählen." },
      { id: "ruf-pruef", titel: "Prüfungsaufgaben: Getränkedose, Pavillondach, Salzlager, Silo",       link: "raum_und_form.html#s5", art: "Prüfung" , ap: true, kann: "Ich kann Prüfungsaufgaben zu Raum und Form lösen." }
    ]
  },
  {
    id: "dz",
    titel: "Daten und Zufall",
    beschreibung: "Statistik und Wahrscheinlichkeit – auf der Kirchweih in Gunzenhausen",
    typ: "Lern-App",
    link: "daten-und-zufall.html#start",
    themen: [
      { id: "dz-stat",   titel: "Statistik: Urliste, Rangliste, Häufigkeiten, Diagramme, Kennzahlen", link: "daten-und-zufall.html#k1", art: "Kapitel 1", kann: "Ich kann Häufigkeiten, Diagramme und Kennzahlen (Mittelwert, Median, Spannweite) bestimmen." },
      { id: "dz-omega",  titel: "Zufallsexperiment und Ergebnisraum Ω",                              link: "daten-und-zufall.html#k2", art: "Kapitel 2", kann: "Ich kann den Ergebnisraum Ω eines Zufallsexperiments angeben." },
      { id: "dz-wahr",   titel: "Wahrscheinlichkeit: Laplace, Simulation, statistisch, subjektiv",     link: "daten-und-zufall.html#k3", art: "Kapitel 3", kann: "Ich kann Wahrscheinlichkeiten nach Laplace berechnen." },
      { id: "dz-ereig",  titel: "Ereignisse und Gegenereignis",                                      link: "daten-und-zufall.html#k4", art: "Kapitel 4", kann: "Ich kann Ereignisse und Gegenereignisse beschreiben und berechnen." },
      { id: "dz-baum",   titel: "Baumdiagramm und Pfadregeln",                                       link: "daten-und-zufall.html#k5", art: "Kapitel 5", kann: "Ich kann ein Baumdiagramm zeichnen und die Pfadregeln anwenden." },
      { id: "dz-urne",   titel: "Mit und ohne Zurücklegen",                                          link: "daten-und-zufall.html#k6", art: "Kapitel 6", kann: "Ich kann Aufgaben mit und ohne Zurücklegen lösen." },
      { id: "dz-train",  titel: "Training und Übersicht",                                            link: "daten-und-zufall.html#training", art: "Training" , ap: true, kann: "Ich kann gemischte Aufgaben zu Daten und Zufall lösen." },
      { id: "dz-ap2025", titel: "AP 2025: Socken, Bildschirmzeit und Darts-WM (Teil A + B)",          link: "daten-und-zufall-pruefung.html#ap2025-dz", art: "Abschlussprüfung" , ap: true, kann: "Ich habe die AP 2025 Daten und Zufall gerechnet." },
      { id: "dz-ap2024", titel: "AP 2024: Freibad und Hochzeiten (Teil A + B)",                        link: "daten-und-zufall-pruefung.html#ap2024-dz", art: "Abschlussprüfung" , ap: true, kann: "Ich habe die AP 2024 Daten und Zufall gerechnet." }
    ]
  }
];

const KLASSEN = {
  "6":  { titel: "Jahrgangsstufe 6", zweig: "vierstufig", lernbereiche: [] },
  "7": {
    titel: "Jahrgangsstufe 7",
    zweig: "vierstufig",
    untertitel: "Grundlagen aus Klasse 6: Bruchrechnung · Prozentrechnung · Dreisatz",
    lernbereiche: [
      {
        id: "v7-grund",
        titel: "Grundlagen: Bruchrechnung, Prozentrechnung, Dreisatz",
        beschreibung: "Webquest zum Wiederholen der Grundlagen aus Klasse 6",
        typ: "Webquest",
        link: "https://claude.ai/artifact/7UWZ8UDbrcj3Yp9qAE6S2w",
        themen: [
          { id: "v7-grund-wq", titel: "Webquest: Bruchrechnung, Prozentrechnung und Dreisatz", link: "https://claude.ai/artifact/7UWZ8UDbrcj3Yp9qAE6S2w", art: "Webquest", kann: "Ich kann Brüche, Prozente und Dreisatz sicher rechnen." }
        ]
      }
    ]
  },
  "8":  { titel: "Jahrgangsstufe 8", zweig: "vierstufig", lernbereiche: [] },
  "9": {
    titel: "Jahrgangsstufe 9",
    zweig: "vierstufig",
    untertitel: "Pythagoras und Trigonometrie · Strahlensatz",
    lernbereiche: [
      {
        id: "v9-pyth",
        titel: "Pythagoras und Trigonometrie",
        beschreibung: "Webquest zum Satz des Pythagoras und zu Sinus, Kosinus, Tangens",
        typ: "Webquest",
        link: "https://claude.ai/artifact/BQeyVsM5FXQ4URpBMmAFui",
        themen: [
          { id: "v9-pyth-wq",  titel: "Webquest: Pythagoras und Trigonometrie", link: "https://claude.ai/artifact/BQeyVsM5FXQ4URpBMmAFui",          art: "Webquest", kann: "Ich kann den Satz des Pythagoras und sin, cos, tan im rechtwinkligen Dreieck anwenden." },
          { id: "v9-pyth-auf", titel: "Aufgaben zu Pythagoras und Trigonometrie", link: "https://claude.ai/artifact/BQeyVsM5FXQ4URpBMmAFui#aufgaben", art: "Aufgaben", kann: "Ich kann Aufgaben zu Pythagoras und Trigonometrie lösen." }
        ]
      },
      {
        id: "v9-strahl",
        titel: "Strahlensatz",
        beschreibung: "Webquest zu den Strahlensätzen",
        typ: "Webquest",
        link: "https://claude.ai/artifact/XKCKkFAqRRchbHZRNRdq15",
        themen: [
          { id: "v9-strahl-wq", titel: "Webquest: Strahlensatz", link: "https://claude.ai/artifact/XKCKkFAqRRchbHZRNRdq15", art: "Webquest", kann: "Ich kann Längen mit den Strahlensätzen berechnen." }
        ]
      }
    ]
  },

  "V10": {
    titel: "V10 · Abschlussklasse vierstufig",
    zweig: "vierstufig",
    pruefung: true,
    untertitel: "Funktionen · Raum und Form · Daten und Zufall · Vorbereitung auf die Abschlussprüfung",
    lernbereiche: ABSCHLUSS
  },

  "Z10": { titel: "Z10 · Zweistufige Wirtschaftsschule", zweig: "zweistufig", lernbereiche: [] },

  "Z11": {
    titel: "Z11 · Abschlussklasse zweistufig",
    zweig: "zweistufig",
    pruefung: true,
    untertitel: "Gleicher Stoff wie V10: Funktionen · Raum und Form · Daten und Zufall · Vorbereitung auf die Abschlussprüfung",
    lernbereiche: ABSCHLUSS
  }
};

/* ---------------------------------------------------------------------
   LERNPAKETE – individuell für eine Schulaufgabe, Klasse oder Schüler.
   Aufruf: lernpaket.html?id=<schlüssel>, z. B. lernpaket.html?id=v10-sa1
   Die Schüler sehen EINE Liste: pro Thema den „Ich kann …“-Satz (kann) mit Link zum Üben.
   checkliste: [...] nur für zusätzliche Punkte, die zu keinem Thema gehören.
   Für einzelne Schüler einen Code statt des Namens verwenden (Datenschutz).
   --------------------------------------------------------------------- */
const PAKETE = {
  "v10-sa1": {
    titel: "V10 · Schulaufgabe: Funktionen",
    klasse: "V10",
    datum: "2026-11-24",          // Format JJJJ-MM-TT, leer lassen wenn noch offen
    hinweis: "Taschenrechner und Merkhilfe sind erlaubt. Arbeite die Themen von oben nach unten durch.",
    themen: ["lin-steigung", "lin-zweip", "lin-schnitt", "quad-grund", "quad-gl", "quad-gp", "pruef-funk", "pruef-ap2024"],
  }
};

/* ---------------------------------------------------------------------
   ABSCHLUSSPRÜFUNG – Aufbau wie die echte AP (Stand: AP 2025), nur für V10 und Z11
   Teil A: ohne Taschenrechner, Pflichtblock + 2 von 3 Wahlblöcken.
   Teil B: mit Taschenrechner, Aufgaben zu je 15 Punkten.
   Bei „themen“ die ids aus KLASSEN eintragen, die zur Aufgabe passen.
   --------------------------------------------------------------------- */
const PRUEFUNG = {
  teilA: {
    titel: "Teil A – ohne Taschenrechner",
    zeit: "25 Minuten (+ 5 Minuten Einlesezeit)",
    punkte: 15,
    hilfsmittel: "Merkhilfe",
    hinweis: "Den Pflichtblock bearbeiten alle. Von den drei Wahlblöcken wählst du zwei aus.",
    bloecke: [
      { id: "pflicht", titel: "Pflichtblock",                   punkte: 7, inhalt: "Prozent und Sachrechnen, Pythagoras, Parabeln, Tilgungsplan" },
      { id: "w1",      titel: "Wahlblock 1 – Trigonometrie",    punkte: 4, inhalt: "sin, cos, tan im rechtwinkligen Dreieck" },
      { id: "w2",      titel: "Wahlblock 2 – Daten und Zufall", punkte: 4, inhalt: "Baumdiagramm, Mittelwert, Diagramme" },
      { id: "w3",      titel: "Wahlblock 3 – Raum und Form",    punkte: 4, inhalt: "Strahlensatz, Kugel, Körper mit π = 3" }
    ]
  },
  teilB: {
    titel: "Teil B – mit Taschenrechner",
    zeit: "125 Minuten",
    punkte: 60,
    hilfsmittel: "Taschenrechner und Merkhilfe",
    hinweis: "60 Punkte = 4 Aufgaben zu je 15 Punkten. Welche Aufgaben du bearbeitest, sagt dir deine Lehrkraft.",
    aufgaben: [
      { nr: 1, titel: "Finanzmathematik",          inhalt: "Zinseszins, Tilgungsplan, Annuität, Rente",         themen: [] },
      { nr: 2, titel: "Funktionaler Zusammenhang", inhalt: "Parabeln und Geraden in Sachaufgaben",              themen: ["pruef-strat", "pruef-ap2025", "pruef-ap2024", "pruef-funk", "lin-sach"] },
      { nr: 3, titel: "Trigonometrie",             inhalt: "Längen und Winkel in Dreiecken, Steigung in %",     themen: [] },
      { nr: 4, titel: "Daten und Zufall",          inhalt: "Häufigkeiten, Kennzahlen, Diagramme, Baumdiagramm", themen: ["dz-ap2025", "dz-ap2024", "dz-train"] },
      { nr: 5, titel: "Raum und Form",             inhalt: "Pyramide, Kegel, Zylinder, Kugel – Volumen und Oberfläche", themen: ["ruf-pruef"] }
    ]
  }
};
