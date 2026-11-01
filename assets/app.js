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

// ---------- Startseite ----------
function startseite() {
  $("#klassen").innerHTML = Object.entries(KLASSEN).map(([k, kl]) => {
    const fertig = kl.lernbereiche.length > 0;
    const ids = kl.lernbereiche.flatMap(lb => lb.themen.map(t => t.id));
    return fertig
      ? `<a class="tile" href="klasse.html?k=${k}"><div class="big">${k}</div>
           <span class="tag">${kl.lernbereiche.length} Lernbereiche</span>
           <b>${esc(kl.titel)}</b><span class="d">${esc(kl.untertitel || "")}</span>
           <div style="margin-top:10px">${fortschritt(ids)}</div></a>`
      : `<div class="tile off"><div class="big">${k}</div><span class="tag m">in Arbeit</span>
           <b>${esc(kl.titel)}</b><span class="d">Inhalte folgen</span></div>`;
  }).join("");
}

// ---------- Klassenseite ----------
function klassenseite() {
  const k = new URLSearchParams(location.search).get("k");
  const kl = KLASSEN[k];
  if (!kl) { $("main").innerHTML = `<h1>Klasse nicht gefunden</h1><p><a href="index.html">Zur Startseite</a></p>`; return; }
  document.title = `${kl.titel} – Mathe Wirtschaftsschule`;
  $("#titel").textContent = kl.titel;
  $("#untertitel").textContent = kl.untertitel || "";
  $("#crumb").textContent = kl.titel;

  const pakete = Object.entries(PAKETE).filter(([, p]) => p.klasse === k);
  $("#pakete").innerHTML = pakete.length
    ? `<h2>Lernpakete für Schulaufgaben</h2><div class="tiles">${pakete.map(([id, p]) =>
        `<a class="tile" href="lernpaket.html?id=${encodeURIComponent(id)}"><span class="tag o">Lernpaket</span>
         <b>${esc(p.titel)}</b><span class="d">${p.datum ? "Termin: " + datumText(p.datum) : ""}</span></a>`).join("")}</div>`
    : "";

  const zeichne = () => {
    $("#bereiche").innerHTML = kl.lernbereiche.length
      ? kl.lernbereiche.map(lb => `<div class="lb">
          <div class="lb-head"><div><div class="typ">${esc(lb.typ)}</div><h3><a href="${esc(lb.link)}">${esc(lb.titel)}</a></h3>
          <p>${esc(lb.beschreibung)}</p></div>${fortschritt(lb.themen.map(t => t.id))}</div>
          <ul class="themen">${lb.themen.map(themaZeile).join("")}</ul></div>`).join("")
      : `<div class="card">Für diese Jahrgangsstufe gibt es noch keine Inhalte.</div>`;
  };
  zeichne();
  abhaken(zeichne);
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
  const id = new URLSearchParams(location.search).get("id");
  const p = PAKETE[id];
  if (!p) { $("main").innerHTML = `<h1>Lernpaket nicht gefunden</h1><p>Prüfe den Link oder frag deine Lehrkraft.</p><p><a href="index.html">Zur Startseite</a></p>`; return; }
  document.title = `${p.titel} – Lernpaket`;
  const kl = KLASSEN[p.klasse];
  $("#crumbs").innerHTML = `<a href="index.html">Start</a> › <a href="klasse.html?k=${esc(p.klasse)}">${esc(kl.titel)}</a> › Lernpaket`;
  $("#titel").textContent = p.titel;

  let termin = "";
  if (p.datum) {
    const t = restTage(p.datum);
    termin = `<div>Termin: <b>${datumText(p.datum)}</b></div>
      <span class="count">${t > 1 ? `Noch ${t} Tage` : t === 1 ? "Morgen!" : t === 0 ? "Heute – viel Erfolg!" : "Schulaufgabe vorbei"}</span>`;
  }
  $("#kopf").innerHTML = `${termin}${p.hinweis ? `<p style="margin:10px 0 0">${esc(p.hinweis)}</p>` : ""}`;

  const themen = p.themen.map(t => alleThemen[t]).filter(Boolean);
  const checkIds = (p.checkliste || []).map((_, i) => `${id}#kann${i}`);

  const zeichne = () => {
    $("#themen").innerHTML = `<div class="lb"><div class="lb-head"><div><h3>Das kommt dran</h3>
      <p>Arbeite jedes Thema durch und hake es ab.</p></div>${fortschritt(themen.map(t => t.id))}</div>
      <ul class="themen">${themen.map(themaZeile).join("")}</ul></div>`;
    const e = ladeErledigt();
    $("#check").innerHTML = p.checkliste?.length
      ? `<h2>Checkliste: Das musst du können</h2><div class="card"><ul class="check">${p.checkliste.map((c, i) =>
          `<li><input type="checkbox" class="chk" data-id="${esc(checkIds[i])}" ${e.has(checkIds[i]) ? "checked" : ""} id="k${i}">
           <label for="k${i}">${esc(c)}</label></li>`).join("")}</ul>
           <p class="note">${fortschritt(checkIds)}</p></div>`
      : "";
  };
  zeichne();
  abhaken(zeichne);
}
