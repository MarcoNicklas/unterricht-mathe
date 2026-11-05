/* =====================================================================
   RECHENTEST-TRAINING
   Erzeugt 10 zufällige Kopfrechenaufgaben im Stil der Rechentests
   (ohne Hilfsmittel, nur das Ergebnis zählt).

   Stufen (wie die Ordner der Rechentests):
     A = V6 · B = V7 · C = V8 · D = V9 / Z10 · E = V10 / Z11
   Welche Aufgabenarten in welcher Stufe vorkommen: siehe STUFEN unten.

   WICHTIG: Die Aufgaben sind ähnlich wie im echten Rechentest, aber nie gleich.
   Jede erzeugte Aufgabe wird mit allen echten Testaufgaben verglichen
   (ECHTE_TESTS in rechentest-echt.js) und neu gewürfelt, wenn sie dieselben
   Zahlen enthält.
   ===================================================================== */

const $ = s => document.querySelector(s);

// ---------- Hilfsfunktionen ----------
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const mische = arr => arr.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
const ggT = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const rund = x => Math.round(x * 1e6) / 1e6;

// Zahl im deutschen Format: 1.234,5 und echtes Minuszeichen
function f(x) {
  x = rund(x);
  const neg = x < 0;
  const [g, d] = Math.abs(x).toString().split(".");
  const ganz = g.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (neg ? "−" : "") + ganz + (d ? "," + d : "");
}
const geld = x => rund(x).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d),)/g, ".") + " €";
const k = x => x < 0 ? `(${f(x)})` : f(x);                    // negative Zahl in Klammern
const br = (z, n) => `<span class="br"><span>${f(z)}</span><span>${f(n)}</span></span>`;
const brS = (z, n) => z < 0 ? `−${br(-z, n)}` : br(z, n);
const kuerze = (z, n) => { const g = ggT(z, n); return n < 0 ? [-z / g, -n / g] : [z / g, n / g]; };

