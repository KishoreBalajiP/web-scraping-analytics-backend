const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({

  subject: {
    type: String
  },

  from: {
    type: String
  },

  snippet: {
    type: String
  },

  date: {
    type: Date
  }

}, { timestamps: true });

module.exports = mongoose.model("Mail", mailSchema);