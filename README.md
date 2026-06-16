# HistoMap

HistoMap is a full-stack app that displays historical events on an interactive map of Europe. The frontend is built with React and Leaflet, and the backend proxies event data from Wikidata SPARQL.

## Project Structure

```text
.
├── histo-map-backend/
│   ├── queries/      # SPARQL query builders
│   ├── routes/       # Express route handlers
│   ├── services/     # External API calls and data normalization
│   ├── server.js
│   └── .env.example
├── histo-map-frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── data/       # Static frontend data
│   │   ├── hooks/      # React data/loading hooks
│   │   ├── services/   # API and library setup helpers
│   │   └── styles/     # App and component styles
│   └── .env.example
├── .env.example
└── README.md
```

## Environment

Copy the example files before running locally:

```bash
cp .env.example .env
cp histo-map-backend/.env.example histo-map-backend/.env
cp histo-map-frontend/.env.example histo-map-frontend/.env
```

Key variables:

```bash
PORT=5000
CORS_ORIGIN=http://localhost:3000
WIKIDATA_ENDPOINT=https://query.wikidata.org/sparql
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## Getting Started

Install dependencies:

```bash
cd histo-map-backend
npm install

cd ../histo-map-frontend
npm install
```

Run the backend:

```bash
cd histo-map-backend
npm start
```

Run the frontend in a second terminal:

```bash
cd histo-map-frontend
npm start
```

Open http://localhost:3000.

## API

### `GET /api/events?year=1066`

Returns historical battle events within roughly 10 years of the requested year.

```json
[
  {
    "id": 0,
    "title": "Battle of Hastings",
    "description": "Battle on 1066-10-14",
    "year": 1066,
    "latitude": 50.9119,
    "longitude": 0.4875,
    "category": "battle"
  }
]
```

## Architecture Notes

- UI components do not call APIs directly.
- `useEvents` owns event-loading state for the frontend.
- `eventApi` owns frontend HTTP calls.
- Backend routes stay thin and delegate data fetching to services.
- Wikidata query text is isolated in `queries/`.

## Scripts

Backend:

```bash
npm start
```

Frontend:

```bash
npm start
npm test
npm run build
```
