const express = require("express");
const {
  fetchEvents,
  getSupportedCategories,
} = require("../services/wikidataService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await fetchEvents(req.query);
    res.json(events);
  } catch (error) {
    console.error("Wikidata fetch failed:", error.message);
    res.status(500).json({
      error: "Failed to fetch data from Wikidata",
      supportedCategories: getSupportedCategories(),
    });
  }
});

module.exports = router;
