const express = require("express");
const router = express.Router();


const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");


const {
  getUserItineraries,
  getItineraryById,
  deleteItinerary
} = require("../controllers/itineraryController");


const { uploadDocument } = require("../controllers/uploadController");


router.post("/upload", protect, upload.array("document", 10), uploadDocument);


router.get("/", protect, getUserItineraries);
router.get("/:id", protect, getItineraryById);
router.delete("/:id", protect, deleteItinerary);

module.exports = router;