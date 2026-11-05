/* =====================================================================
   PRÜFUNG TEIL A ÜBEN – ohne Taschenrechner
   Aufbau wie die Abschlussprüfung: Pflichtblock (7 P.) + 2 von 3
   Wahlblöcken (je 4 P.) = 15 Punkte, 25 Minuten.
   Eigene Übungsaufgaben im Stil der AP – Zahlen frei erfunden.

   Aufgabe: { nr, punkte, text, frage, typ: "zahl"|"bruch"|"wahl",
              loesung, einheit?, optionen?, tipp, weg }
   ===================================================================== */

const BLOECKE = [
  {
    id: "pflicht", titel: "Pflichtblock", punkte: 7, pflicht: true,
    aufgaben: [
      { nr: "1a", punkte: 1,
        text: `Lea feiert ihren 12. Geburtstag im Tierpark. Mit dabei sind ihre Eltern, ihr 8-jähriger Bruder und ihre 3-jährige Schwester.
          Geburtstagskinder bekommen 50 % Rabatt auf ihre Karte.
          <table class="ap-tab"><tr><td>Familienkarte (2 Erwachsene + eigene Kinder bis 17)</td><td>32,00 €</td></tr>
          <tr><td>Erwachsene</td><td>12,00 €</td></tr><tr><td>Kinder (4 – 17 Jahre)</td><td>7,00 €</td></tr><tr><td>Kinder unter 4 Jahren</td><td>frei</td></tr></table>`,
        frage: "Wie viel kosten Einzelkarten für die ganze Familie zusammen?",
        typ: "zahl", loesung: 34.5, einheit: "€",
        tipp: "Zwei Erwachsene, Lea mit 50 % Rabatt, der Bruder zum Kinderpreis – und die Schwester?",
        weg: "2 · 12,00 € + 3,50 € (Lea) + 7,00 € (Bruder) + 0 € (Schwester) = 34,50 €" },
      { nr: "1b", punkte: 1,
        frage: "Ist die Familienkarte für den Ausflug die günstigste Möglichkeit?",
        typ: "wahl", optionen: ["Ja, sie ist 2,50 € günstiger.", "Nein, Einzelkarten sind 2,50 € günstiger.", "Beide kosten gleich viel."], loesung: "Ja, sie ist 2,50 € günstiger.",
        tipp: "Vergleiche 32,00 € mit deinem Ergebnis aus 1a.",
        weg: "34,50 € − 32,00 € = 2,50 € → Die Familienkarte ist günstiger." },
      { nr: "2a", punkte: 1,
        text: "Tom soll mit einer 12 m langen Schnur, die alle 1 m einen Knoten hat, einen rechten Winkel für ein Beet abstecken.",
        frage: "Welche Seitenlängen muss sein Dreieck haben?",
        typ: "wahl", optionen: ["3 m, 4 m und 5 m", "4 m, 4 m und 4 m", "2 m, 5 m und 5 m"], loesung: "3 m, 4 m und 5 m",
        tipp: "Ein Dreieck ist rechtwinklig, wenn a² + b² = c² gilt (Satz des Pythagoras).",
        weg: "3 + 4 + 5 = 12 m und 3² + 4² = 9 + 16 = 25 = 5² → rechter Winkel zwischen den Seiten 3 m und 4 m." },
      { nr: "2b", punkte: 1,
        frage: "Begründe mit Pythagoras: 3² + 4² =",
        typ: "zahl", loesung: 25,
        tipp: "3² = 9 und 4² = 16.",
        weg: "9 + 16 = 25 = 5²" },
      { nr: "3a", punkte: 1,
        text: "Eine Wurfparabel hat den Scheitelpunkt S (4 | 3) und die Formvariable a = −0,5.",
        frage: "Welche Gleichung ist die richtige Scheitelpunktform?",
        typ: "wahl", optionen: ["y = −0,5 (x − 4)² + 3", "y = −0,5 (x + 4)² + 3", "y = −0,5 (x − 3)² + 4"], loesung: "y = −0,5 (x − 4)² + 3",
        tipp: "Scheitelpunktform: y = a (x − x<sub>S</sub>)² + y<sub>S</sub>. Achtung beim Vorzeichen in der Klammer!",
        weg: "x<sub>S</sub> = 4 → (x − 4)², y<sub>S</sub> = 3 → + 3" },
      { nr: "3b", punkte: 1,
        frage: "Welche Parabel ist nach unten geöffnet und schneidet die y-Achse bei 1?",
        typ: "wahl", optionen: ["y = −0,5x² + 2x + 1", "y = 0,5x² + 2x + 1", "y = −0,5x² + 2x − 1"], loesung: "y = −0,5x² + 2x + 1",
        tipp: "a < 0 heißt: nach unten geöffnet. Der y-Achsenabschnitt ist die Zahl ohne x.",
        weg: "a = −0,5 < 0 (nach unten) und c = +1 (Schnittpunkt mit der y-Achse bei 1)" },
      { nr: "4", punkte: 1,
        text: `Familie Berg nimmt einen Kredit über 12.000,00 € zu 5 % p.a. auf. Er wird in 4 Jahren mit Ratentilgung zurückgezahlt. Im Tilgungsplan steckt ein Fehler:
          <table class="ap-tab zahlen"><tr><th>Jahr</th><th>Restschuld</th><th>Zinsen</th><th>Tilgung</th><th>Annuität</th></tr>
          <tr><td>1</td><td>12.000,00 €</td><td>600,00 €</td><td>3.000,00 €</td><td>3.600,00 €</td></tr>
          <tr><td>2</td><td>9.600,00 €</td><td>450,00 €</td><td>3.000,00 €</td><td>3.450,00 €</td></tr></table>`,
        frage: "Ein Wert in Jahr 2 ist falsch. Wie lautet der richtige Wert?",
        typ: "zahl", loesung: 9000, einheit: "€",
        tipp: "Bei Ratentilgung ist die Tilgung jedes Jahr gleich. Restschuld Jahr 2 = Restschuld Jahr 1 − Tilgung.",
        weg: "12.000 € − 3.000 € = 9.000 € (nicht 9.600 €). Kontrolle: 5 % von 9.000 € = 450 € ✓" }
    ]
  },
  {
    id: "w1", titel: "Wahlblock 1 – Trigonometrie", punkte: 4,
    aufgaben: [
      { nr: "1.1", punkte: 1,
        text: "Eine Rampe ist 10 m lang (schräge Seite) und überwindet einen Höhenunterschied von 1 m.",
        frage: "Mit welchem Ansatz berechnest du den Neigungswinkel α?",
        typ: "wahl", optionen: ["α = sin⁻¹ (1 / 10)", "α = cos⁻¹ (1 / 10)", "α = tan⁻¹ (10 / 1)"], loesung: "α = sin⁻¹ (1 / 10)",
        tipp: "Die Höhe liegt gegenüber von α, die Rampe ist die Hypotenuse. Welche Funktion verbindet Gegenkathete und Hypotenuse?",
        weg: "sin α = Gegenkathete / Hypotenuse = 1 / 10 → α = sin⁻¹ (1 / 10)" },
      { nr: "1.2", punkte: 2,
        text: `Eine 6 m lange Leiter lehnt an einer Wand und bildet mit dem Boden einen Winkel von 60°.
          <table class="ap-tab zahlen"><tr><th>Winkel</th><th>30°</th><th>45°</th><th>60°</th></tr>
          <tr><td>sin ≈</td><td>0,5</td><td>0,7</td><td>0,9</td></tr><tr><td>cos ≈</td><td>0,9</td><td>0,7</td><td>0,5</td></tr></table>`,
        frage: "Wie hoch reicht die Leiter an der Wand?",
        typ: "zahl", loesung: 5.4, einheit: "m",
        tipp: "Die gesuchte Höhe liegt dem 60°-Winkel gegenüber. Nutze sin 60° ≈ 0,9 aus der Tabelle.",
        weg: "h = 6 m · sin 60° ≈ 6 m · 0,9 = 5,4 m" },
      { nr: "1.3", punkte: 1,
        frage: "Welches rechtwinklige Dreieck passt zu tan α = 3/5?",
        typ: "wahl", optionen: ["Gegenkathete 3, Ankathete 5", "Gegenkathete 3, Hypotenuse 5", "Ankathete 3, Gegenkathete 5"], loesung: "Gegenkathete 3, Ankathete 5",
        tipp: "tan α = Gegenkathete / Ankathete",
        weg: "tan α = Gegenkathete / Ankathete = 3 / 5" }
    ]
  },
  {
    id: "w2", titel: "Wahlblock 2 – Daten und Zufall", punkte: 4,
    aufgaben: [
      { nr: "2.1", punkte: 2,
        text: "In einer Box liegen 12 Filzstifte, 3 davon sind leer. Mia nimmt nacheinander zwei Stifte heraus, ohne zurückzulegen.",
        frage: "Wie groß ist die Wahrscheinlichkeit, dass beide Stifte leer sind? (gekürzter Bruch)",
        typ: "bruch", loesung: [1, 22],
        tipp: "Erster Zug: 3 von 12. Zweiter Zug: Es sind nur noch 11 Stifte da, davon 2 leer. Pfadregel: multiplizieren.",
        weg: "3/12 · 2/11 = 6/132 = 1/22" },
      { nr: "2.2", punkte: 2,
        text: "Bildschirmzeit pro Tag: Klasse 7: 120 min, Klasse 8: 150 min, Klasse 9: 180 min, Klasse 10: ? – Der Durchschnitt aller vier Klassen beträgt 160 min.",
        frage: "Wie lange ist die Bildschirmzeit der Klasse 10?",
        typ: "zahl", loesung: 190, einheit: "min",
        tipp: "Durchschnitt · Anzahl = Summe aller Werte. Rechne 4 · 160 und ziehe die bekannten Werte ab.",
        weg: "4 · 160 = 640; 640 − 120 − 150 − 180 = 190 min" }
    ]
  },
  {
    id: "w3", titel: "Wahlblock 3 – Raum und Form", punkte: 4,
    aufgaben: [
      { nr: "3.1", punkte: 2,
        text: "Eine 1,60 m große Person steht 6 m von einer Straßenlaterne entfernt. Ihr Schatten ist 2 m lang und endet im gleichen Punkt wie der Schatten der Laterne.",
        frage: "Wie hoch ist die Laterne?",
        typ: "zahl", loesung: 6.4, einheit: "m",
        tipp: "Strahlensatz: Höhe Laterne / ganzer Schatten (6 m + 2 m) = Größe Person / Schatten Person.",
        weg: "x / 8 m = 1,60 m / 2 m → x = 8 · 0,8 m = 6,4 m" },
      { nr: "3.2", punkte: 2,
        text: "Eine Dekokugel hat ein Volumen von 864 cm³. Rechne mit π = 3.",
        frage: "Wie groß ist der Radius der Kugel?",
        typ: "zahl", loesung: 6, einheit: "cm",
        tipp: "V = 4/3 · π · r³. Mit π = 3 wird daraus V = 4 · r³.",
        weg: "864 = 4 · r³ → r³ = 216 → r = 6 cm (denn 6 · 6 · 6 = 216)" }
    ]
  }
];

