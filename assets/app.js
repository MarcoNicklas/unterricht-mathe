/* Baut Startseite, Klassenseite und Lernpakete aus inhalte.js auf.
   Der Lernfortschritt bleibt nur im Browser des Schülers (localStorage). */

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ---------- Fortschritt ----------
const SPEICHER = "mathe-ws-erledigt";
function ladeErledigt() {
  try { return new Set(JSON.parse(localStorage.getItem(SPEICHER) || "[]")); } catch { return new Set(); }
}
function setzeErledigt(id, an) {
  const s = ladeErledigt();
  an ? s.add(id) : s.delete(id);
  try { localStorage.setItem(SPEICHER, JSON.stringify([...s])); } catch {}
}

const alleThemen = {};
for (const [k, kl] of Object.entries(KLASSEN))
  for (const lb of kl.lernbereiche)
    for (const t of lb.themen) alleThemen[t.id] = { ...t, klasse: k, lernbereich: lb.titel };

function fortschritt(ids) {
  const e = ladeErledigt();
  const n = ids.filter(id => e.has(id)).length;
  const p = ids.length ? Math.round(n / ids.length * 100) : 0;
  return `<span class="prog">${n} von ${ids.length} <span class="bar"><i style="width:${p}%"></i></span></span>`;
}

function themaZeile(t) {
  const fertig = ladeErledigt().has(t.id);
  return `<li class="${fertig ? "done" : ""}">
    <input type="checkbox" class="chk" data-id="${esc(t.id)}" ${fertig ? "checked" : ""} aria-label="Erledigt: ${esc(t.titel)}">
    <a href="${esc(t.link)}">${esc(t.titel)}</a>
    <span class="art">${esc(t.art)}</span></li>`;
}

// Abhaken: speichern und Seite neu zeichnen, damit Balken stimmen
function abhaken(neuZeichnen) {
  document.addEventListener("change", e => {
    if (!e.target.matches("input.chk[data-id]")) return;
    setzeErledigt(e.target.dataset.id, e.target.checked);
    neuZeichnen();
  });
}

// ---------- Startseite: nur Klasse wählen ----------
const LETZTE = "mathe-ws-klasse";
function startseite() {
  let letzte = "";
  try { letzte = localStorage.getItem(LETZTE) || ""; } catch {}
  $("#klassen").innerHTML = Object.keys(KLASSEN).map(k =>
    `<a class="klasse${k === letzte ? " zuletzt" : ""}" href="klasse.html?k=${k}"><span>Klasse</span><b>${k}</b></a>`).join("");
}

function paketKachel(href, p) {
  return `<a class="tile" href="${esc(href)}"><span class="tag o">Lernpaket</span>
    <b>${esc(p.titel)}</b><span class="d">${p.datum ? "Termin: " + datumText(p.datum) : ""}</span></a>`;
}

