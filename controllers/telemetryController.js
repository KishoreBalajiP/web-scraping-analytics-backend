const Telemetry = require("../models/Telemetry");

exports.getTelemetry = async (req, res) => {

  const telemetry = await Telemetry.findOne();

  res.json(telemetry);

};