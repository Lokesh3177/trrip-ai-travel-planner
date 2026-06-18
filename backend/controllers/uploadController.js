const Itinerary = require("../models/Itinerary");
const generateItinerary = require("../services/geminiService");
const extractPdfText = require("../services/pdfService");
const Tesseract = require("tesseract.js");

const uploadDocument = async (req, res) => {
  try {
    // Check uploaded files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one document.",
      });
    }

    let combinedText = "";
    const uploadedFiles = [];

    // Process every uploaded file
    for (const file of req.files) {
      let extractedText = "";

      try {
        // PDF
        if (file.mimetype === "application/pdf") {
          extractedText = await extractPdfText(file.path);
          
        }

        // Image
        else if (file.mimetype.startsWith("image/")) {
          const {
            data: { text },
          } = await Tesseract.recognize(file.path, "eng");

          extractedText = text;
        }

        // Unsupported
        else {
          console.log(`Skipping unsupported file: ${file.originalname}`);
          continue;
        }

        if (extractedText && extractedText.trim().length > 0) {
          combinedText += "\n\n";
          combinedText += `===== ${file.originalname} =====\n`;
          combinedText += extractedText;
        }

        uploadedFiles.push({
          url: file.path,
          originalName: file.originalname,
        });

      } catch (err) {
        console.log(`Error processing ${file.originalname}:`, err.message);
      }
    }

    // Validate extracted text
    if (combinedText.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract enough readable text from the uploaded documents.",
      });
    }

    // Generate AI itinerary
    const itinerary = await generateItinerary(combinedText);

    // Generate Title
    let tripTitle = "Travel Ledger";

    if (
      itinerary.flights &&
      itinerary.flights.length > 0
    ) {
      const flight = itinerary.flights[0];

      tripTitle = `${flight.departureAirport || "Departure"} → ${flight.arrivalAirport || "Arrival"
        }`;
    } else if (
      itinerary.tripSummary
    ) {
      tripTitle = itinerary.tripSummary.substring(0, 50);
    }

    // Save itinerary
    const savedItinerary = await Itinerary.create({
      user: req.user._id,

      title: tripTitle,

      files: uploadedFiles,

      extractedText: combinedText,

      itinerary,
    });

    return res.status(201).json({
      success: true,
      message: "Itinerary generated successfully.",
      data: savedItinerary,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
};