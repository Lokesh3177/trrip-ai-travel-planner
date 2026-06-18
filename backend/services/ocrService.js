const Tesseract = require("tesseract.js");

const extractImageText = async (imageUrl) => {
  try {
    const result = await Tesseract.recognize(
      imageUrl,
      "eng"
    );

    return result.data.text;
  } catch (error) {
    console.error("OCR ERROR:", error);
    throw new Error("Image text extraction failed");
  }
};

module.exports = extractImageText;