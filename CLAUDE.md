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

## Hochladen
- Der Ordner `webseite/` (OneDrive, …/011_Mathewebseite/webseite) ist ein git-Checkout des Repos, Branch main.
- Hochladen direkt mit `git add` / `git commit` / `git push`. Die Anmeldung läuft über die GitHub-CLI (`gh`, Konto MarcoNicklas).
  Kein Upload über Chrome oder die GitHub-Webseite mehr.
- Vorher `git pull`, falls auf github.com etwas geändert wurde.

## Stand
- Klassen: vierstufig 6, 7, 8, 9, V10 · zweistufig Z10, Z11. V10 und Z11 haben denselben Stoff (`ABSCHLUSS` in inhalte.js).
- Prüfungsvorbereitung (Teil A/B, Teil A üben) nur in V10 und Z11 (`pruefung: true`).
- V10/Z11: lineare und quadratische Funktionen, Prüfungsaufgaben Funktionen, Raum und Form, Daten und Zufall.
- Klasse 7 und 9: Webquests. Klassen 6, 8, Z10: noch leer (Rechentest-Training gibt es für alle).
- Format: Startseite nur Klassenwahl (kompakt, Handy), in der Klasse Wege als große Knöpfe (Stand 05.11.).
