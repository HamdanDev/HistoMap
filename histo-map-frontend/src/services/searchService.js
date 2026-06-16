const PERSON_CATEGORIES = new Set(["philosopher", "scientist", "artist", "ruler"]);

const normalize = (value) => String(value || "").toLowerCase();

const includesTerm = (values, term) =>
  values.filter(Boolean).some((value) => normalize(value).includes(term));

const getCoordinateText = (event) => {
  if (!Number.isFinite(event.latitude) || !Number.isFinite(event.longitude)) {
    return "";
  }

  return `${event.latitude.toFixed(5)}, ${event.longitude.toFixed(5)}`;
};

const getSearchValues = (event, mode) => {
  switch (mode) {
    case "title":
      return [event.title];
    case "person":
      return PERSON_CATEGORIES.has(event.category)
        ? [event.title, event.description, event.category]
        : [event.description];
    case "place":
      return [
        event.title,
        event.description,
        event.wikipediaUrl,
        getCoordinateText(event),
      ];
    case "keyword":
    default:
      return [
        event.title,
        event.description,
        event.category,
        event.date,
        event.year,
        event.wikipediaUrl,
        event.source,
        getCoordinateText(event),
      ];
  }
};

export const searchEvents = (events, { term, mode }) => {
  const normalizedTerm = normalize(term).trim();

  if (!normalizedTerm) {
    return events;
  }

  return events.filter((event) =>
    includesTerm(getSearchValues(event, mode), normalizedTerm)
  );
};

// Roadmap TODO: AI recommendations can use this search index plus user context
// to suggest related people, places, periods, and event chains.
// Roadmap TODO: Historical routes can reuse place and coordinate search to
// connect events into map paths.
// Roadmap TODO: User favorites should persist selected event ids and searches.
// Roadmap TODO: Historical storytelling mode can sequence filtered events into
// guided chapters with narration metadata.
