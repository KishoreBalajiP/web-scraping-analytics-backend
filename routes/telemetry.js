const router = require("express").Router();
const { getTelemetry } = require("../controllers/telemetryController");

router.get("/", getTelemetry);

module.exports = router;