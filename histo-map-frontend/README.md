# HistoMap Frontend

React + Leaflet frontend for the HistoMap historical atlas.

## Current UI

The app uses an atlas workspace layout:

```text
Header
Left filter panel | Center map | Right event drawer
Bottom timeline
```

Main features:

- Responsive historical atlas interface.
- Glassmorphism panels and smooth state transitions.
- Marker clustering with Leaflet-native custom cluster markers.
- Category-colored event markers.
- Rich popups with image, date, exact coordinates, confidence, Wikipedia links, and source links.
- Event drawer with selected record details.
- Timeline year navigation.
- Loading, empty, and error states.
- Search by keyword, title, person, or place.
- Theme switching.

## Themes

The visual system is driven by CSS variables in `src/styles/App.css`.

Available themes:

```text
Midnight Atlas
Archive Sepia
War Room
Museum Light
```

## Structure

```text
src/
  components/
    AppHeader.js
    ClusteredMarkers.js
    EventDrawer.js
    FilterPanel.js
    MapView.js
    SearchBox.js
    ThemeToggle.js
    Timeline.js
  data/
    categories.js
  hooks/
    useEvents.js
  services/
    eventApi.js
    EuropeanaService.js
    integrationInterfaces.js
    leafletIcons.js
    mapMarkers.js
    OpenHistoricalMapService.js
    searchService.js
    WikipediaService.js
  styles/
    App.css
    slider.css
```

## Environment

Create `histo-map-frontend/.env` from `.env.example`.

```text
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

No frontend API keys are required.

## Run

```powershell
npm.cmd install
npm.cmd start
```

Open:

```text
http://localhost:3000
```

The backend should be running at:

```text
http://localhost:5000
```

## Verify

```powershell
npm.cmd test -- --watchAll=false
npm.cmd run build
```

## Search

`SearchBox` supports four modes:

```text
Keyword  Search across title, description, category, date, source, and coordinates.
Title    Search event titles.
Person   Search person-oriented records and descriptions.
Place    Search titles, descriptions, Wikipedia URLs, and coordinates.
```

The filtering logic lives in `src/services/searchService.js`.

## Integration Services

Prepared service interfaces live in `src/services/`.

```text
WikipediaService.js             No-key Wikipedia search and summary methods.
EuropeanaService.js             Contract placeholder; production use normally needs an API key.
OpenHistoricalMapService.js     No-key URL/search contract placeholder.
integrationInterfaces.js        Shared normalized result interface.
```

These services are prepared for future expansion and are not required for the current core map flow.

## Roadmap Notes

Roadmap TODO comments are currently tracked in `searchService.js` for:

- AI recommendations.
- Historical routes.
- User favorites.
- Historical storytelling mode.