// ---------- Aufgabenarten ----------
// Jede liefert { frage, typ: "zahl" | "bruch" | "wahl", loesung, einheit?, optionen? }
const A = {
  addNat() {
    const a = rnd(120, 9800), b = rnd(15, 2500);
    return Math.random() < .5 ? { frage: `${f(a)} + ${f(b)}`, loesung: a + b }
                              : { frage: `${f(a + b)} − ${f(b)}`, loesung: a };
  },
  mulNat() {
    const v = pick([[rnd(2, 9) * 10, rnd(3, 9)], [rnd(11, 25), rnd(3, 9)], [rnd(101, 309), rnd(2, 8)], [rnd(12, 19), rnd(11, 15)]]);
    return { frage: `${f(v[0])} · ${f(v[1])}`, loesung: v[0] * v[1] };
  },
  divNat() {
    const v = pick([[rnd(11, 25), rnd(3, 9)], [pick([15, 25, 12, 50]), rnd(4, 30)], [rnd(2, 9), rnd(12, 99)], [25, rnd(2, 9) * 100]]);
    return { frage: `${f(v[0] * v[1])} : ${f(v[0])}`, loesung: v[1] };
  },
  million() {
    const b = rnd(101, 9999);
    return { frage: `1.000.000 − ${f(b)}`, loesung: 1e6 - b };
  },
  intAdd() {
    const a = rnd(-60, 60) || 7, b = rnd(-60, 60) || -9;
    return Math.random() < .5 ? { frage: `${k(a)} + ${k(b)}`, loesung: a + b } : { frage: `${k(a)} − ${k(b)}`, loesung: a - b };
  },
  intMul() {
    const a = rnd(2, 15) * pick([1, -1]), b = rnd(2, 12) * pick([1, -1]);
    return Math.random() < .5 ? { frage: `${k(a)} · ${k(b)}`, loesung: a * b } : { frage: `${k(a * b)} : ${k(b)}`, loesung: a };
  },
  potenzKlein() {
    const v = pick([[rnd(2, 5), 3], [rnd(2, 3), 4], [2, rnd(5, 8)], [rnd(-9, -2), 2], [rnd(-3, -2), 3], [rnd(11, 15), 2], [10, rnd(3, 6)]]);
    return { frage: `${k(v[0])}<sup>${v[1]}</sup>`, loesung: v[0] ** v[1] };
  },
  potenzGross() {
    const v = pick([[rnd(11, 19) * 10, 2], [rnd(2, 9) * 100, 2], [rnd(-4, -2), 4], [rnd(-5, -2), 3], [rnd(11, 25), 2]]);
    return { frage: `${k(v[0])}<sup>${v[1]}</sup>`, loesung: v[0] ** v[1] };
  },
  potenzDezimal() {
    const a = rund(rnd(1, 9) / pick([10, 10, 100])) * pick([1, -1]);
    return { frage: `${k(a)}<sup>2</sup>`, loesung: rund(a * a) };
  },
  wurzel() {
    const a = rnd(2, 25), e = pick([1, 10, 100]);
    return { frage: `√${f(a * a * e * e)}`, loesung: a * e };
  },
  einheit() {
    const t = pick([
      ["g", "kg", 1000], ["kg", "g", 1 / 1000], ["kg", "t", 1000], ["mm", "cm", 10], ["mm", "dm", 100], ["cm", "m", 100],
      ["m", "km", 1000], ["dm", "cm", 1 / 10], ["min", "h", 60], ["s", "min", 60], ["ct", "€", 100]
    ]);
    const [von, nach, fak] = t;
    const zeit = nach === "h" || nach === "min";
    const ziel = zeit ? rnd(2, 12) * pick([1, 0.5]) : fak >= 1 ? rnd(2, 95) * pick([1, 1, 0.5, 0.1]) : rnd(2, 95) * pick([1, 10]);
    const start = rund(ziel * fak);
    return { frage: `${f(start)} ${von} = ? ${nach}`, loesung: ziel, einheit: nach, kurz: true };
  },
  einheitRaum() {
    const t = pick([["m³", "l", 1000], ["dm³", "l", 1], ["l", "ml", 1000], ["cm³", "ml", 1], ["m²", "dm²", 100], ["dm²", "cm²", 100], ["m²", "cm²", 10000]]);
    const [von, nach, fak] = t;
    const a = pick([0.25, 0.5, 1.5, 2, 0.75, 3, 0.4, 1.2]);
    return { frage: `${f(a)} ${von} = ? ${nach}`, loesung: rund(a * fak), einheit: nach, kurz: true };
  },
  einheitMix() {
    const v = pick([
      () => { const a = rnd(2, 9) + rnd(1, 9) / 100, b = rnd(5, 40), c = rnd(1, 9);
        return { frage: `${f(a)} m + ${f(b)} cm + ${f(c)} dm = ? cm`, loesung: rund(a * 100 + b + c * 10), einheit: "cm" }; },
      () => { const a = rnd(1, 9), b = rnd(10, 950), c = rnd(1, 9);
        return { frage: `${f(a)} km + ${f(b)} m + ${f(c)} dm = ? m`, loesung: rund(a * 1000 + b + c / 10), einheit: "m" }; },
      () => { const a = rnd(1, 4) + pick([0, .5, .25]), b = rnd(2, 95);
        return { frage: `${f(a)} t + ${f(b)} kg = ? kg`, loesung: rund(a * 1000 + b), einheit: "kg" }; },
      () => { const a = rnd(2, 9), b = rnd(2, 90), c = pick([0.5, 1.5, 2.5]);
        return { frage: `${f(a)} cm + ${f(b)} dm + ${f(c)} m = ? cm`, loesung: rund(a + b * 10 + c * 100), einheit: "cm" }; }
    ]);
    return v();
  },
  flaeche() {
    const a = pick([15, 20, 25, 30, 40, 50]), b = pick([0.5, 0.2, 0.4, 1.5]);
    return { frage: `${f(a)} dm · ${f(b)} m = ? dm²`, loesung: rund(a * b * 10), einheit: "dm²" };
  },
  klammer() {
    const v = pick([
      () => { const a = rnd(10, 30), b = rnd(2, 9), c = rnd(2, 6); return { frage: `${f(a)} − ${f(b)} · ${f(c)}`, loesung: a - b * c }; },
      () => { const a = rnd(2, 15), b = rnd(2, 9), c = rnd(10, 20), d = rnd(1, 9); return { frage: `${f(a)} − (${f(b)} − ${f(c)}) + ${f(d)}`, loesung: a - (b - c) + d }; },
      () => { const b = rnd(2, 9) * pick([1, -1]), q = rnd(2, 15) * pick([1, -1]), c = rnd(1, 9);
        return { frage: `${f(q * b)} : ${k(b)} + ${f(c)}`, loesung: q + c }; },
      () => { const a = rnd(2, 9), b = rnd(2, 6), c = rnd(2, 9); return { frage: `(${f(a)} − ${f(a + b)}) · ${f(c)}`, loesung: -b * c }; },
      () => { const a = rnd(2, 9) * 2; const c = rnd(1, 9); return { frage: `−${k(-a)} : 2 − ${f(c)}`, loesung: a / 2 - c }; }
    ]);
    return v();
  },
  klammerQuadrat() {
    const a = rnd(10, 40), b = rnd(-30, -5), c = rnd(2, 9);
    return { frage: `−${f(a)} − (${f(b)} + ${f(c)})<sup>2</sup>`, loesung: -a - (b + c) ** 2 };
  },
  kette() {
    const z = [rnd(5, 30), -rnd(10, 40), rnd(2, 15), -rnd(1, 9)];
    return { frage: z.map((x, i) => i ? (x < 0 ? ` − ${f(-x)}` : ` + ${f(x)}`) : f(x)).join(""), loesung: z.reduce((s, x) => s + x, 0) };
  },
  produktKette() {
    const z = [rnd(2, 5), -rnd(2, 5), pick([-0.5, 0.5, -2]), -2];
    return { frage: z.map(k).join(" · "), loesung: z.reduce((s, x) => s * x, 1) };
  },
  dezAdd() {
    const a = rnd(-1500, 1500) / 10, b = rnd(-1500, 1500) / 10;
    return { frage: `${f(a)} + ${k(b)}`, loesung: rund(a + b) };
  },
  dezMul() {
    const v = pick([[rnd(2, 9) * 10 + pick([0, 20, 40, 60]), 0.2], [pick([0.25, 0.5, 0.75]), pick([4, 8, 12, 16, 20])], [pick([12, 16, 24, 36]), 2.5], [rnd(2, 9) / 10, rnd(2, 9) / 10], [rnd(11, 30), 0.3]]);
    return { frage: `${f(v[0])} · ${f(v[1])}`, loesung: rund(v[0] * v[1]) };
  },
  dezDiv() {
    const d = pick([0.5, 1.2, 2.1, 0.3, 1.5, 0.4]), q = rnd(2, 15) + pick([0, 0.5, 0.3]);
    return { frage: `${f(rund(d * q))} : ${f(d)}`, loesung: rund(q) };
  },
  grossDiv() {
    const b = pick([30, 40, 60, 90, 120, 250]) * pick([1, -1]), q = rnd(12, 95) * pick([10, 100]) * pick([1, -1]);
    return { frage: `${f(b * q)} : ${k(b)}`, loesung: q };
  },
  prozent() {
    let p, g;
    do {
      p = pick([1, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 90, 150]);
      g = pick([40, 60, 80, 120, 200, 240, 300, 340, 500, 800, 1500, 1800, 25000, 90, 36, 125, 193, 350, 245.5]);
    } while (!Number.isInteger(rund(p * g)) || (![1, 2, 5, 10, 20, 25, 50].includes(p) && g % 20 !== 0));
    const e = pick(["", "", " €", " km", " kg"]);
    const w = rund(p * g / 100);
    return { frage: `${p} % von ${e === " €" ? geld(g) : f(g) + e}`, loesung: w, einheit: e.trim() };
  },
  rabatt() {
    const p = pick([10, 20, 25, 50]), g = pick([40, 60, 80, 120, 150, 200]);
    return Math.random() < .5
      ? { frage: `${pick(["Eine Jacke", "Ein Rucksack", "Ein Paar Sneaker", "Ein Kopfhörer"])} kostet ${geld(g)}. Es gibt ${p} % Rabatt. Wie viel Euro spart man?`, loesung: g * p / 100, einheit: "€", text: true }
      : { frage: `${pick(["Ben", "Aylin", "Luca", "Mila"])} bekommt ${p} % Rabatt und spart dadurch ${geld(g * p / 100)}. Wie viel hat der Artikel vorher gekostet?`, loesung: g, einheit: "€", text: true };
  },
  geld() {
    const g = rnd(10, 19) * 5, a = rnd(4, 20) + pick([0.5, 0.25, 0, 0.75]), b = rnd(3, 20) + pick([0, 0.5]);
    return { frage: `${geld(g)} − ${geld(a)} − ${geld(b)}`, loesung: rund(g - a - b), einheit: "€" };
  },
  dreisatz() {
    const v = pick([
      () => { const [w, p] = pick([["Trauben", 3.2], ["Kirschen", 4.8], ["Tomaten", 2.4], ["Käse", 12], ["Erdbeeren", 6]]), m = pick([0.25, 0.5, 0.75, 1.5]);
        return { frage: `1 kg ${w} kostet ${geld(p)}. Wie viel kosten ${f(m * 1000)} g?`, loesung: rund(p * m), einheit: "€", text: true }; },
      () => { const s = pick([3, 4, 5, 6]), p = pick([2.5, 4, 1.2, 6]), n = pick([2, 7, 9, 10]); return { frage: `${s} Hefte kosten ${geld(s * p)}. Wie viel kosten ${n} Hefte?`, loesung: rund(n * p), einheit: "€", text: true }; },
      () => { const v = pick([60, 80, 90, 120]), t = pick([0.5, 1.5, 2.5, 3]); return { frage: `Ein Auto fährt ${v} km in einer Stunde. Wie weit kommt es in ${f(t)} Stunden?`, loesung: v * t, einheit: "km", text: true }; }
    ]);
    return v();
  },
  bruchVon() {
    const n = pick([2, 3, 4, 5, 8, 10]), z = rnd(1, n - 1), g = n * rnd(3, 15);
    return { frage: `${br(z, n)} von ${f(g)}`, loesung: z * g / n };
  },
  bruchAdd(negativ) {
    for (;;) {
      const n1 = pick([2, 3, 4, 5, 6, 8]), n2 = pick([3, 4, 5, 6, 10, 12]);
      if (n1 === n2) continue;
      const z1 = rnd(1, n1 - 1), z2 = rnd(1, n2 - 1), plus = Math.random() < .5;
      const [z, n] = kuerze(plus ? z1 * n2 + z2 * n1 : z1 * n2 - z2 * n1, n1 * n2);
      if (z === 0 || n === 1 || (!negativ && z < 0) || ggT(z1, n1) > 1 || ggT(z2, n2) > 1) continue;
      return { frage: `${br(z1, n1)} ${plus ? "+" : "−"} ${br(z2, n2)}`, typ: "bruch", loesung: [z, n] };
    }
  },
  bruchMal() {
    for (;;) {
      const a = [rnd(1, 9), rnd(2, 10)], b = [rnd(1, 9), rnd(2, 12)], mal = Math.random() < .6;
      const [z, n] = kuerze(mal ? a[0] * b[0] : a[0] * b[1], mal ? a[1] * b[1] : a[1] * b[0]);
      if (n === 1 || a[0] >= a[1] * 2 || ggT(a[0], a[1]) > 1 || ggT(b[0], b[1]) > 1) continue;
      return { frage: `${br(...a)} ${mal ? "·" : ":"} ${br(...b)}`, typ: "bruch", loesung: [z, n] };
    }
  },
  schaetzen() {
    const s = pick(SCHAETZEN);
    return { frage: s[0], typ: "wahl", optionen: mische(s.slice(1)), loesung: s[1], text: true };
  }
};

