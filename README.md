# Projekt: Wiener Linien Anzeige

## Projektbeschreibung

Die Anwendung soll im Minutentakt Daten von folgenden API-Endpunkten der Wiener Linien abrufen:

- [https://www.wienerlinien.at/ogd_realtime/monitor?stopId=3445](https://www.wienerlinien.at/ogd_realtime/monitor?stopId=3445)
- [https://www.wienerlinien.at/ogd_realtime/monitor?stopId=3448](https://www.wienerlinien.at/ogd_realtime/monitor?stopId=3448)

Die API liefert Echtzeitdaten zu den Abfahrtszeiten der Straßenbahnlinie O. Diese Daten werden verarbeitet und angezeigt werden.

## Technische Anforderungen

### Abhängigkeiten

- React
- TypeScript
- Vite
- Optional: @sklera/sdk ([Dokumentation](https://sklera.tv/js-sdk/docs/))

### Sklera-CMS-Integration

Dieses Projekt ist als HTML5-App für das Sklera CMS vorbereitet. Ein Manifest ist enthalten, welches die Integration im Sklera CMS ermöglicht. Weitere Informationen zur Erstellung von Sklera HTML5-Apps findest du in der [Sklera-Dokumentation](https://sklera.freshdesk.com/en/support/solutions/articles/8000084036-your-own-html5-apps).

## Implementierungsaufgabe

1. **API-Abfrage:**
    - Implementiere einen Service, der die API-Endpunkte der Wiener Linien minütlich abfragt.
    - Verarbeite die zurückgegebenen Daten.

2. **Darstellung:**
    - Entwickle eine Anzeige, die die Abfahrtszeiten klar und ansprechend präsentiert.
    - Beispiel: Darstellung der Straßenbahnlinie, Zielhaltestelle und Dauer bis zur nächsten Abfahrt.

3. **Optionale Features:**
    - Verwendung von App-Settings mithilfe der @sklera/sdk.

## Entwicklungsanweisungen

### Einrichtung

1. **Projekt initialisieren:**
   ```bash
   npm install
   ```

2. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```

3. **Build erstellen:**
   ```bash
   npm run build
   ```

4. **Zip erstellen:**
    - Im Sklera CMS muss eine .zip Datei hochgeladen werden.
    - Komprimiere den Inhalt (NICHT den Ordner selbst) des Build-Ordners (dist) zu einer .zip Datei

## Weiterführende Links

- [Sklera HTML5 Apps](https://sklera.freshdesk.com/en/support/solutions/articles/8000084036-your-own-html5-apps)
- [@sklera/sdk Dokumentation](https://sklera.tv/js-sdk/docs/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
