# Mathe-Lernseite Wirtschaftsschule

Lernseite für Mathematik an der Wirtschaftsschule (Jahrgangsstufen 6–11), gehostet mit GitHub Pages.

## Aufbau

| Datei | Zweck |
|---|---|
| `index.html` | Startseite: nur die Klassenwahl (6–11) |
| `klasse.html?k=10` | Vier Wege: Thema lernen (`#lernen`), Schulaufgabe (`#schulaufgabe`), Prüfung (`#pruefung`), Rechentest |
| `rechentest.html?k=8` | Rechentest-Training: 10 zufällige Kopfrechenaufgaben je Stufe (Klasse 10: `&z=v` oder `&z=z`) |
| `assets/rechentest.js` | Aufgabenarten und Stufen des Rechentests (V6, V7, V8, V9/Z10, V10/Z11) |
| `lernpaket.html?id=v10-sa1` | Individuelles Lernpaket für eine Schulaufgabe |
| `pruefung.html` | Abschlussprüfung: alle Themen mit `ap: true` |
| `lehrkraefte.html` | Baukasten: Lernpaket per Häkchen erstellen, Link + QR-Code |
| `assets/inhalte.js` | **Die einzige Datei, die du für neue Inhalte änderst** |
| `assets/style.css`, `assets/app.js` | Design und Logik (normalerweise nicht anfassen) |
| `*_funktionen.html` | Die eigentlichen Lern-Apps und Präsentationen |

## Neues Thema hinzufügen

1. Lern-App als HTML-Datei in den Hauptordner legen, z. B. `prozentrechnung.html`.
2. In `assets/inhalte.js` bei der passenden Klasse einen Lernbereich mit Themen eintragen.

## Neues Lernpaket für eine Schulaufgabe

**Am einfachsten:** `lehrkraefte.html` öffnen (Link unten auf jeder Seite), Themen anhaken, Link oder QR-Code
an die Klasse geben. Das ganze Paket steckt im Link – nichts muss geändert oder hochgeladen werden.

Dauerhaft auf der Startseite sichtbare Pakete: in `assets/inhalte.js` unter `PAKETE` einen Eintrag kopieren, Schlüssel ändern (z. B. `"v10-sa2"`),
Datum, Themen-ids und Checkliste anpassen. Den Schülern dann den Link schicken:

`https://marconicklas.github.io/unterricht-mathe/lernpaket.html?id=v10-sa2`

Für einzelne Schüler einen Code statt des Namens als Schlüssel verwenden (Datenschutz).

## Nach Änderungen an assets/

In den HTML-Seiten die Versionsnummer `?v=2` hochzählen, damit Browser die neue Fassung laden.

## Lokal ansehen

```
python3 -m http.server 8000
```

Dann im Browser `http://localhost:8000` öffnen.