// Schätzfragen: [Frage, richtige Antwort, falsch, falsch]
const SCHAETZEN = [
  ["Wie lang ist eine Stubenfliege?", "ca. 7 mm", "ca. 7 cm", "ca. 0,7 mm"],
  ["Wie schwer ist eine Tafel Schokolade?", "100 g", "1 kg", "10 g"],
  ["Wie viel Wasser passt in eine volle Badewanne?", "ca. 150 l", "ca. 15 l", "ca. 1.500 l"],
  ["Wie schwer ist ein Kleinwagen?", "ca. 1 t", "ca. 100 kg", "ca. 10 t"],
  ["Wie lang ist ein Fußballfeld?", "ca. 100 m", "ca. 1 km", "ca. 30 m"],
  ["Wie schwer ist ein Hühnerei?", "ca. 60 g", "ca. 6 g", "ca. 600 g"],
  ["Wie hoch ist ein Klassenzimmer?", "ca. 3 m", "ca. 1,5 m", "ca. 8 m"],
  ["Wie lang ist ein neuer Bleistift?", "ca. 18 cm", "ca. 18 mm", "ca. 1,8 m"],
  ["Wie weit gehst du in einer Stunde zu Fuß?", "ca. 5 km", "ca. 500 m", "ca. 20 km"],
  ["Wie viel passt in eine Getränkedose?", "0,33 l", "3,3 l", "33 ml"],
  ["Wie dick ist ein Smartphone?", "ca. 8 mm", "ca. 8 cm", "ca. 0,8 mm"],
  ["Wie groß ist ein DIN-A4-Blatt?", "ca. 6 dm²", "ca. 6 m²", "ca. 6 cm²"],
  ["Wie viel passt in den Tank eines Autos?", "ca. 50 l", "ca. 5 l", "ca. 500 l"],
  ["Wie schwer ist ein Liter Wasser?", "1 kg", "100 g", "10 kg"],
  ["Wie groß ist der Umfang eines Fußballs?", "ca. 70 cm", "ca. 7 cm", "ca. 7 m"],
  ["Wie hoch ist eine Zimmertür?", "ca. 2 m", "ca. 4 m", "ca. 80 cm"],
  ["Wie schwer ist ein Schulranzen mit Büchern?", "ca. 5 kg", "ca. 500 g", "ca. 50 kg"],
  ["Wie lang ist ein Bus im Stadtverkehr?", "ca. 12 m", "ca. 4 m", "ca. 40 m"]
];

// ---------- Stufen: 10 Aufgaben, Reihenfolge wie im echten Test ----------
const STUFEN = {
  A: { name: "V6",  aufgaben: ["addNat", "mulNat", "addNat", "divNat", "million", "intAdd", "intMul", "potenzKlein", "einheit", "intMul"] },
  B: { name: "V7",  aufgaben: ["dezDiv", "prozent", "prozent", "bruchAdd", "dezMul", "klammer", "prozent", "einheitRaum", "bruchVon", "addNat"] },
  C: { name: "V8",  aufgaben: ["schaetzen", "kette", "prozent", "klammer", "bruchAdd", "dezMul", "dezAdd", "dreisatz", "grossDiv", "bruchMal"] },
  D: { name: "V9 / Z10", aufgaben: ["schaetzen", "klammer", "prozent", "einheitMix", "million", "bruchMal", "bruchAdd", "flaeche", "potenzGross", "rabatt"] },
  E: { name: "V10 / Z11", aufgaben: ["schaetzen", "grossDiv", "potenzDezimal", "geld", "einheitMix", "prozent", "klammerQuadrat", "bruchAdd", "wurzel", "produktKette"] }
};
function stufeFuer(klasse, zweig) {
  return { "6": "A", "7": "B", "8": "C", "9": "D", "11": "E" }[klasse] || (klasse === "10" ? (zweig === "z" ? "D" : zweig === "v" ? "E" : null) : null);
}

