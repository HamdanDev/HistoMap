import { MapContainer, TileLayer } from "react-leaflet";
import ClusteredMarkers from "./ClusteredMarkers";

const MapStateOverlay = ({ loading, error, isEmpty }) => {
  if (loading) {
    return (
      <div className="map-state glass-panel">
        <div className="loader" />
        <h2>Opening the archive</h2>
        <p>Gathering records from Wikidata for this year.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-state glass-panel state-error">
        <h2>Archive unavailable</h2>
        <p>Historical records could not be loaded. Try another filter set.</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="map-state glass-panel">
        <h2>No records found</h2>
        <p>Adjust the timeline, category, or search terms to widen the view.</p>
      </div>
    );
  }

  return null;
};

const tileLayers = {
  midnight: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
  sepia: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a>',
  },
  war: {
    url: "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
  museum: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
};

const MapView = ({
  events,
  loading,
  error,
  selectedEvent,
  onSelectEvent,
  theme,
}) => (
  <main className="map-view">
    <MapContainer center={[50, 10]} zoom={5} className="leaflet-map">
      <TileLayer
        key={theme}
        url={tileLayers[theme].url}
        attribution={tileLayers[theme].attribution}
      />

      <ClusteredMarkers
        events={events}
        selectedEvent={selectedEvent}
        onSelectEvent={onSelectEvent}
      />
    </MapContainer>

    <div className="map-vignette" />
    {selectedEvent && (
      <div className="selected-badge glass-panel">
        <span>{selectedEvent.category}</span>
        <strong>{selectedEvent.title}</strong>
      </div>
    )}
    <MapStateOverlay loading={loading} error={error} isEmpty={events.length === 0} />
  </main>
);

export default MapView;
