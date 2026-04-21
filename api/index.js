const express = require("express");
const cors = require("cors");

const connectDB = require("../config/db");
const mailRoutes = require("../routes/mailRoutes");

const app = express();

/*
Connect MongoDB
*/
connectDB();

/*
Enable CORS
*/
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

/*
Parse JSON
*/
app.use(express.json());

/*
Root Route (Health Check)
*/
app.get("/", (req, res) => {
  res.json({
    status: "Gmail Scraper API Running",
    endpoints: [
      "/api/mail/fetch",
      "/api/mail/search/:keyword"
    ]
  });
});

/*
API Routes
*/

app.use("/api/mail", mailRoutes);

/*
404 Handler
*/

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

module.exports = app;