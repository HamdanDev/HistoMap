import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import TimelineSlider from './TimelineSlider';
import L from 'leaflet';

function App() {
  const [events, setEvents] = useState([]);
  const [year, setYear] = useState(732);

  // ✅ Fix default Leaflet marker icons ONCE inside component
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }, []);

  const fetchEvents = async (year) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events?year=${year}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(year);
  }, [year]);

  return (
    <div className="App">
      <h1>Historical Map of Europe</h1>

      <TimelineSlider
        minYear={500}
        maxYear={2025}
        currentYear={year}
        onChange={(value) => setYear(value)}
      />

      <MapContainer
        center={[50, 10]}
        zoom={5}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {events.map(event => (
          <Marker key={event.id} position={[event.latitude, event.longitude]}>
            <Popup>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <em>Year: {event.year}</em>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
