require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateItinerary = async (extractedText) => {
  try {
    const prompt = `
You are an expert AI Travel Document Parser.

Analyze the travel document text carefully.

Return ONLY valid JSON.

Do not return markdown.
Do not explain anything.

If a field is unavailable return null.

If the uploaded document is only a flight ticket, keep hotel values null.

If the uploaded document is only a hotel booking, keep flight values null.

If importantNotes are missing, generate useful travel reminders based on the travel type.

Return EXACTLY this JSON structure:

{
  "tripSummary":"string",

  "travelDates":"string",

  "flights":[
    {
      "passenger":"string or null",
      "airline":"string or null",
      "flightNumber":"string or null",

      "departureCity":"string or null",
      "arrivalCity":"string or null",

      "departureAirport":"string or null",
      "arrivalAirport":"string or null",

      "departureDate":"string or null",

      "departureTime":"string or null",
      "arrivalTime":"string or null",

      "seat":"string or null",
      "gate":"string or null",
      "terminal":"string or null",

      "bookingReference":"string or null",

      "class":"string or null",

      "baggage":"string or null"
    }
  ],

  "hotels":[
    {
      "hotelName":"string or null",
      "address":"string or null",
      "city":"string or null",

      "checkIn":"string or null",
      "checkOut":"string or null",

      "confirmationNumber":"string or null"
    }
  ],

  "importantNotes":[
    "string"
  ]
}

Generate importantNotes like these whenever applicable:

- Arrive at the airport at least 2 hours before departure.
- Carry a valid government-issued ID.
- Verify your departure gate before boarding.
- Keep your booking reference available.
- Check baggage allowance before departure.
- Reach the boarding gate before boarding closes.
- Carry hotel booking confirmation while checking in.
- Verify check-in and check-out timings.

Travel Document:

${extractedText}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return JSON.parse(
      completion.choices[0].message.content
    );
  } catch (error) {
    console.error("Groq Extraction Error:", error);
    throw error;
  }
};

module.exports = generateItinerary;