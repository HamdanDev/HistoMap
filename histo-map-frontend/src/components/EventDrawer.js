import { getCategoryColor } from "../data/categories";
import { getEventConfidence } from "../services/mapMarkers";

const EventDrawer = ({ event, events, onSelectEvent }) => {
  const confidence = event ? getEventConfidence(event) : null;

  return (
    <aside className="event-drawer glass-panel">
      <div className="panel-heading">
        <span className="eyebrow">Selected Record</span>
        <h2>{event ? event.title : "Choose a map marker"}</h2>
      </div>

      {event ? (
        <article className="event-detail">
          {event.image ? (
            <img src={event.image} alt="" />
          ) : (
            <div className="image-placeholder">No image available</div>
          )}
          <div className="detail-badges">
            <span style={{ "--category-color": getCategoryColor(event.category) }}>
              {event.category || "record"}
            </span>
            <span className={`confidence confidence-${confidence.label.toLowerCase()}`}>
              {confidence.label} confidence
            </span>
          </div>
          <dl>
            <div>
              <dt>Date</dt>
              <dd>{event.date || event.year || "Unknown"}</dd>
            </div>
            <div>
              <dt>Exact coordinates</dt>
              <dd>
                {event.latitude.toFixed(5)}, {event.longitude.toFixed(5)}
              </dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>{event.source ? "Wikidata entity" : "Unavailable"}</dd>
            </div>
          </dl>
          {event.description && <p>{event.description}</p>}
          <div className="event-links">
            {event.wikipediaUrl && (
              <a href={event.wikipediaUrl} target="_blank" rel="noreferrer">
                Wikipedia
              </a>
            )}
            {event.source && (
              <a href={event.source} target="_blank" rel="noreferrer">
                Wikidata source
              </a>
            )}
            {event.image && (
              <a href={event.image} target="_blank" rel="noreferrer">
                Image source
              </a>
            )}
          </div>
        </article>
      ) : (
        <p className="drawer-empty">
          Select an event from the map or list to inspect its archival details.
        </p>
      )}

      <div className="event-list">
        <span className="eyebrow">Visible Records</span>
        {events.slice(0, 12).map((item) => (
          <button
            className={
              event?.id === item.id ? "event-list-item active" : "event-list-item"
            }
            key={item.id}
            type="button"
            onClick={() => onSelectEvent(item)}
            style={{ "--category-color": getCategoryColor(item.category) }}
          >
            <strong>{item.title}</strong>
            <span>{item.year || "Unknown year"}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default EventDrawer;