// ---------- Nie eine echte Testaufgabe ----------
// Fingerabdruck = alle Zahlen der Aufgabe, ohne Vorzeichen, sortiert (wie in rechentest-echt.js)
function fingerabdruck(frage) {
  const t = frage.replace(/<sup>(.*?)<\/sup>/g, " $1 ").replace(/<[^>]+>/g, " ").replace(/√/g, " ");
  const zahlen = (t.match(/\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []).map(z => Number(z.replace(/\./g, "").replace(",", ".")));
  return zahlen.sort((a, b) => a - b).map(z => String(rund(z))).join("|");
}
function fnv(s) {   // gleiche Prüfsumme wie in werkzeuge/rechentest_ausschluss.py
  let h = 0x811c9dc5;
  for (const c of new TextEncoder().encode(s)) h = Math.imul(h ^ c, 0x01000193) >>> 0;
  return h.toString(16).padStart(8, "0");
}
const echt = a => typeof ECHTE_TESTS !== "undefined" && ECHTE_TESTS.has(fnv(fingerabdruck(a.frage)));
function erzeuge(name, stufe, schonDa) {
  let a;
  for (let i = 0; i < 200; i++) {
    a = { typ: "zahl", ...A[name](name === "bruchAdd" && stufe !== "B") };
    if (!echt(a) && !schonDa.has(a.frage)) break;
  }
  schonDa.add(a.frage);
  return a;
}

// ---------- Eingaben lesen ----------
// Akzeptiert 1.508 · 1508 · 5.090,5 · 0,81 · 0.81 · −3 · -3
function leseZahl(s) {
  s = String(s).trim().replace(/\s/g, "").replace(/[−–]/g, "-").replace(/€|[a-zA-Z²³]+$/g, "");
  if (!s) return null;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const x = Number(s);
  return Number.isFinite(x) ? x : null;
}

// ---------- Ansicht ----------
let test = [], start = 0, uhr = null, ausgewertet = false;

function zeigeWahl(klasse) {
  $("#rt").innerHTML = `<p class="lead">In welchem Zweig bist du?</p><div class="wahl">
    <a class="weg-knopf rechentest" href="?k=10&z=v"><span class="icon">4</span><span><b>V10</b><small>vierstufig</small></span><span class="pfeil">›</span></a>
    <a class="weg-knopf rechentest" href="?k=10&z=z"><span class="icon">2</span><span><b>Z10</b><small>zweistufig</small></span><span class="pfeil">›</span></a></div>`;
}

function eingabe(a, i) {
  if (a.typ === "wahl") return `<div class="optionen">${a.optionen.map(o =>
    `<label><input type="radio" name="a${i}" value="${o}"><span>${o}</span></label>`).join("")}</div>`;
  const pm = `<button type="button" class="pm" data-pm="${i}" aria-label="Vorzeichen wechseln">±</button>`;
  if (a.typ === "bruch") return `<div class="antwort">= ${pm}<span class="br-ein">
      <input id="a${i}z" inputmode="numeric" autocomplete="off" aria-label="Zähler">
      <input id="a${i}n" inputmode="numeric" autocomplete="off" aria-label="Nenner"></span></div>`;
  return `<div class="antwort">${a.text || a.frage.includes("= ?") ? "" : "= "}${pm}<input id="a${i}" inputmode="decimal" autocomplete="off" aria-label="Ergebnis">
    ${a.einheit ? `<span class="einheit">${a.einheit}</span>` : ""}</div>`;
}

function neuerTest(stufe, name) {
  const schonDa = new Set();
  test = STUFEN[stufe].aufgaben.map(n => erzeuge(n, stufe, schonDa));
  ausgewertet = false;
  $("#rt").innerHTML = `
    <div class="rt-leiste"><span>${name}</span><span id="uhr">0:00</span><span id="stand">0 / 10</span></div>
    <p class="note">Ohne Taschenrechner. Rechne im Kopf oder auf einem Zettel. Brüche vollständig kürzen.</p>
    <div id="ergebnis"></div>
    <ol class="aufgaben">${test.map((a, i) => `<li class="aufgabe" id="k${i}">
      <div class="nr">${i + 1}</div><div class="inh"><div class="frage${a.text || a.typ === "wahl" ? " text" : ""}">${a.frage.replace(/ = \? .*$/, " =")}</div>
      ${eingabe(a, i)}<div class="rueck" id="r${i}"></div></div></li>`).join("")}</ol>
    <button class="btn voll gross" id="fertig">Fertig – auswerten</button>`;
  start = Date.now();
  clearInterval(uhr);
  uhr = setInterval(() => { const s = Math.floor((Date.now() - start) / 1000); $("#uhr").textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }, 1000);
  $("#fertig").onclick = () => auswerten(stufe, name);
}

function loesungText(a) {
  if (a.typ === "bruch") return brS(...a.loesung);
  if (a.typ === "wahl") return a.loesung;
  return (a.einheit === "€" ? geld(a.loesung) : f(a.loesung) + (a.einheit ? " " + a.einheit : ""));
}

function pruefe(a, i) {
  if (a.typ === "wahl") {
    const w = document.querySelector(`input[name="a${i}"]:checked`);
    return w ? (w.value === a.loesung ? "ok" : "falsch") : "leer";
  }
  if (a.typ === "bruch") {
    let z = leseZahl($(`#a${i}z`).value), n = leseZahl($(`#a${i}n`).value);
    if (z === null) return "leer";
    if (n === null) n = 1;
    if (!n) return "falsch";
    const [lz, ln] = a.loesung;
    if (z * ln !== lz * n) return "falsch";
    return ggT(z, n) === 1 ? "ok" : "kuerzen";
  }
  const x = leseZahl($(`#a${i}`).value);
  if (x === null) return "leer";
  return Math.abs(x - a.loesung) < 1e-9 ? "ok" : "falsch";
}

function auswerten(stufe, name) {
  clearInterval(uhr);
  ausgewertet = true;
  let punkte = 0;
  test.forEach((a, i) => {
    const r = pruefe(a, i);
    if (r === "ok") punkte++;
    $(`#k${i}`).className = "aufgabe " + (r === "ok" ? "richtig" : "fehler");
    $(`#r${i}`).innerHTML = r === "ok" ? "✓ Richtig"
      : r === "kuerzen" ? `Fast! Du musst noch kürzen: ${loesungText(a)}`
      : `${r === "leer" ? "Nicht bearbeitet." : "✗ Leider falsch."} Richtig ist: <b>${loesungText(a)}</b>`;
    document.querySelectorAll(`#k${i} input, #k${i} button`).forEach(e => e.disabled = true);
  });
  const lob = punkte === 10 ? "Perfekt! 🎉" : punkte >= 8 ? "Sehr gut! 💪" : punkte >= 5 ? "Gut – da geht noch was!" : "Weiter üben – das wird! 🙂";
  $("#ergebnis").innerHTML = `<div class="card punkte"><div class="zahl">${punkte} / 10</div><div>${lob}</div>
    <div class="note">Zeit: ${$("#uhr").textContent} min</div><button class="btn voll" id="nochmal">Neuer Test</button></div>`;
  $("#stand").textContent = `${punkte} richtig`;
  $("#fertig").textContent = "Neuer Test";
  $("#fertig").onclick = $("#nochmal").onclick = () => { neuerTest(stufe, name); scrollTo(0, 0); };
  $("#ergebnis").scrollIntoView({ behavior: "smooth", block: "start" });
}

// Vorzeichen-Knopf (auf dem Handy fehlt oft das Minus) und „x / 10 beantwortet“
document.addEventListener("click", e => {
  const b = e.target.closest("[data-pm]");
  if (!b) return;
  const i = b.dataset.pm, el = $(`#a${i}`) || $(`#a${i}z`);
  const v = el.value.trim();
  el.value = /^[-−]/.test(v) ? v.replace(/^[-−]\s*/, "") : "−" + v;
  el.focus();
  zaehle();
});
function zaehle() {
  if (ausgewertet || !test.length) return;
  const n = test.filter((a, i) => pruefe(a, i) !== "leer").length;
  $("#stand").textContent = `${n} / 10`;
}
document.addEventListener("input", zaehle);
document.addEventListener("change", zaehle);
// Enter springt zum nächsten Feld
document.addEventListener("keydown", e => {
  if (e.key !== "Enter" || !e.target.matches(".aufgabe input")) return;
  e.preventDefault();
  const felder = [...document.querySelectorAll(".aufgabe input:not([type=radio])")];
  const n = felder[felder.indexOf(e.target) + 1];
  n ? n.focus() : e.target.blur();
});

// ---------- Start ----------
(function () {
  const q = new URLSearchParams(location.search);
  const klasse = q.get("k") || "", zweig = q.get("z") || "";
  if (klasse) { $("#zurueck").href = `klasse.html?k=${encodeURIComponent(klasse)}`; $("#zurueck").textContent = `← Klasse ${klasse}`; }
  const stufe = stufeFuer(klasse, zweig);
  if (klasse === "10" && !stufe) return zeigeWahl(klasse);
  if (!stufe) {
    $("#rt").innerHTML = `<p class="lead">Wähle zuerst deine Klasse.</p><div class="klassen">${["6", "7", "8", "9", "10", "11"].map(x =>
      `<a class="klasse" href="?k=${x}"><span>Klasse</span><b>${x}</b></a>`).join("")}</div>`;
    return;
  }
  neuerTest(stufe, klasse === "10" ? (zweig === "z" ? "Z10" : "V10") : (klasse === "11" ? "Z11" : "V" + klasse));
})();
