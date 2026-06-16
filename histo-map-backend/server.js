require("dotenv").config();

const express = require("express");
const cors = require("cors");
const eventsRoutes = require("./routes/eventsRoutes");

const app = express();
const port = process.env.PORT || 5000;
const corsOrigin = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: corsOrigin }));
app.use("/api/events", eventsRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