// ---------- Hilfen ----------
const $ = s => document.querySelector(s);
const ggT = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
function leseZahl(s) {
  s = String(s).trim().replace(/\s/g, "").replace(/[−–]/g, "-").replace(/€|[a-zA-Z²³]+$/g, "");
  if (!s) return null;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const x = Number(s);
  return Number.isFinite(x) ? x : null;
}
const id = (b, a) => `${b.id}-${a.nr}`.replace(/\./g, "_");

// ---------- Zustand ----------
let gewaehlt = ["w1", "w2"];
const punkteErreicht = {};   // id → Punkte
const geloest = new Set();   // ids, die erledigt sind (richtig oder Lösung angesehen)
let uhr = null, ende = 0;

function eingabe(a, i) {
  if (a.typ === "wahl") return `<div class="optionen">${a.optionen.map(o =>
    `<label><input type="radio" name="${i}" value="${o}"><span>${o}</span></label>`).join("")}</div>`;
  const pm = `<button type="button" class="pm" data-pm="${i}" aria-label="Vorzeichen wechseln">±</button>`;
  if (a.typ === "bruch") return `<div class="antwort">${pm}<span class="br-ein">
    <input id="${i}z" inputmode="numeric" autocomplete="off" aria-label="Zähler">
    <input id="${i}n" inputmode="numeric" autocomplete="off" aria-label="Nenner"></span></div>`;
  return `<div class="antwort">${pm}<input id="${i}" inputmode="decimal" autocomplete="off" aria-label="Ergebnis">
    ${a.einheit ? `<span class="einheit">${a.einheit}</span>` : ""}</div>`;
}

