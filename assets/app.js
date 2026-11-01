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

  const pakete = Object.entries(PAKETE);
  $("#pakete").innerHTML = pakete.length
    ? `<div class="tiles">${pakete.map(([id, p]) => paketKachel(`lernpaket.html?id=${encodeURIComponent(id)}`, p)).join("")}</div>`
    : `<div class="card">Im Moment gibt es keine offenen Lernpakete.</div>`;
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

// ---------- Abschlussprüfung ----------
function pruefungsseite() {
  const zeichne = () => {
    const bloecke = Object.entries(KLASSEN).map(([k, kl]) => {
      const themen = kl.lernbereiche.flatMap(lb => lb.themen.filter(t => t.ap));
      return themen.length ? `<div class="lb"><div class="lb-head"><div><div class="typ">${esc(kl.titel)}</div>
        <h3>Prüfungstraining</h3><p>Echte Abschlussprüfungen und Sachaufgaben im Prüfungsstil</p></div>
        ${fortschritt(themen.map(t => t.id))}</div><ul class="themen">${themen.map(themaZeile).join("")}</ul></div>` : "";
    }).join("");
    $("#training").innerHTML = bloecke || `<div class="card">Noch keine Prüfungsaufgaben vorhanden.</div>`;
  };
  zeichne();
  abhaken(zeichne);
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
        paketKachel(`lernpaket.html?id=${encodeURIComponent(id)}`, p)).join("")}</div>`
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
  const q = new URLSearchParams(location.search);
  let id = q.get("id");
  let p = PAKETE[id];
  if (!p && q.get("p")) { p = paketDekodieren(q.get("p")); id = "link-" + kurzHash(q.get("p")); }
  if (!p) { $("main").innerHTML = `<h1>Lernpaket nicht gefunden</h1><p>Prüfe den Link oder frag deine Lehrkraft.</p><p><a href="index.html">Zur Startseite</a></p>`; return; }
  document.title = `${p.titel} – Lernpaket`;
  const kl = KLASSEN[p.klasse];
  $("#crumbs").innerHTML = `<a href="index.html">Start</a> › ${kl ? `<a href="klasse.html?k=${esc(p.klasse)}">${esc(kl.titel)}</a> › ` : ""}Lernpaket`;
  $("#titel").textContent = p.titel;

  let termin = "";
  if (p.datum) {
    const t = restTage(p.datum);
    termin = `<div>Termin: <b>${datumText(p.datum)}</b></div>
      <span class="count">${t > 1 ? `Noch ${t} Tage` : t === 1 ? "Morgen!" : t === 0 ? "Heute – viel Erfolg!" : "Schulaufgabe vorbei"}</span>`;
  }
  $("#kopf").innerHTML = `${termin}${p.hinweis ? `<p style="margin:10px 0 0">${esc(p.hinweis)}</p>` : ""}`;
  $("#kopf").hidden = !termin && !p.hinweis;

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