// ---------- Lernpakete als Link (aus dem Baukasten) ----------
// Das ganze Paket steckt im Link (?p=…), so braucht keine Lehrkraft inhalte.js zu ändern.
function paketKodieren(p) {
  const bytes = new TextEncoder().encode(JSON.stringify(p));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function paketDekodieren(code) {
  try {
    const b = atob(code.replace(/-/g, "+").replace(/_/g, "/"));
    const p = JSON.parse(new TextDecoder().decode(Uint8Array.from(b, c => c.charCodeAt(0))));
    return p && Array.isArray(p.themen) ? p : null;
  } catch { return null; }
}
function kurzHash(s) {
  let h = 5381;
  for (const c of s) h = (h * 33 + c.charCodeAt(0)) >>> 0;
  return h.toString(36);
}

// ---------- Abschlussprüfung: aufgebaut wie die echte AP (Teil A / Teil B) ----------
function pruefungAufbau() {
  const A = PRUEFUNG.teilA, B = PRUEFUNG.teilB;
  const kopf = t => `<div class="ap-kopf"><span>⏱ ${esc(t.zeit)}</span><span>🏅 ${t.punkte} Punkte</span><span>📎 ${esc(t.hilfsmittel)}</span></div>`;
  const aufgabeB = a => {
    const themen = a.themen.map(id => alleThemen[id]).filter(Boolean);
    return `<details class="bereich ap-b"><summary><span><b>Aufgabe ${a.nr}: ${esc(a.titel)}</b><small>${esc(a.inhalt)} · 15 Punkte</small></span>
      ${themen.length ? fortschritt(themen.map(t => t.id)) : `<span class="tag-bald">Übungen folgen</span>`}</summary>
      ${themen.length ? `<ul class="themen">${themen.map(themaZeile).join("")}</ul>` : `<p class="note" style="margin:0 18px 16px">Für diesen Teil gibt es bald Übungen.</p>`}</details>`;
  };
  return `
    <div class="card ap-ueberblick"><b>So ist die Abschlussprüfung aufgebaut</b>
      <div class="ap-teile"><div><span class="ap-tag a">Teil A</span>ohne Taschenrechner<br><small>25 Min. · 15 Punkte</small></div>
      <div><span class="ap-tag b">Teil B</span>mit Taschenrechner<br><small>125 Min. · 60 Punkte</small></div></div>
      <small>Zusammen 150 Minuten und 75 Punkte. Die Merkhilfe darfst du in beiden Teilen benutzen.</small></div>

    <h2 class="ap-h2"><span class="ap-tag a">Teil A</span> ohne Taschenrechner</h2>
    ${kopf(A)}
    <p class="note">${esc(A.hinweis)}</p>
    <div class="liste">${A.bloecke.map(b => `<a class="zeile ap-a" href="pruefung-a.html#${b.id}">
      <b>${esc(b.titel)} <span class="pkt">${b.punkte} P.</span></b><small>${esc(b.inhalt)}</small></a>`).join("")}</div>
    <a class="btn voll gross" href="pruefung-a.html">⏱ Teil A komplett üben</a>

    <h2 class="ap-h2"><span class="ap-tag b">Teil B</span> mit Taschenrechner</h2>
    ${kopf(B)}
    <p class="note">${esc(B.hinweis)}</p>
    ${B.aufgaben.map(aufgabeB).join("")}`;
}

function pruefungsseite() {
  const zeichne = () => { $("#training").innerHTML = pruefungAufbau(); };
  zeichne();
  abhaken(() => {
    const offen = [...document.querySelectorAll("details.bereich")].map(d => d.open);
    zeichne();
    document.querySelectorAll("details.bereich").forEach((d, i) => d.open = offen[i]);
  });
}

// ---------- Baukasten für Lehrkräfte ----------
function baukasten() {
  const klassen = Object.entries(KLASSEN).filter(([, kl]) => kl.lernbereiche.length);
  $("#b-klasse").innerHTML = klassen.map(([k, kl]) => `<option value="${k}">${esc(kl.titel)}</option>`).join("");

  const zeigeThemen = () => {
    const kl = KLASSEN[$("#b-klasse").value];
    $("#b-themen").innerHTML = kl.lernbereiche.map(lb => `<div class="lb"><div class="lb-head"><div>
      <div class="typ">${esc(lb.typ)}</div><h3>${esc(lb.titel)}</h3></div>
      <button type="button" class="btn ghost klein" data-alle="${esc(lb.id)}">Alle wählen</button></div>
      <ul class="themen">${lb.themen.map(t => `<li><input type="checkbox" class="chk" name="thema" value="${esc(t.id)}" id="b-${esc(t.id)}">
      <label for="b-${esc(t.id)}">${esc(t.titel)}</label><span class="art">${esc(t.art)}</span></li>`).join("")}</ul></div>`).join("");
    aktualisiere();
  };

  const aktualisiere = () => {
    const themen = [...document.querySelectorAll('input[name="thema"]:checked')].map(i => i.value);
    const p = {
      titel: $("#b-titel").value.trim() || "Lernpaket",
      klasse: $("#b-klasse").value,
      datum: $("#b-datum").value,
      hinweis: $("#b-hinweis").value.trim(),
      themen,
      checkliste: $("#b-check").value.split("\n").map(z => z.trim()).filter(Boolean)
    };
    const url = new URL(`lernpaket.html?p=${paketKodieren(p)}`, location.href).href;
    $("#b-anzahl").textContent = themen.length === 1 ? "1 Thema gewählt" : `${themen.length} Themen gewählt`;
    $("#b-ergebnis").hidden = !themen.length;
    $("#b-leer").hidden = !!themen.length;
    if (!themen.length) return;
    $("#b-link").value = url;
    $("#b-oeffnen").href = url;
    const qr = $("#b-qr");
    qr.innerHTML = "";
    if (window.QRCode) new QRCode(qr, { text: url, width: 200, height: 200, correctLevel: QRCode.CorrectLevel.L });
  };

  document.addEventListener("input", e => { if (e.target.closest("#bk")) aktualisiere(); });
  $("#b-klasse").addEventListener("change", zeigeThemen);
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-alle]");
    if (!b) return;
    const boxen = [...b.closest(".lb").querySelectorAll('input[name="thema"]')];
    const an = boxen.some(i => !i.checked);
    boxen.forEach(i => i.checked = an);
    aktualisiere();
  });
  $("#b-kopieren").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText($("#b-link").value); $("#b-kopieren").textContent = "Kopiert ✓"; }
    catch { $("#b-link").select(); document.execCommand("copy"); $("#b-kopieren").textContent = "Kopiert ✓"; }
    setTimeout(() => $("#b-kopieren").textContent = "Link kopieren", 2000);
  });
  zeigeThemen();
}

