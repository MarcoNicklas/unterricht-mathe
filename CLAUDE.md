# Mathe-Lernseite Wirtschaftsschule

Lernseite für Mathe an der Wirtschaftsschule Bayern, Jahrgangsstufen 6–11. Gestartet wird mit Klasse 10 (V10).
Live: https://marconicklas.github.io/unterricht-mathe/ (GitHub Pages, Repo MarcoNicklas/unterricht-mathe, Branch main).
Der Aufbau und die Pflege von Inhalten stehen in README.md.

## Wer ich bin
- Lehrkraft. Ich schreibe Deutsch und oft kurz („Klasse 10 ausbauen“): erst einen Vorschlag machen, dann umsetzen.
- Die Schüler bekommen pro Thema oder Schulaufgabe einen Link. Ziele sind Lernen, Schulaufgaben-Vorbereitung und Abschlussprüfung.

## Regeln
- Neue Inhalte immer über `assets/inhalte.js` eintragen und die Lern-App als eigene HTML-Datei im Hauptordner anlegen.
- Design wie die Seite „Schulwegweiser“ (wirtschaftsschule-3d): Farben aus `assets/style.css`, Schullogo `assets/schullogo.png` als Home-Button in jeder Lern-App.
- Lern-Apps sind eigenständige HTML-Dateien: Erklärung, Beispiel, interaktives Schaubild, Übungen mit Prüfen-Knopf, gestufte Tipps.
- Nach Änderungen an `assets/` die Versionsnummer `?v=` in den HTML-Seiten hochzählen.
- Keine echten Schülernamen in Links oder Dateien, Codes statt Namen verwenden.
- Vor dem Push lokal prüfen: `python3 -m http.server 8000` → http://localhost:8000
- Commits auf Deutsch, kurz und mit Bereich vorn („Klasse 10: …“). Pushen erst nach meinem OK.

## Stand
- Klasse 10: lineare und quadratische Funktionen, Prüfungsaufgaben Funktionen, Raum und Form, Daten und Zufall.
- Klassen 6–9 und 11: noch leer.
