const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      default: "No Subject",
      index: true
    },

    from: {
      type: String,
      default: "Unknown Sender",
      index: true
    },

    snippet: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    date: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.Mail ||
  mongoose.model("Mail", mailSchema);