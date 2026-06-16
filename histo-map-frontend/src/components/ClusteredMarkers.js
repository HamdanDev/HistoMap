import { useMemo, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { getCategoryColor } from "../data/categories";
import {
  createClusterIcon,
  createEventIcon,
  getEventConfidence,
} from "../services/mapMarkers";

const getClusterRadius = (zoom) => {
  if (zoom >= 8) {
    return 0;
  }

  return Math.max(0.35, 8 / Math.pow(1.55, zoom));
};

const getDominantCategory = (events) => {
  const counts = events.reduce((summary, event) => {
    const category = event.category || "all";
    summary[category] = (summary[category] || 0) + 1;
    return summary;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "all";
};

const buildClusters = (events, zoom) => {
  const radius = getClusterRadius(zoom);

  if (radius === 0) {
    return events.map((event) => ({
      id: event.id,
      latitude: event.latitude,
      longitude: event.longitude,
      events: [event],
      color: getCategoryColor(event.category),
    }));
  }

  return events.reduce((clusters, event) => {
    const existingCluster = clusters.find((cluster) => {
      const latDistance = Math.abs(cluster.latitude - event.latitude);
      const lngDistance = Math.abs(cluster.longitude - event.longitude);
      return latDistance <= radius && lngDistance <= radius;
    });

    if (existingCluster) {
      const nextCount = existingCluster.events.length + 1;
      existingCluster.latitude =
        (existingCluster.latitude * existingCluster.events.length + event.latitude) /
        nextCount;
      existingCluster.longitude =
        (existingCluster.longitude * existingCluster.events.length + event.longitude) /
        nextCount;
      existingCluster.events.push(event);
      existingCluster.color = getCategoryColor(
        getDominantCategory(existingCluster.events)
      );
      return clusters;
    }

    clusters.push({
      id: event.id,
      latitude: event.latitude,
      longitude: event.longitude,
      events: [event],
      color: getCategoryColor(event.category),
    });
    return clusters;
  }, []);
};

const EventPopupContent = ({ event }) => {
  const confidence = getEventConfidence(event);

  return (
    <div className="map-popup rich-popup">
      {event.image && <img src={event.image} alt="" />}
      <div>
        <span className="popup-category" style={{ "--category-color": getCategoryColor(event.category) }}>
          {event.category || "record"}
        </span>
        <strong>{event.title}</strong>
        <p>{event.description || "No description available."}</p>
      </div>
      <dl>
        <div>
          <dt>Date</dt>
          <dd>{event.date || event.year || "Unknown"}</dd>
        </div>
        <div>
          <dt>Coordinates</dt>
          <dd>
            {event.latitude.toFixed(5)}, {event.longitude.toFixed(5)}
          </dd>
        </div>
        <div>
          <dt>Confidence</dt>
          <dd>{confidence.label}</dd>
        </div>
      </dl>
      <div className="popup-links">
        {event.wikipediaUrl && (
          <a href={event.wikipediaUrl} target="_blank" rel="noreferrer">
            Wikipedia
          </a>
        )}
        {event.source && (
          <a href={event.source} target="_blank" rel="noreferrer">
            Source
          </a>
        )}
      </div>
    </div>
  );
};

const ClusterPopupContent = ({ events, onSelectEvent }) => (
  <div className="map-popup cluster-popup">
    <strong>{events.length} records in this area</strong>
    {events.slice(0, 6).map((event) => (
      <button key={event.id} type="button" onClick={() => onSelectEvent(event)}>
        <span style={{ "--category-color": getCategoryColor(event.category) }} />
        {event.title}
      </button>
    ))}
  </div>
);

const ClusteredMarkers = ({ events, selectedEvent, onSelectEvent }) => {
  const [zoom, setZoom] = useState(5);

  useMapEvents({
    zoomend: (event) => setZoom(event.target.getZoom()),
  });

  const clusters = useMemo(() => buildClusters(events, zoom), [events, zoom]);

  return clusters.map((cluster) => {
    const isCluster = cluster.events.length > 1;
    const event = cluster.events[0];

    if (isCluster) {
      return (
        <Marker
          icon={createClusterIcon(cluster)}
          key={`cluster-${cluster.latitude}-${cluster.longitude}-${cluster.events.length}`}
          position={[cluster.latitude, cluster.longitude]}
        >
          <Popup>
            <ClusterPopupContent
              events={cluster.events}
              onSelectEvent={onSelectEvent}
            />
          </Popup>
        </Marker>
      );
    }

    return (
      <Marker
        icon={createEventIcon(event, selectedEvent?.id === event.id)}
        key={`${event.id}-${event.latitude}-${event.longitude}`}
        position={[event.latitude, event.longitude]}
        eventHandlers={{ click: () => onSelectEvent(event) }}
      >
        <Popup>
          <EventPopupContent event={event} />
        </Popup>
      </Marker>
    );
  });
};

export default ClusteredMarkers;
