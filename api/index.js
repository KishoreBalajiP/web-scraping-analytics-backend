const express = require("express");
const cors = require("cors");

const connectDB = require("../config/db");

const scrapeRoutes = require("../routes/scrape");
const analyticsRoutes = require("../routes/analytics");
const telemetryRoutes = require("../routes/telemetry");
const messageRoutes = require("../routes/messages");

const app = express();

// Connect MongoDB
connectDB();

// Enable CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests
app.options("*", cors());

// Parse JSON
app.use(express.json());

/*
Root Route (Health Check)
*/
app.get("/", (req, res) => {
  res.json({
    status: "Web Scraping Analytics API Running",
    endpoints: [
      "/api/scrape",
      "/api/messages",
      "/api/analytics",
      "/api/telemetry"
    ]
  });
});

/*
API Routes
*/

app.use("/api/scrape", scrapeRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/messages", messageRoutes);

/*
404 Handler
*/

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

module.exports = app;