# 🌍 HistoMap — Interactive Historical Timeline Map

HistoMap is a full-stack web app that displays historical events (e.g. battles, philosophers, inventions) on an interactive map of Europe. Users can browse through time using a slider to explore humanity's past, visually.

Built with:
- 🖥️ React + Leaflet for the frontend
- ⚙️ Node.js + Express backend
- 🌐 Wikidata SPARQL as a live external data source (no local DB)

---

## 📸 Preview

![screenshot](docs/preview.png) <!-- Add an image here later if you have one -->

---

## 📁 Project Structure

```bash
.
├── client/         # React frontend
│   └── src/
│       └── App.js  # Map + year slider
├── server/         # Node.js backend (Wikidata proxy)
│   └── server.js
├── .gitignore
├── README.md