// ---------- Klassenseite: vier Wege, je eine Ansicht (#lernen, #schulaufgabe, #pruefung) ----------
const WEGE = [
  { id: "lernen",       icon: "📖", titel: "Thema lernen",               d: "Erklärung, Beispiel und Übungen" },
  { id: "schulaufgabe", icon: "📝", titel: "Schulaufgabe vorbereiten",   d: "Dein Lernpaket mit Checkliste" },
  { id: "pruefung",     icon: "🎓", titel: "Für die Prüfung trainieren", d: "Echte Prüfungsaufgaben mit Tipps" },
  { id: "rechentest",   icon: "⚡", titel: "Für den Rechentest trainieren", d: "10 Aufgaben ohne Taschenrechner" }
];

function klassenseite() {
  const k = new URLSearchParams(location.search).get("k");
  const kl = KLASSEN[k];
  if (!kl) { $("main").innerHTML = `<h1>Klasse nicht gefunden</h1><p><a href="index.html">Zur Startseite</a></p>`; return; }
  try { localStorage.setItem(LETZTE, k); } catch {}

  const leer = text => `<div class="card leer">${text}</div>`;
  const bereichListe = (bereiche) => bereiche.map(lb => `<details class="bereich">
      <summary><span><b>${esc(lb.titel)}</b><small>${esc(lb.beschreibung || "")}</small></span>${fortschritt(lb.themen.map(t => t.id))}</summary>
      <a class="btn voll" href="${esc(lb.link)}">${esc(lb.titel)} öffnen</a>
      <ul class="themen">${lb.themen.map(themaZeile).join("")}</ul></details>`).join("");

  const ansichten = {
    lernen: () => kl.lernbereiche.length
      ? `<p class="lead">Tippe auf ein Thema. Erledigtes kannst du abhaken.</p>${bereichListe(kl.lernbereiche)}`
      : leer(`Für Klasse ${esc(k)} gibt es hier bald Lernthemen.<br>Bis dahin: <a href="rechentest.html?k=${esc(k)}">Für den Rechentest trainieren</a>.`),

    schulaufgabe: () => {
      const pakete = Object.entries(PAKETE).filter(([, p]) => p.klasse === k);
      return (pakete.length ? `<div class="liste">${pakete.map(([id, p]) => `<a class="zeile" href="lernpaket.html?id=${encodeURIComponent(id)}">
          <b>${esc(p.titel)}</b><small>${p.datum ? "Termin: " + datumText(p.datum) : ""}</small></a>`).join("")}</div>` : "")
        + leer(`Vor jeder Schulaufgabe bekommst du von deiner Lehrkraft einen <b>Link</b> oder <b>QR-Code</b> zu deinem Lernpaket.
          Darin steht genau, was drankommt.`);
    },

    pruefung: () => (["10", "11"].includes(k) ? "" : leer(`Die Abschlussprüfung schreibst du am Ende der Wirtschaftsschule. Hier siehst du schon, wie sie aufgebaut ist.`))
      + pruefungAufbau()
  };

  const zeichne = () => {
    const ansicht = location.hash.slice(1);
    const weg = WEGE.find(w => w.id === ansicht && ansichten[w.id]);
    if (weg) {
      document.title = `${weg.titel} · Klasse ${k}`;
      $("#zurueck").textContent = `← Klasse ${k}`;
      $("#zurueck").href = `klasse.html?k=${k}`;
      $("#titel").innerHTML = `<span class="icon">${weg.icon}</span> ${esc(weg.titel)}`;
      $("#inhalt").innerHTML = ansichten[weg.id]();
    } else {
      document.title = `Klasse ${k} – Mathe Wirtschaftsschule`;
      $("#zurueck").textContent = "← Andere Klasse";
      $("#zurueck").href = "index.html";
      $("#titel").textContent = `Klasse ${k}`;
      $("#inhalt").innerHTML = `<p class="lead">Was möchtest du tun?</p><div class="wahl">${WEGE.map(w => `<a class="weg-knopf ${w.id}"
        href="${w.id === "rechentest" ? `rechentest.html?k=${k}` : "#" + w.id}"><span class="icon">${w.icon}</span>
        <span><b>${w.titel}</b><small>${w.d}</small></span><span class="pfeil">›</span></a>`).join("")}</div>`;
    }
  };
  zeichne();
  addEventListener("hashchange", () => { zeichne(); scrollTo(0, 0); });
  abhaken(() => {
    const offen = [...document.querySelectorAll("details.bereich")].map(d => d.open);
    zeichne();
    document.querySelectorAll("details.bereich").forEach((d, i) => d.open = offen[i]);
  });
}

