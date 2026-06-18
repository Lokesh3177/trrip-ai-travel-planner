````markdown
# ✈️ TRRIP AI – Smart Travel Itinerary Generator

<p align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge"/>

</p>

<p align="center">

AI-powered MERN Stack application that extracts travel information from flight tickets and hotel bookings to automatically generate structured travel itineraries.

</p>

---

# 📖 Project Overview

TRRIP AI is an AI-powered travel itinerary management system built using the MERN Stack. The application allows users to upload travel documents such as flight tickets, hotel booking confirmations, and travel-related PDFs or images.

Using OCR, PDF parsing, and Groq AI, the system extracts important travel information and automatically generates a structured itinerary. Users can securely manage, share, and organize all their travel plans from a single dashboard.

---

# ✨ Features

- 🔐 Secure User Registration & Login (JWT Authentication)
- 📄 Upload Flight Tickets, Hotel Bookings & Travel Documents
- 🖼️ OCR Text Extraction using Tesseract OCR
- 📑 PDF Text Extraction
- 🤖 AI-Powered Itinerary Generation using Groq AI
- ✈️ Automatic Flight Information Extraction
- 🏨 Automatic Hotel Booking Information Extraction
- 📋 Dashboard for Trip Management
- 📂 Store and Manage Travel Itineraries
- 👁️ View Complete Trip Details
- 🔗 Share Trips using Public Links
- 🗑️ Delete Trips
- ☁️ Cloudinary File Storage
- 📱 Fully Responsive User Interface

---

# 🛠️ Technology Stack

## 🎨 Frontend

- ⚛️ React.js
- ⚡ Vite
- 🎨 Tailwind CSS
- 🌐 Axios
- 🧭 React Router DOM
- 🎯 React Icons

## ⚙️ Backend

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 📦 Mongoose
- 🔐 JWT Authentication
- 📤 Multer
- ☁️ Cloudinary
- 🔍 Tesseract OCR
- 📄 pdf-parse
- 🤖 Groq AI API

---

# 📂 Project Structure

```text
TRRIP-AI
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── package.json
│   └── server.js
│
├── screenshots
│   ├── register.png
│   ├── dashboard.png
│   ├── upload.png
│   ├── processing.png
│   ├── trip-details.png
│   ├── hotel-details.png
│   └── my-trips.png
│
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Lokesh3177/trrip-ai-travel-planner.git
```

Move into the project folder.

```bash
cd trrip-ai-travel-planner
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# ⚙️ Environment Variables

## Backend (.env)

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

## Frontend (.env)

```env
# Local Development
VITE_API_URL=http://localhost:5000/api

# Production Example
# VITE_API_URL=https://your-render-url.onrender.com/api
```

---

# 🔄 Application Workflow

```text
User Registration / Login
           │
           ▼
Upload Flight Ticket / Hotel Booking
           │
           ▼
OCR & PDF Text Extraction
           │
           ▼
Groq AI Processing
           │
           ▼
Generate Structured Travel Itinerary
           │
           ▼
Save to MongoDB Database
           │
           ▼
View • Share • Delete Trips
```

---

# 📸 Application Screenshots

<table>

<tr>

<td width="50%">

### 📝 Register

<img src="screenshots/register.png" width="100%"/>

</td>

<td width="50%">

### 🏠 Dashboard

<img src="screenshots/dashboard.png" width="100%"/>

</td>

</tr>

<tr>

<td>

### 📤 Upload Documents

<img src="screenshots/upload.png" width="100%"/>

</td>

<td>

### 🤖 AI Processing

<img src="screenshots/processing.png" width="100%"/>

</td>

</tr>

<tr>

<td>

### ✈️ Trip Details

<img src="screenshots/trip-details.png" width="100%"/>

</td>

<td>

### 🏨 Hotel Details

<img src="screenshots/hotel-details.png" width="100%"/>

</td>

</tr>

<tr>

<td>

### 📚 My Trips

<img src="screenshots/my-trips.png" width="100%"/>

</td>

<td></td>

</tr>

</table>

---

# 🌐 API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/itineraries/upload` | Upload Travel Documents |
| GET | `/api/itineraries` | Get All User Trips |
| GET | `/api/itineraries/:id` | Get Trip Details |
| DELETE | `/api/itineraries/:id` | Delete Trip |
| GET | `/api/share/:id` | Get Shared Trip |

---

# 🎯 Future Improvements

- 📅 Google Calendar Integration
- 📧 Email Itinerary Sharing
- 🌍 Multi-language Support
- 🛂 Passport OCR
- 🛃 Visa Information Detection
- 📱 Mobile Application
- 🗺️ Google Maps Integration
- 🔔 Travel Notifications

---

# 👨‍💻 Developer

**Lokesh M**

MERN Stack Developer

- 💻 GitHub: https://github.com/Lokesh3177
- 💼 LinkedIn: https://www.linkedin.com/in/lokeshm31/

---

# 📝 Notes

This project was developed as part of a technical assignment to demonstrate full-stack web development skills using the MERN Stack, OCR, AI integration, cloud services, and modern web development practices.

The application automatically extracts travel information from uploaded documents and generates structured travel itineraries to simplify travel planning and management.

---

# 📄 License

This project is intended for educational and technical assessment purposes.
````
