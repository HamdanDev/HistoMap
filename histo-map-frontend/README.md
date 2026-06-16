# HistoMap Frontend

React and Leaflet UI for exploring historical events on a map.

## Structure

```text
src/
  components/  Reusable map, slider, popup, and status UI
  data/        Static frontend data
  hooks/       React state and loading hooks
  services/    API calls and library setup helpers
  styles/      CSS files
```

## Environment

Create `histo-map-frontend/.env` from `.env.example`.

```bash
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## Run

```bash
npm install
npm start
```

## Verify

```bash
npm test -- --watchAll=false
npm run build
```
