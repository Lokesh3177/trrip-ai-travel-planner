const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const itineraryRoutes = require(
  "./routes/itineraryRoutes"
);
const shareRoutes = require("./routes/shareRoutes");

// Load Environment Variables
dotenv.config();

// Create Express App
const app = express();



// Cloudinary
const cloudinary = require("./config/cloudinary");

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "trip travel api running",
  });
});



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/share", shareRoutes);
// 404 Route
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

// Server Start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `[SUCCESS] Server running in ${process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      `[CRITICAL] Database connection failed: ${error.message}`
    );
    process.exit(1);
  }
};

startServer();