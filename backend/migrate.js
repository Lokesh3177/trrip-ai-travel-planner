// migrate.js
require('dotenv').config();
const mongoose = require('mongoose');
const Itinerary = require('./models/Itinerary');

// Connect to your DB
mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Migration started...");
  
  // Find all trips that don't have a title
  const trips = await Itinerary.find({ title: { $exists: false } });
  
  for (let trip of trips) {
    // Generate the title based on existing data
    trip.title = trip.itinerary?.tripSummary || "Legacy Travel Ledger";
    await trip.save();
    console.log(`Updated: ${trip.title}`);
  }
  
  console.log(`Migration complete. Updated ${trips.length} trips.`);
  process.exit();
});