function zeichne() {
  const wahl = BLOECKE.filter(b => !b.pflicht);
  $("#teil-a").innerHTML = `
    <div class="rt-leiste"><span>Teil A</span><span id="uhr">25:00</span><span id="pkt">0 / 15 P.</span></div>
    <div class="card"><b>Wähle 2 Wahlblöcke</b> <small class="note">– wie in der Prüfung</small>
      <div class="chips">${wahl.map(b => `<label class="chip"><input type="checkbox" value="${b.id}" ${gewaehlt.includes(b.id) ? "checked" : ""}>
        <span>${b.titel.replace("Wahlblock ", "WB ")}</span></label>`).join("")}</div>
      <button class="btn voll" id="start">⏱ 25-Minuten-Uhr starten</button></div>
    ${BLOECKE.map(b => `<section class="ap-block${b.pflicht || gewaehlt.includes(b.id) ? "" : " aus"}" id="${b.id}">
      <h2 class="ap-h2">${b.titel} <span class="pkt">${b.punkte} P.</span></h2>
      <ol class="aufgaben">${b.aufgaben.map(a => { const i = id(b, a); return `<li class="aufgabe" id="k-${i}">
        <div class="nr">${a.nr}</div><div class="inh">
        ${a.text ? `<div class="kontext">${a.text}</div>` : ""}
        <div class="frage text"><b>${a.frage}</b> <span class="pkt">${a.punkte} P.</span></div>
        ${eingabe(a, i)}
        <div class="knoepfe"><button class="btn" data-pruefen="${i}">Prüfen</button>
          <button class="btn ghost" data-tipp="${i}">Tipp</button><button class="btn ghost" data-loesung="${i}">Lösung</button></div>
        <div class="rueck" id="r-${i}"></div></div></li>`; }).join("")}</ol></section>`).join("")}
    <div class="card punkte" id="ergebnis" hidden></div>`;
}

const finde = i => { for (const b of BLOECKE) for (const a of b.aufgaben) if (id(b, a) === i) return [b, a]; };

function pruefe(a, i) {
  if (a.typ === "wahl") {
    const w = document.querySelector(`input[name="${i}"]:checked`);
    return w ? (w.value === a.loesung ? "ok" : "falsch") : "leer";
  }
  if (a.typ === "bruch") {
    const z = leseZahl($(`#${i}z`).value), n = leseZahl($(`#${i}n`).value) ?? 1;
    if (z === null) return "leer";
    if (!n || z * a.loesung[1] !== a.loesung[0] * n) return "falsch";
    return ggT(z, n) === 1 ? "ok" : "kuerzen";
  }
  const x = leseZahl($(`#${i}`).value);
  if (x === null) return "leer";
  return Math.abs(x - a.loesung) < 1e-9 ? "ok" : "falsch";
}

function zaehle() {
  const bloecke = BLOECKE.filter(b => b.pflicht || gewaehlt.includes(b.id));
  const max = bloecke.reduce((s, b) => s + b.punkte, 0);
  const p = bloecke.reduce((s, b) => s + b.aufgaben.reduce((t, a) => t + (punkteErreicht[id(b, a)] || 0), 0), 0);
  $("#pkt").textContent = `${p} / ${max} P.`;
  const alle = bloecke.flatMap(b => b.aufgaben.map(a => id(b, a)));
  const erg = $("#ergebnis");
  if (alle.every(i => geloest.has(i))) {
    clearInterval(uhr);
    erg.hidden = false;
    erg.innerHTML = `<div class="zahl">${p} / ${max}</div><div>Punkte in Teil A</div>
      <div class="note">${p >= 12 ? "Stark – so kann die Prüfung kommen! 💪" : p >= 8 ? "Gut! Schau dir die Lösungen der falschen Aufgaben genau an." : "Wiederhole die Themen und versuch es nochmal. 🙂"}</div>
      <button class="btn voll" onclick="location.reload()">Nochmal üben</button>`;
  }
}

