# TRRIP AI – Smart Travel Itinerary Generator

<p align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />

<img src="https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white" />

<img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white" />

<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />

<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />

<img src="https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge" />

</p>

---

## Overview

TRRIP AI is an AI-powered MERN Stack application that converts travel documents into structured travel itineraries. Users can upload boarding passes, airline tickets, hotel bookings, and travel PDFs. The application extracts text using OCR and PDF parsing, processes it with AI, and generates an organized itinerary.

---

## Features

* Secure User Authentication (JWT)
* Upload Travel Documents
* OCR Text Extraction
* PDF Text Extraction
* AI Itinerary Generation
* Flight Information Detection
* Hotel Booking Detection
* Trip Dashboard
* Shareable Public Links
* Delete Trips
* Responsive Design

---

## Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Cloudinary
* Tesseract OCR
* pdf-parse
* Groq AI API

---

## Project Structure

```text
TRRIP-AI
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Lokesh3177/trrip-ai-travel-planner
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GROQ_API_KEY=
```

---

## Application Workflow

```text
Register/Login
      │
      ▼
Upload Travel Documents
      │
      ▼
OCR / PDF Extraction
      │
      ▼
Groq AI Processing
      │
      ▼
Generate Travel Itinerary
      │
      ▼
Save to MongoDB
      │
      ▼
View • Share • Delete
```

---

## Screenshots

Add screenshots here:

* Login
* Register
* Dashboard
* Upload
* Trip Details
* Shared View

---

## Future Improvements

* Calendar Integration
* Email Sharing
* Passport OCR
* Visa Detection
* AI Travel Recommendations
* Mobile Application

---

## Developer

**Lokesh M**

MERN Stack Developer

GitHub: https://github.com/Lokesh3177

LinkedIn: https://www.linkedin.com/in/lokeshm31/

---

## License

This project is intended for educational and portfolio purposes.
