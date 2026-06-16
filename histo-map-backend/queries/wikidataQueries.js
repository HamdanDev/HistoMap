const CATEGORY_TYPES = {
  battle: ["wd:Q178561", "wd:Q180684"],
  assassination: ["wd:Q3882219"],
  invention: ["wd:Q11862829", "wd:Q1190554"],
  factory: ["wd:Q83405"],
  artwork: ["wd:Q838948", "wd:Q3305213"],
  treaty: ["wd:Q131569"],
  disaster: ["wd:Q3839081"],
  revolution: ["wd:Q10931"],
  monument: ["wd:Q4989906", "wd:Q839954"],
  philosopher: ["wd:Q4964182"],
  scientist: ["wd:Q901"],
  artist: ["wd:Q483501"],
  ruler: ["wd:Q12097", "wd:Q116"],
  speech: ["wd:Q2258974", "wd:Q861911"],
  discovery: ["wd:Q12772819", "wd:Q7138926"],
  photo: ["wd:Q125191", "wd:Q478798"],
};

const ROLE_CATEGORIES = new Set(["philosopher", "scientist", "artist", "ruler"]);

const getSupportedCategories = () => Object.keys(CATEGORY_TYPES);

const buildCategoryPattern = (category) => {
  const types = CATEGORY_TYPES[category];
  const values = types.join(" ");

  if (ROLE_CATEGORIES.has(category)) {
    return `{
      VALUES ?type { ${values} }
      ?event wdt:P106 ?type.
      BIND("${category}" AS ?category)
    }`;
  }

  return `{
    VALUES ?type { ${values} }
    ?event wdt:P31 ?type.
    BIND("${category}" AS ?category)
  }`;
};

const buildCategoryPatterns = (categories) =>
  categories.map(buildCategoryPattern).join("\n    UNION\n    ");

const padYear = (year) => String(year).padStart(4, "0");

const buildDateFilter = (minYear, maxYear) => {
  if (minYear < 1 || maxYear < 1) {
    return `FILTER(YEAR(?date) >= ${minYear} && YEAR(?date) <= ${maxYear})`;
  }

  return `
    FILTER(?date >= "${padYear(minYear)}-01-01T00:00:00Z"^^xsd:dateTime)
    FILTER(?date <= "${padYear(maxYear)}-12-31T23:59:59Z"^^xsd:dateTime)
  `;
};

const buildEventsQuery = ({ year, range, categories, language, limit }) => {
  const minYear = year - range;
  const maxYear = year + range;
  const categoryPatterns = buildCategoryPatterns(categories);
  const dateFilter = buildDateFilter(minYear, maxYear);

  return `
    SELECT DISTINCT
      ?event
      ?eventLabel
      ?eventDescription
      ?date
      ?coord
      ?image
      ?article
      ?category
    WHERE {
      ${categoryPatterns}

      ?event wdt:P625 ?coord.

      OPTIONAL { ?event wdt:P585 ?pointInTime. }
      OPTIONAL { ?event wdt:P580 ?startTime. }
      BIND(COALESCE(?pointInTime, ?startTime) AS ?date)

      FILTER(BOUND(?date))
      ${dateFilter}

      OPTIONAL { ?event wdt:P18 ?image. }
      OPTIONAL {
        ?article schema:about ?event;
                 schema:isPartOf <https://${language}.wikipedia.org/>.
      }

      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "${language},en".
      }
    }
    ORDER BY ?date
    LIMIT ${limit}
  `;
};

module.exports = {
  CATEGORY_TYPES,
  buildEventsQuery,
  getSupportedCategories,
};
