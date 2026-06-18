const Itinerary = require("../models/Itinerary");

const getUserItineraries = async (req, res) => {
  try {
    // Ensure auth middleware is passing the user
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user found" });
    }

    // Fetch and explicitly handle potential schema errors
    const itineraries = await Itinerary.find({ user: req.user._id })
      .select("-extractedText")
      .sort({ createdAt: -1 })
      .lean(); // .lean() makes this faster and avoids Mongoose hydration issues

    res.status(200).json({
      success: true,
      count: itineraries.length,
      data: itineraries,
    });
  } catch (error) {
    console.error("DATABASE FETCH ERROR:", error); // THE REAL ERROR IS HERE
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    res.status(200).json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Itinerary deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUserItineraries,
  getItineraryById,
    deleteItinerary,
};