document.addEventListener("click", e => {
  const t = e.target;
  if (t.id === "start") {
    ende = Date.now() + 25 * 60 * 1000;
    clearInterval(uhr);
    uhr = setInterval(() => {
      const s = Math.max(0, Math.round((ende - Date.now()) / 1000));
      $("#uhr").textContent = s ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : "Zeit um!";
      if (!s) clearInterval(uhr);
    }, 1000);
    t.textContent = "Uhr läuft – viel Erfolg!";
    t.disabled = true;
    return;
  }
  const pm = t.closest("[data-pm]");
  if (pm) {
    const el = $(`#${pm.dataset.pm}`) || $(`#${pm.dataset.pm}z`);
    el.value = /^[-−]/.test(el.value) ? el.value.replace(/^[-−]\s*/, "") : "−" + el.value;
    el.focus();
    return;
  }
  const i = t.dataset.pruefen || t.dataset.tipp || t.dataset.loesung;
  if (!i) return;
  const [, a] = finde(i);
  const r = $(`#r-${i}`), karte = $(`#k-${i}`);
  if (t.dataset.tipp) { r.innerHTML = `💡 ${a.tipp}`; karte.classList.remove("fehler"); return; }
  if (t.dataset.loesung) {
    r.innerHTML = `<b>Lösung:</b> ${a.weg}`;
    karte.classList.add("geloest");
  } else {
    const erg = pruefe(a, i);
    if (erg === "leer") { r.textContent = "Trage zuerst ein Ergebnis ein."; return; }
    if (erg === "ok") {
      if (!geloest.has(i)) punkteErreicht[i] = a.punkte;
      r.innerHTML = `✓ Richtig! <span class="note">${a.weg}</span>`;
      karte.className = "aufgabe richtig";
    } else {
      r.textContent = erg === "kuerzen" ? "Fast! Kürze den Bruch noch vollständig." : "✗ Noch nicht richtig. Hol dir einen Tipp oder versuch es nochmal.";
      karte.className = "aufgabe fehler";
      return;
    }
  }
  geloest.add(i);
  karte.querySelectorAll("input, .pm, [data-pruefen]").forEach(x => x.disabled = true);
  zaehle();
});

// Wahlblöcke: genau 2 wählbar
document.addEventListener("change", e => {
  if (!e.target.closest(".chips")) return;
  const boxen = [...document.querySelectorAll(".chips input")];
  const an = boxen.filter(b => b.checked).map(b => b.value);
  if (an.length > 2) { e.target.checked = false; return; }
  gewaehlt = an;
  BLOECKE.forEach(b => { if (!b.pflicht) $(`#${b.id}`).classList.toggle("aus", !gewaehlt.includes(b.id)); });
  zaehle();
});

// Start: Sprung zu einem Block (#w2 usw.) wählt diesen Block mit aus
const ziel = location.hash.slice(1);
if (["w1", "w2", "w3"].includes(ziel) && !gewaehlt.includes(ziel)) gewaehlt = [gewaehlt[0], ziel];
zeichne();
zaehle();
if (ziel) setTimeout(() => $(`#${ziel}`)?.scrollIntoView({ block: "start" }), 50);
