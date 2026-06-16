const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export const fetchEvents = async ({
  year,
  range,
  category,
  language,
  limit,
}) => {
  const params = new URLSearchParams({
    year,
    range,
    category,
    language,
    limit,
  });

  const response = await fetch(`${API_BASE_URL}/events?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
};
