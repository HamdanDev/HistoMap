# HistoMap Backend

Express API for fetching and normalizing historical event data from Wikidata.

## Structure

```text
queries/      SPARQL query builders
routes/       Express route handlers
services/     External API calls and response normalization
server.js     App setup and server entrypoint
```

## Environment

Create `histo-map-backend/.env` from `.env.example`.

```bash
PORT=5000
CORS_ORIGIN=http://localhost:3000
WIKIDATA_ENDPOINT=https://query.wikidata.org/sparql
WIKIDATA_USER_AGENT=HistoMap/1.0 (local development)
```

## Run

```bash
npm install
npm start
```

## API

### `GET /api/events`

Query parameters:

```text
year      Number. Defaults to 1000.
range     Number of years before and after year. Defaults to 10.
category  One category, comma-separated categories, or all. Defaults to all.
language  Wikipedia/label language code. Defaults to en.
limit     Maximum result count before dedupe. Defaults to 50, max 100.
```

Supported categories:

```text
battle, assassination, invention, factory, artwork, treaty, disaster,
revolution, monument, philosopher, scientist, artist, ruler, speech,
discovery, photo
```

Response shape:

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
