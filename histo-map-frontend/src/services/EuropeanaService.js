const EUROPEANA_API_BASE = "https://api.europeana.eu/record/v2/search.json";

export const EuropeanaService = {
  async searchPublicRecords({ query, limit = 12 }) {
    // TODO: Europeana production access normally uses an API key. Keep this
    // no-key interface as a contract until credentials/config are introduced.
    const params = new URLSearchParams({
      query,
      rows: limit,
      profile: "minimal",
    });

    return {
      endpoint: `${EUROPEANA_API_BASE}?${params.toString()}`,
      items: [],
      requiresApiKey: true,
    };
  },

  normalizeRecord(record) {
    // TODO: Map Europeana records into the app event/source card shape.
    return {
      id: record?.id,
      title: record?.title?.[0] || "Untitled Europeana record",
      image: record?.edmPreview?.[0] || null,
      source: record?.guid || null,
    };
  },
};
