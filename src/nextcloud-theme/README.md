
# Apple-Design Theme für Nextcloud

Ein modernes, elegantes Theme für Nextcloud, inspiriert vom minimalistischen und hochwertigen Design-Ansatz von Apple (macOS und iOS).

## Features

- **Minimalistisches UI**: Klare Strukturen, viel Weißraum und reduzierte UI-Elemente
- **Glassmorphism & Transparenz**: Verschwommene Hintergründe und glasartige UI-Elemente
- **Sanfte Animationen**: Smooth Scrolling, weiche Hover- und Click-Effekte
- **Dynamischer Dark Mode**: Automatische Anpassung an Systemeinstellungen
- **Apple-Design**: Typografie, Farbpalette und UI-Komponenten im Apple-Stil
- **Abgerundete Ecken & dezente Schatten**: Für ein modernes, wertiges Erscheinungsbild
- **Verbesserte Typografie**: Mit Apple SF Pro ähnlichen Schriften und optimiertem Spacing

## Installation

1. Lade das Repository herunter oder klone es in das `apps`-Verzeichnis deiner Nextcloud-Installation:
   ```
   cd /pfad/zu/nextcloud/apps/
   git clone https://your-repo-url/apple-design-theme.git theme-modern
   ```

2. Baue die Assets:
   ```
   cd theme-modern
   npm install
   npm run build
   ```

3. Aktiviere das Theme in Nextcloud:
   - Gehe zu Einstellungen > Apps
   - Klicke auf "Anpassung" Kategorie
   - Finde "Apple-Design Theme" und klicke auf "Aktivieren"

## Entwicklung

Für die Entwicklung kannst du den Watch-Modus verwenden, um Assets automatisch neu zu erstellen, wenn sich Dateien ändern:

```
npm run dev
```

### Struktur

- `appinfo/`: Enthält App-Metadaten und Initialisierungscode
- `css/`: Enthält SCSS und CSS-Dateien
- `js/`: Enthält kompiliertes JavaScript
- `src/`: Enthält Quell-JavaScript und Vue.js-Komponenten
- `lib/`: Enthält PHP-Klassen

## Anpassung

### CSS-Variablen

Dieses Theme verwendet umfangreich CSS-Variablen. Du kannst Farben, Schriften und andere visuelle Elemente durch Anpassung der Variablen in `css/style.scss` ändern.

### Vue-Komponenten

Für tiefere Anpassungen kannst du die Vue-Komponenten im Verzeichnis `src/components/` modifizieren oder neue erstellen. Die Komponenten können vorhandene Nextcloud-Komponenten überschreiben oder neue Funktionen hinzufügen.

## Dark Mode

Das Theme unterstützt automatisch den Dark Mode basierend auf den Systemeinstellungen des Benutzers. Zusätzlich wird ein manueller Toggle im Benutzermenü angezeigt, mit dem der Dark Mode unabhängig von Systemeinstellungen aktiviert werden kann.

## Kompatibilität

Dieses Theme wurde für Nextcloud-Versionen 25 bis 28 entwickelt und getestet. Es sollte mit allen Apps und Funktionen von Nextcloud kompatibel sein, da es keine grundlegenden Funktionen verändert, sondern nur die visuelle Darstellung anpasst.

## Architektur

Das Theme ist so konzipiert, dass es die Nextcloud-UI umfassend anpasst, ohne sich in den Core-Code zu integrieren, was für Updatesicherheit sorgt. Es verwendet:

1. **CSS/SCSS-Overrides**: Für globale Styling-Änderungen
2. **Vue.js-Komponenten-Overrides**: Für erweiterte UI-Anpassungen
3. **JavaScript-Hooks**: Für dynamische Anpassungen und Interaktionen

## Lizenz

AGPL-3.0

