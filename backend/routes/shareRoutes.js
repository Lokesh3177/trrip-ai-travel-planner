const express = require("express");
const router = express.Router();

const {
  getSharedItinerary,
} = require("../controllers/shareController");

router.get("/:shareId", getSharedItinerary);

module.exports = router;