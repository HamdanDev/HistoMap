import L from "leaflet";
import { getCategoryColor } from "../data/categories";

export const getEventConfidence = (event) => {
  const signals = [
    Boolean(event.date || event.year),
    Number.isFinite(event.latitude) && Number.isFinite(event.longitude),
    Boolean(event.source),
    Boolean(event.wikipediaUrl),
    Boolean(event.image),
  ];
  const score = signals.filter(Boolean).length / signals.length;

  if (score >= 0.8) {
    return { label: "High", score };
  }

  if (score >= 0.55) {
    return { label: "Medium", score };
  }

  return { label: "Low", score };
};

export const createEventIcon = (event, isSelected = false) => {
  const color = getCategoryColor(event.category);
  const confidence = getEventConfidence(event);

  return L.divIcon({
    className: "event-marker-shell",
    html: `
      <span
        class="event-marker ${isSelected ? "selected" : ""}"
        style="--marker-color: ${color}; --confidence: ${confidence.score};"
      >
        <span class="event-marker-core"></span>
      </span>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -12],
  });
};

export const createClusterIcon = (cluster) =>
  L.divIcon({
    className: "cluster-marker-shell",
    html: `
      <span class="cluster-marker" style="--marker-color: ${cluster.color};">
        <strong>${cluster.events.length}</strong>
      </span>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
