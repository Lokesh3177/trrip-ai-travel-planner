const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { uploadDocument } = require("../controllers/uploadController"); // Destructured import

router.post(
  "/upload",
  protect,
  upload.array("document", 10),
  uploadDocument // Now this is definitely a function
);

module.exports = router;