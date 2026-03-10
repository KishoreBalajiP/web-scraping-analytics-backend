const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const scrapeRoutes = require("./routes/scrape");
const analyticsRoutes = require("./routes/analytics");
const telemetryRoutes = require("./routes/telemetry");
const messageRoutes = require("./routes/messages");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/scrape", scrapeRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});