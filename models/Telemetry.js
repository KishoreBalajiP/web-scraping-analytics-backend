const mongoose = require("mongoose");

const TelemetrySchema = new mongoose.Schema({
  lastScrapeTime: Date,
  totalMessagesStored: Number,
  numberOfScrapes: Number,
  recordsInsertedLastRun: Number
});

module.exports = mongoose.model("Telemetry", TelemetrySchema);