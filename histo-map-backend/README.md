# HistoMap Backend

Express API for fetching, normalizing, and serving historical event data from Wikidata SPARQL.

## Responsibilities

- Parse event query parameters.
- Build category-aware Wikidata SPARQL queries.
- Fetch records from Wikidata Query Service.
- Normalize dates, coordinates, images, Wikipedia URLs, source URLs, and categories.
- Deduplicate repeated Wikidata entities.
- Return frontend-ready event objects.

## Structure

```text
queries/
  wikidataQueries.js    Category definitions and SPARQL builders
routes/
  eventsRoutes.js       GET /api/events route
services/
  wikidataService.js    Fetching, parsing, normalization, and validation
server.js               Express app entrypoint
```

## Environment

Create `histo-map-backend/.env` from `.env.example`.

```text
PORT=5000
CORS_ORIGIN=http://localhost:3000
WIKIDATA_ENDPOINT=https://query.wikidata.org/sparql
WIKIDATA_USER_AGENT=HistoMap/1.0 (local development)
```

`WIKIDATA_USER_AGENT` is included because Wikidata Query Service can reject generic clients.

No API keys are required.

## Run

```powershell
npm.cmd install
npm.cmd start
```

Server URL:

```text
http://localhost:5000
```

## API

### `GET /api/events`

Query parameters:

```text
year      Number. Defaults to 1000.
range     Years before and after the requested year. Defaults to 10.
category  One category, comma-separated categories, or all. Defaults to all.
language  Wikidata label and Wikipedia article language. Defaults to en.
limit     Result limit before dedupe. Defaults to 50, max 100.
```

Example:

```text
GET /api/events?year=1066&range=5&category=battle&language=en&limit=10
```

Supported categories:

```text
battle
assassination
invention
factory
artwork
treaty
disaster
revolution
monument
philosopher
scientist
artist
ruler
speech
discovery
photo
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

## Wikidata Fields

The query engine uses:

```text
P625  coordinates
P18   image
P585  point in time
P580  start time
P31   instance of
P106  occupation, for person-oriented categories
```

## Verify

Server load check:

```powershell
node -e "require('./server'); setTimeout(() => process.exit(0), 1000)"
```

Live Wikidata service check:

```powershell
node -e "const { fetchEvents } = require('./services/wikidataService'); fetchEvents({ year: '1066', range: '5', category: 'battle', language: 'en', limit: '5' }).then(events => console.log(events)).catch(error => { console.error(error.message); process.exit(1); });"
```
