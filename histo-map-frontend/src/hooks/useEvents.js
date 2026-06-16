import { useEffect, useState } from "react";
import { fetchEvents } from "../services/eventApi";

export const useEvents = (filters) => {
  const { year, range, category, language, limit } = filters;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchEvents({ year, range, category, language, limit });

        if (isMounted) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);

        if (isMounted) {
          setEvents([]);
          setError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, [year, range, category, language, limit]);

  return { events, loading, error };
};
