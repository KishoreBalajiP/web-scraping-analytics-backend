const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: String,
  subject: String,
  category: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", MessageSchema);