// ---------- Lernpaket ----------
function datumText(iso) {
  return new Date(iso + "T00:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function restTage(iso) {
  const heute = new Date(); heute.setHours(0, 0, 0, 0);
  return Math.round((new Date(iso + "T00:00") - heute) / 864e5);
}

function lernpaket() {
  const q = new URLSearchParams(location.search);
  let id = q.get("id");
  let p = PAKETE[id];
  if (!p && q.get("p")) { p = paketDekodieren(q.get("p")); id = "link-" + kurzHash(q.get("p")); }
  if (!p) { $("main").innerHTML = `<h1>Lernpaket nicht gefunden</h1><p>Prüfe den Link oder frag deine Lehrkraft.</p><p><a href="index.html">Zur Startseite</a></p>`; return; }
  document.title = `${p.titel} – Lernpaket`;
  const kl = KLASSEN[p.klasse];
  $("#crumbs").innerHTML = kl ? `<a class="zurueck" href="klasse.html?k=${esc(p.klasse)}#schulaufgabe">← Klasse ${esc(p.klasse)}</a>` : `<a class="zurueck" href="index.html">← Start</a>`;
  $("#titel").textContent = p.titel;

  let termin = "";
  if (p.datum) {
    const t = restTage(p.datum);
    termin = `<div>Termin: <b>${datumText(p.datum)}</b></div>
      <span class="count">${t > 1 ? `Noch ${t} Tage` : t === 1 ? "Morgen!" : t === 0 ? "Heute – viel Erfolg!" : "Schulaufgabe vorbei"}</span>`;
  }
  $("#kopf").innerHTML = `${termin}${p.hinweis ? `<p style="margin:10px 0 0">${esc(p.hinweis)}</p>` : ""}`;
  $("#kopf").hidden = !termin && !p.hinweis;

  // EINE Liste: pro Thema der „Ich kann …“-Satz mit Link zum Üben,
  // dazu Zusatzpunkte aus der Checkliste (ältere Links / Baukasten), die zu keinem Thema gehören.
  const zeilen = [
    ...p.themen.map(t => alleThemen[t]).filter(Boolean)
      .map(t => ({ id: t.id, text: t.kann || t.titel, link: t.link, linkText: t.titel })),
    ...(p.checkliste || []).map((c, i) => ({ id: `${id}#kann${i}`, text: c }))
  ];

  const zeichne = () => {
    const e = ladeErledigt();
    $("#themen").innerHTML = `<div class="card lernliste"><div class="ll-kopf"><b>Das kommt dran</b>${fortschritt(zeilen.map(z => z.id))}</div>
      <p class="note">Übe jedes Thema. Wenn du es kannst, hake es ab.</p>
      <ul>${zeilen.map((z, i) => `<li class="${e.has(z.id) ? "done" : ""}">
        <input type="checkbox" class="chk" data-id="${esc(z.id)}" id="z${i}" ${e.has(z.id) ? "checked" : ""}>
        <div><label for="z${i}">${esc(z.text)}</label>
        ${z.link ? `<a class="ueben" href="${esc(z.link)}">📖 Üben: ${esc(z.linkText)} ›</a>` : ""}</div></li>`).join("")}</ul></div>`;
  };
  zeichne();
  abhaken(zeichne);
}
