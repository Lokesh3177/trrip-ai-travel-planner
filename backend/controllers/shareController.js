const Itinerary = require("../models/Itinerary");

const getSharedItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      shareId: req.params.shareId,
    }).select("-extractedText");

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
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSharedItinerary,
};