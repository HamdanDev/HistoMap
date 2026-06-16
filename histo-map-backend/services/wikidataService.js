const axios = require("axios");
const {
  buildEventsQuery,
  getSupportedCategories,
} = require("../queries/wikidataQueries");

const WIKIDATA_ENDPOINT =
  process.env.WIKIDATA_ENDPOINT || "https://query.wikidata.org/sparql";
const WIKIDATA_USER_AGENT =
  process.env.WIKIDATA_USER_AGENT || "HistoMap/1.0 (local development)";

const DEFAULT_YEAR = 1000;
const DEFAULT_RANGE = 10;
const DEFAULT_LANGUAGE = "en";
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const parseInteger = (value, fallback) => {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const sanitizeLanguage = (language) => {
  const normalized = String(language || DEFAULT_LANGUAGE).toLowerCase();
  return /^[a-z-]{2,12}$/.test(normalized) ? normalized : DEFAULT_LANGUAGE;
};

const parseCategories = (category) => {
  const supportedCategories = getSupportedCategories();

  if (!category || category === "all") {
    return supportedCategories;
  }

  return String(category)
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter((value) => supportedCategories.includes(value));
};

const parseEventOptions = (query) => {
  const categories = parseCategories(query.category);

  return {
    year: parseInteger(query.year, DEFAULT_YEAR),
    range: clamp(parseInteger(query.range, DEFAULT_RANGE), 0, 500),
    categories,
    language: sanitizeLanguage(query.language),
    limit: clamp(parseInteger(query.limit, DEFAULT_LIMIT), 1, MAX_LIMIT),
  };
};

const parseCoordinate = (coordValue) => {
  const match = coordValue?.match(/Point\((-?\d+\.?\d*) (-?\d+\.?\d*)\)/);

  if (!match || match.length < 3) {
    return null;
  }

  return {
    longitude: parseFloat(match[1]),
    latitude: parseFloat(match[2]),
  };
};

const normalizeDate = (dateValue) => {
  if (!dateValue) {
    return null;
  }

  return dateValue.split("T")[0].replace(/^\+/, "");
};

const parseYear = (date) => {
  if (!date) {
    return null;
  }

  return parseInt(date, 10);
};

const getEntityId = (entityUrl, fallbackId) => {
  if (!entityUrl) {
    return fallbackId;
  }

  return entityUrl.split("/").pop() || fallbackId;
};

const normalizeEvent = (item, index) => {
  const coordinates = parseCoordinate(item.coord?.value);

  if (!coordinates) {
    console.warn("Invalid coordinate:", item.coord?.value);
    return null;
  }

  const date = normalizeDate(item.date?.value);

  return {
    id: getEntityId(item.event?.value, String(index)),
    title: item.eventLabel?.value || "Untitled event",
    description: item.eventDescription?.value || "",
    date,
    year: parseYear(date),
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    image: item.image?.value || null,
    wikipediaUrl: item.article?.value || null,
    source: item.event?.value || "Wikidata",
    category: item.category?.value || null,
  };
};

const uniqueById = (events) => {
  const seen = new Set();

  return events.filter((event) => {
    if (seen.has(event.id)) {
      return false;
    }

    seen.add(event.id);
    return true;
  });
};

const fetchEvents = async (query = {}) => {
  const options = parseEventOptions(query);

  if (options.categories.length === 0) {
    return [];
  }

  const sparqlQuery = buildEventsQuery(options);
  const response = await axios.get(WIKIDATA_ENDPOINT, {
    params: { query: sparqlQuery, format: "json" },
    headers: {
      Accept: "application/sparql-results+json",
      "User-Agent": WIKIDATA_USER_AGENT,
    },
  });

  const events = response.data.results.bindings
    .map(normalizeEvent)
    .filter((event) => event !== null);

  return uniqueById(events);
};

module.exports = {
  fetchEvents,
  getSupportedCategories,
  parseEventOptions,
};
