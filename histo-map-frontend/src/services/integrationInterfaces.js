export const HistoricalIntegrationTypes = {
  SEARCH: "search",
  SUMMARY: "summary",
  PLACE: "place",
  RECORD: "record",
};

export const createIntegrationResult = ({
  id,
  title,
  description = "",
  image = null,
  source = null,
  latitude = null,
  longitude = null,
  provider,
}) => ({
  id,
  title,
  description,
  image,
  source,
  latitude,
  longitude,
  provider,
});

// Interface contract for future integrations:
// service.search(params) => Promise<Array<IntegrationResult> | ServiceEnvelope>
// service.normalizeRecord(rawRecord) => IntegrationResult
// service.normalizePlace(rawPlace) => IntegrationResult
