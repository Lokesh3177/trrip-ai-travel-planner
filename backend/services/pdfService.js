const axios = require("axios");
const pdf = require("pdf-parse");

const extractPdfText = async (pdfUrl) => {
  try {
    const response = await axios.get(pdfUrl, {
      responseType: "arraybuffer",
    });

    const data = await pdf(response.data);

    return data.text;
  } catch (error) {
    console.error("PDF ERROR:", error);
    throw error;
  }
};

module.exports = extractPdfText;