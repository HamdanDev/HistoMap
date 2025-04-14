// src/App.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Optional: Fix default icon issues in Leaflet (if markers don’t show up)
// You can include this fix based on your setup environment.
// import L from 'leaflet';
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

function App() {
  const [events, setEvents] = useState([]);
  const [year, setYear] = useState(732); // default initial year

  // Fetch events from the backend filtering by the selected year
  const fetchEvents = async (year) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events?year=${year}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Call fetchEvents each time the year changes
  useEffect(() => {
    fetchEvents(year);
  }, [year]);

  return (
    <div className="App">
      <h1>Historical Map of Europe</h1>
      
      {/* Timeline Slider */}
      <div className="timeline">
        <label htmlFor="yearSlider">Select Year: {year}</label>
        <input
          id="yearSlider"
          type="range"
          min="500"
          max="2000"
          value={year}
          step="1"
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>
      
      {/* Map Section */}
      <MapContainer 
        center={[50, 10]}  // Center over Europe
        zoom={5} 
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
