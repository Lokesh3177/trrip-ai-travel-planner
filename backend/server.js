const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load Environment Variables
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



const allowedOrigins = [
  "http://localhost:5173",
  "https://trrip-ai-travel-planner.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman or server-to-server requests
      if (!origin) return callback(null, true);

      // Allow localhost
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow all Vercel preview deployments
      if (
        origin.endsWith(".vercel.app") &&
        origin.includes("trrip-ai-travel-planner")
      ) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy: Origin not allowed"));
    },
    credentials: true,
  })
);
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, mobile apps, etc.
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy: Origin not allowed"));
    },
    credentials: true,
  })
);

app.use(express.json());
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
  console.error("GLOBAL ERROR:", err);

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
        `🚀 Server running on port ${PORT} (${process.env.NODE_ENV || "development"})`
      );
    });
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer();