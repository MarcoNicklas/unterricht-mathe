/* =====================================================================
   INHALTE DER LERNSEITE
   Hier pflegst du alles: Klassen, Lernbereiche, Themen und Lernpakete.
   Die Seiten (Startseite, Klassenseite, Lernpaket) bauen sich daraus auf.

   - Jedes Thema braucht eine eindeutige id (z. B. "lin-steigung").
   - link: Pfad zur Lernseite, relativ zum Hauptordner.
   - kann: „Ich kann …“-Satz, der im Lernpaket als Lernziel angezeigt wird.
   - ap: true markiert Themen für die Seite „Abschlussprüfung“.
   - Ein Lernpaket listet nur die ids der Themen, die drankommen.
   ===================================================================== */

const KLASSEN = {
  "6":  { titel: "Jahrgangsstufe 6",  lernbereiche: [] },
  "7":  { titel: "Jahrgangsstufe 7",  lernbereiche: [] },
  "8":  { titel: "Jahrgangsstufe 8",  lernbereiche: [] },
  "9":  { titel: "Jahrgangsstufe 9",  lernbereiche: [] },

  "10": {
    titel: "Jahrgangsstufe 10",
    untertitel: "Funktionen · Raum und Form · Daten und Zufall · Vorbereitung auf die Abschlussprüfung",
    lernbereiche: [
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
          { id: "dz-train",  titel: "Training und Übersicht",                                            link: "daten-und-zufall.html#training", art: "Training" , ap: true, kann: "Ich kann gemischte Aufgaben zu Daten und Zufall lösen." }
        ]
      }
    ]
  },

  "11": { titel: "Jahrgangsstufe 11", lernbereiche: [] }
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
    klasse: "10",
    datum: "2026-11-24",          // Format JJJJ-MM-TT, leer lassen wenn noch offen
    hinweis: "Taschenrechner und Merkhilfe sind erlaubt. Arbeite die Themen von oben nach unten durch.",
    themen: ["lin-steigung", "lin-zweip", "lin-schnitt", "quad-grund", "quad-gl", "quad-gp", "pruef-funk", "pruef-ap2024"],
  }
};

/* ---------------------------------------------------------------------
   ABSCHLUSSPRÜFUNG – Aufbau wie die echte AP (Stand: AP 2025)
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
      { nr: 4, titel: "Daten und Zufall",          inhalt: "Häufigkeiten, Kennzahlen, Diagramme, Baumdiagramm", themen: ["dz-train"] },
      { nr: 5, titel: "Raum und Form",             inhalt: "Pyramide, Kegel, Zylinder, Kugel – Volumen und Oberfläche", themen: ["ruf-pruef"] }
    ]
  }
};
