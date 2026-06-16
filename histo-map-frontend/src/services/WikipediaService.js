const WIKIPEDIA_API_BASE = "https://en.wikipedia.org/w/api.php";

export const WikipediaService = {
  async search({ query, language = "en", limit = 10 }) {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      origin: "*",
      list: "search",
      srsearch: query,
      srlimit: limit,
    });

    // TODO: Add language-aware endpoint switching when multilingual search is wired.
    const response = await fetch(
      `${WIKIPEDIA_API_BASE.replace("en.", `${language}.`)}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Wikipedia search failed");
    }

    const data = await response.json();
    return data.query?.search || [];
  },

  async getPageSummary({ title, language = "en" }) {
    // TODO: Integrate summaries into event drawer storytelling cards.
    const response = await fetch(
      `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        title
      )}`
    );

    if (!response.ok) {
      throw new Error("Wikipedia summary failed");
    }

    return response.json();
  },
};
