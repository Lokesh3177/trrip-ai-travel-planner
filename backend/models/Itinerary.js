const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ADD THIS FIELD
    title: {
      type: String,
      default: "New Travel Ledger",
    },
    files: [
      {
        url: { type: String, required: true },
        originalName: { type: String, required: true },
      },
    ],
    shareId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    extractedText: {
      type: String,
    },
    itinerary: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Itinerary", itinerarySchema);