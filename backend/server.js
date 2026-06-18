const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Database
const connectDB = require("./config/db");

// Initialize Cloudinary
require("./config/cloudinary");

// Routes
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const shareRoutes = require("./routes/shareRoutes");

// Create Express App
const app = express();



// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "TRRIP AI Travel Planner API is running 🚀",
  });
});



app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/share", shareRoutes);


app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Cannot find ${req.originalUrl}`,
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});



const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        ` Server running on port ${PORT} (${process.env.NODE_ENV || "development"})`
      );
    });
  } catch (error) {
    console.error(" Database Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer();