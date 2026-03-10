const express = require("express");
const cors = require("cors");

const connectDB = require("../config/db");

const scrapeRoutes = require("../routes/scrape");
const analyticsRoutes = require("../routes/analytics");
const telemetryRoutes = require("../routes/telemetry");
const messageRoutes = require("../routes/messages");

const app = express();

// Allow all origins (for development)
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());

connectDB();

app.use("/api/scrape", scrapeRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/messages", messageRoutes);

module.exports = app;