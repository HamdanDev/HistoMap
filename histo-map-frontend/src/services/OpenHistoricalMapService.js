const OPEN_HISTORICAL_MAP_BASE = "https://www.openhistoricalmap.org";

export const OpenHistoricalMapService = {
  buildSearchUrl({ query }) {
    return `${OPEN_HISTORICAL_MAP_BASE}/search?query=${encodeURIComponent(query)}`;
  },

  async searchPlaces({ query }) {
    // TODO: Replace URL handoff with a stable OHM-compatible search API or
    // local backend proxy when the data contract is chosen.
    return {
      endpoint: this.buildSearchUrl({ query }),
      items: [],
      requiresApiKey: false,
    };
  },

  normalizePlace(place) {
    // TODO: Normalize OHM place geometry into event route waypoints.
    return {
      id: place?.id,
      title: place?.display_name || place?.name || "Historical place",
      latitude: place?.lat ? Number(place.lat) : null,
      longitude: place?.lon ? Number(place.lon) : null,
      source: place?.url || null,
    };
  },
};
