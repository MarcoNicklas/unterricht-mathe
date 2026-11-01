# Mathe-Lernseite Wirtschaftsschule

Lernseite für Mathematik an der Wirtschaftsschule (Jahrgangsstufen 6–11), gehostet mit GitHub Pages.

## Aufbau

| Datei | Zweck |
|---|---|
| `index.html` | Startseite mit allen Jahrgangsstufen |
| `klasse.html?k=10` | Alle Lerninhalte einer Jahrgangsstufe, mit Abhaken |
| `lernpaket.html?id=v10-sa1` | Individuelles Lernpaket für eine Schulaufgabe |
| `assets/inhalte.js` | **Die einzige Datei, die du für neue Inhalte änderst** |
| `assets/style.css`, `assets/app.js` | Design und Logik (normalerweise nicht anfassen) |
| `*_funktionen.html` | Die eigentlichen Lern-Apps und Präsentationen |

## Neues Thema hinzufügen

1. Lern-App als HTML-Datei in den Hauptordner legen, z. B. `prozentrechnung.html`.
2. In `assets/inhalte.js` bei der passenden Klasse einen Lernbereich mit Themen eintragen.

## Neues Lernpaket für eine Schulaufgabe

In `assets/inhalte.js` unter `PAKETE` einen Eintrag kopieren, Schlüssel ändern (z. B. `"v10-sa2"`),
Datum, Themen-ids und Checkliste anpassen. Den Schülern dann den Link schicken:

`https://marconicklas.github.io/unterricht-mathe/lernpaket.html?id=v10-sa2`

Für einzelne Schüler einen Code statt des Namens als Schlüssel verwenden (Datenschutz).

## Lokal ansehen

```
python3 -m http.server 8000
```

Dann im Browser `http://localhost:8000` öffnen.
