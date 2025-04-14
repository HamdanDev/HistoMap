const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/events", async (req, res) => {
  const year = parseInt(req.query.year) || 1000;

  const sparqlQuery = `
    SELECT ?event ?eventLabel ?date ?coord WHERE {
      ?event wdt:P31 wd:Q178561;  # military conflict
             wdt:P625 ?coord;
             wdt:P585 ?date.
      FILTER(YEAR(?date) >= ${year - 10} && YEAR(?date) <= ${year + 10})
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    LIMIT 50
  `;

  const encodedQuery = encodeURIComponent(sparqlQuery);
  const url = `https://query.wikidata.org/sparql?query=${encodedQuery}`;
  const headers = { Accept: "application/sparql-results+json" };

  try {
    const response = await axios.get(url, { headers });
    const results = response.data.results.bindings;

    const events = results
      .map((item, index) => {
        const coordString = item.coord.value;

        const match = item.coord.value.match(
          /Point\((-?\d+\.?\d*) (-?\d+\.?\d*)\)/
        );

        if (!match || match.length < 3) {
          console.warn("⚠️ Invalid coordinate:", coordString);
          return null;
        }

        const lon = parseFloat(match[1]);
        const lat = parseFloat(match[2]);

        return {
          id: index,
          title: item.eventLabel?.value || 'Unnamed battle',
          description: `Battle on ${item.date.value.split('T')[0]}`,
          year: parseInt(item.date.value.split('-')[0]),
          latitude: lat,
          longitude: lon,
          category: 'battle'
        };
      }).filter(e => e !== null);

    res.json(events);
  } catch (error) {
    console.error("❌ Wikidata fetch failed:", error.message);
    res.status(500).json({ error: "Failed to fetch data from Wikidata" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
