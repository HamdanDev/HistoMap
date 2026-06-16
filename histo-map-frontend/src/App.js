import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./styles/App.css";
import "./styles/slider.css";
import AppHeader from "./components/AppHeader";
import EventDrawer from "./components/EventDrawer";
import FilterPanel from "./components/FilterPanel";
import MapView from "./components/MapView";
import Timeline from "./components/Timeline";
import { useEvents } from "./hooks/useEvents";
import { configureLeafletIcons } from "./services/leafletIcons";
import { searchEvents } from "./services/searchService";

const MIN_YEAR = 500;
const MAX_YEAR = 2025;
const INITIAL_YEAR = 732;
const THEMES = [
  { id: "midnight", label: "Midnight Atlas" },
  { id: "sepia", label: "Archive Sepia" },
  { id: "war", label: "War Room" },
  { id: "museum", label: "Museum Light" },
];

function App() {
  const [theme, setTheme] = useState("midnight");
  const [year, setYear] = useState(INITIAL_YEAR);
  const [previewYear, setPreviewYear] = useState(INITIAL_YEAR);
  const [category, setCategory] = useState("battle");
  const [range, setRange] = useState(10);
  const [language, setLanguage] = useState("en");
  const [limit, setLimit] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState("keyword");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filters = useMemo(
    () => ({ year, range, category, language, limit }),
    [year, range, category, language, limit]
  );
  const { events, loading, error } = useEvents(filters);

  const visibleEvents = useMemo(() => {
    return searchEvents(events, { term: searchTerm, mode: searchMode });
  }, [events, searchTerm, searchMode]);

  useEffect(() => {
    configureLeafletIcons();
  }, []);

  useEffect(() => {
    setSelectedEvent((currentEvent) => {
      if (!currentEvent) {
        return visibleEvents[0] || null;
      }

      return visibleEvents.some((event) => event.id === currentEvent.id)
        ? currentEvent
        : visibleEvents[0] || null;
    });
  }, [visibleEvents]);

  return (
    <div className={`atlas-app theme-${theme}`}>
      <AppHeader
        searchTerm={searchTerm}
        searchMode={searchMode}
        onSearchChange={setSearchTerm}
        onSearchModeChange={setSearchMode}
        themes={THEMES}
        theme={theme}
        onThemeChange={setTheme}
      />

      <div className="atlas-layout">
        <FilterPanel
          category={category}
          range={range}
          language={language}
          limit={limit}
          eventCount={visibleEvents.length}
          onCategoryChange={setCategory}
          onRangeChange={setRange}
          onLanguageChange={setLanguage}
          onLimitChange={setLimit}
        />

        <MapView
          events={visibleEvents}
          loading={loading}
          error={error}
          selectedEvent={selectedEvent}
          onSelectEvent={setSelectedEvent}
          theme={theme}
        />

        <EventDrawer
          event={selectedEvent}
          events={visibleEvents}
          onSelectEvent={setSelectedEvent}
        />
      </div>

      <Timeline
        year={year}
        previewYear={previewYear}
        minYear={MIN_YEAR}
        maxYear={MAX_YEAR}
        onYearChange={setYear}
        onPreviewYearChange={setPreviewYear}
      />
    </div>
  );
}

export default App;
