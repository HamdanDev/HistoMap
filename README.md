# HistoMap

HistoMap is a full-stack historical atlas for exploring Wikidata events on an interactive map of Europe. The app combines a React + Leaflet frontend with an Express backend that builds SPARQL queries, normalizes Wikidata records, and exposes them through a simple API.

## Features

- Interactive Leaflet map with marker clustering.
- Historical event categories including battles, treaties, inventions, artists, scientists, rulers, discoveries, and more.
- Four atlas themes: Midnight Atlas, Archive Sepia, War Room, and Museum Light.
- Category-colored markers, rich popups, event images, source links, exact coordinates, and confidence indicators.
- Search by keyword, title, person, or place.
- Timeline, filter panel, event drawer, loading state, empty state, and error state.
- Prepared frontend integration services for Wikipedia, Europeana, and OpenHistoricalMap.

## Project Structure

```text
.
|-- histo-map-backend/
|   |-- queries/       SPARQL query builders
|   |-- routes/        Express route handlers
|   |-- services/      Wikidata fetching and normalization
|   |-- server.js
|   `-- .env.example
|-- histo-map-frontend/
|   |-- src/
|   |   |-- components/ Reusable UI components
|   |   |-- data/       Static category/theme metadata
|   |   |-- hooks/      React loading hooks
|   |   |-- services/   API, search, map, and integration services
|   |   `-- styles/     CSS variables and UI styles
|   `-- .env.example
|-- .env.example
`-- README.md
```

## Environment

Create local env files from the examples:

```powershell
Copy-Item .env.example .env
Copy-Item histo-map-backend\.env.example histo-map-backend\.env
Copy-Item histo-map-frontend\.env.example histo-map-frontend\.env
```

Key variables:

```text
PORT=5000
CORS_ORIGIN=http://localhost:3000
WIKIDATA_ENDPOINT=https://query.wikidata.org/sparql
WIKIDATA_USER_AGENT=HistoMap/1.0 (local development)
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

No API keys are required for the current app.

## Clean Install

From the repo root:

```powershell
Remove-Item -Recurse -Force histo-map-backend\node_modules, histo-map-frontend\node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force histo-map-frontend\build -ErrorAction SilentlyContinue

cd histo-map-backend
npm.cmd install

cd ..\histo-map-frontend
npm.cmd install
```

## Run Locally

Start the backend in one terminal:

```powershell
cd histo-map-backend
npm.cmd start
```

Start the frontend in another terminal:

```powershell
cd histo-map-frontend
npm.cmd start
```

Open:

```text
http://localhost:3000
```

Backend API:

```text
http://localhost:5000/api/events
```

## API

### `GET /api/events`

Query parameters:

```text
year      Number. Defaults to 1000.
range     Years before and after year. Defaults to 10.
category  One category, comma-separated categories, or all.
language  Wikidata/Wikipedia language code. Defaults to en.
limit     Result limit before dedupe. Defaults to 50, max 100.
```

Example:

```text
GET /api/events?year=1066&range=10&category=battle&language=en&limit=25
```

Response object:

```json
{
  "id": "Q3353388",
  "title": "Battle of Nisa",
  "description": "1062 battle",
  "date": "1062-08-15",
  "year": 1062,
  "latitude": 56.683333333,
  "longitude": 12.866666666,
  "image": "http://commons.wikimedia.org/wiki/Special:FilePath/example.jpg",
  "wikipediaUrl": "https://en.wikipedia.org/wiki/example",
  "source": "http://www.wikidata.org/entity/Q3353388",
  "category": "battle"
}
```

Supported categories:

```text
battle, assassination, invention, factory, artwork, treaty, disaster,
revolution, monument, philosopher, scientist, artist, ruler, speech,
discovery, photo
```

## Verify

Frontend:

```powershell
cd histo-map-frontend
npm.cmd test -- --watchAll=false
npm.cmd run build
```

Backend:

```powershell
cd histo-map-backend
node -e "require('./server'); setTimeout(() => process.exit(0), 1000)"
```

## Roadmap

- AI recommendations.
- Historical routes.
- User favorites.
- Historical storytelling mode.
