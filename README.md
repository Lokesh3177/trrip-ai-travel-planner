
# ✈️ TRRIP AI – Smart Travel Itinerary Generator

<p align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge"/>
<img src="https://img.shields.io/badge/JWT-Authentication-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Cloudinary-Storage-3448C5?style=for-the-badge"/>
<img src="https://img.shields.io/badge/OCR-Tesseract-success?style=for-the-badge"/>

</p>

<p align="center">

AI-powered MERN Stack web application that automatically extracts travel information from uploaded travel documents and generates structured travel itineraries using OCR, PDF Parsing, and Groq AI.

</p>

---

# 📑 Table of Contents

- 🌐 Live Demo
- 📖 Project Overview
- ✨ Features
- 🛠 Technology Stack
- 🏗 System Architecture
- 🚀 Deployment Architecture
- 📂 Project Structure
- ⚙ Installation
- 🔐 Environment Variables
- 🔄 Application Workflow
- 📸 Application Screenshots
- 🌐 API Endpoints
- 📚 Key Learning Outcomes
- 🚀 Future Enhancements
- 👨‍💻 Developer
- 📝 Acknowledgement

---

# 🌐 Live Demo

### 🚀 Frontend

https://trrip-ai-travel-planner.vercel.app

### ⚙ Backend API

https://trrip-ai-travel-planner.onrender.com

---

# 📖 Project Overview

TRRIP AI is an AI-powered travel itinerary management system developed using the MERN Stack.

The application enables users to upload travel-related documents including:

- ✈ Flight Tickets
- 🏨 Hotel Booking Confirmations
- 📄 Travel PDFs
- 🖼 Travel Images

The uploaded documents are processed through OCR (Tesseract OCR) and PDF parsing. The extracted information is then analyzed by Groq AI to generate a clean and structured travel itinerary.

The generated itinerary includes:

- Passenger Information
- Flight Details
- Hotel Booking Details
- Travel Dates
- Important Notes
- AI-generated Trip Summary

Users can securely manage, share, and organize all travel itineraries from a centralized dashboard.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes

## 📄 Document Upload

- Upload Flight Tickets
- Upload Hotel Booking PDFs
- Upload Images
- Cloudinary Storage

## 🤖 AI Processing

- OCR Text Extraction
- PDF Parsing
- Groq AI Integration
- Automatic Data Extraction
- Structured Itinerary Generation

## 📂 Trip Management

- Dashboard
- My Trips
- Trip Details
- Delete Trip
- Public Share Link

## 🎨 User Interface

- Responsive Design
- Modern UI
- Mobile Friendly
- Loading Indicators
- Error Handling

---

# 🛠 Technology Stack

## 🎨 Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

## ⚙ Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer
- Cloudinary
- Tesseract OCR
- pdf-parse
- Groq AI API

---

# 🏗 System Architecture

```text

                  React + Tailwind CSS
                          │
                          ▼
                 Express.js REST API
                          │
      ┌───────────────────┼────────────────────┐
      ▼                   ▼                    ▼
JWT Authentication    OCR Engine         PDF Parser
                          │
                          ▼
                    Groq AI Processing
                          │
                          ▼
                    MongoDB Atlas
```

---

# 🚀 Deployment Architecture

```text
             Frontend (Vercel)
                     │
                     ▼
          Backend API (Render)
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
 MongoDB Atlas   Cloudinary      Groq AI
```

---

# 📂 Project Structure

```text
TRRIP-AI
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
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
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

Move into the project.

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

# ⚙ Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GROQ_API_KEY=your_groq_api_key
```

---

## Frontend (.env)

### Local Development

```env
VITE_API_URL=http://localhost:5000/api
```

### Production

```env
VITE_API_URL=https://trrip-ai-travel-planner.onrender.com/api
```

---

# 🔄 Application Workflow

```text
                User Registration / Login
                          │
                          ▼
              Upload Travel Documents
                          │
        ┌─────────────────┴─────────────────┐
        ▼                                   ▼
  OCR Text Extraction                 PDF Parsing
        │                                   │
        └───────────────┬───────────────────┘
                        ▼
               Groq AI Processing
                        │
                        ▼
         Generate Structured Itinerary
                        │
                        ▼
              Store Data in MongoDB
                        │
                        ▼
         View • Share • Delete Trips
```

---

# 📸 Application Screenshots

## 📝 Register

<img src="https://raw.githubusercontent.com/Lokesh3177/trrip-ai-travel-planner/main/screenshots/register.png" width="100%"/>

---

## 🏠 Dashboard

<img src="https://raw.githubusercontent.com/Lokesh3177/trrip-ai-travel-planner/main/screenshots/dashboard.png" width="100%"/>

---

## 📤 Upload Travel Documents

<img src="https://raw.githubusercontent.com/Lokesh3177/trrip-ai-travel-planner/main/screenshots/upload.png" width="100%"/>

---

## 🤖 AI Processing

<img src="https://raw.githubusercontent.com/Lokesh3177/trrip-ai-travel-planner/main/screenshots/processing.png" width="100%"/>

---

## ✈️ Trip Details

<img src="https://raw.githubusercontent.com/Lokesh3177/trrip-ai-travel-planner/main/screenshots/trip-details.png" width="100%"/>

---

## 🏨 Hotel Details

<img src="https://raw.githubusercontent.com/Lokesh3177/trrip-ai-travel-planner/main/screenshots/hotel-details.png" width="100%"/>

---

## 📚 My Trips

<img src="https://raw.githubusercontent.com/Lokesh3177/trrip-ai-travel-planner/main/screenshots/my-trips.png" width="100%"/>

---

# 🌐 REST API Endpoints

| Method | Endpoint | Authentication | Description |
|---------|----------|:--------------:|-------------|
| POST | `/api/auth/register` | ❌ | Register a new user |
| POST | `/api/auth/login` | ❌ | Authenticate user |
| POST | `/api/itineraries/upload` | ✅ | Upload travel documents |
| GET | `/api/itineraries` | ✅ | Fetch all user itineraries |
| GET | `/api/itineraries/:id` | ✅ | Retrieve itinerary details |
| DELETE | `/api/itineraries/:id` | ✅ | Delete an itinerary |
| GET | `/api/share/:id` | ❌ | View shared itinerary |

---

# 📊 Core Modules

### 🔐 Authentication

- JWT Authentication
- Secure Login
- Password Hashing
- Protected API Routes

### 📄 Document Processing

- Upload PDF Documents
- Upload Image Files
- OCR using Tesseract OCR
- PDF Parsing
- Cloudinary Storage

### 🤖 AI Processing

- Groq AI Integration
- Intelligent Travel Information Extraction
- Flight Detection
- Hotel Booking Detection
- AI Summary Generation

### 📂 Trip Management

- Dashboard
- My Trips
- Trip Details
- Delete Trips
- Public Share Links

### 🎨 User Experience

- Responsive Design
- Loading Indicators
- Error Handling
- Clean Modern UI
- Mobile Friendly

---
````
```markdown
# 📚 Key Learning Outcomes

This project demonstrates practical experience with modern full-stack web development technologies and AI-powered document processing.

### Full-Stack Development

- Developed a complete MERN Stack application
- Designed RESTful APIs using Express.js
- Built responsive user interfaces with React.js and Tailwind CSS
- Connected frontend and backend using Axios

### Authentication & Security

- Implemented JWT Authentication
- Protected API Routes
- Secure Password Hashing
- User Authorization

### AI & Document Processing

- Integrated Groq AI API
- OCR using Tesseract OCR
- PDF Text Extraction using pdf-parse
- Automated Travel Information Extraction
- AI-generated Travel Itinerary Creation

### Cloud Services

- MongoDB Atlas
- Cloudinary Image Storage
- Render Backend Deployment
- Vercel Frontend Deployment

---

# 🚀 Future Enhancements

- 📅 Google Calendar Integration
- 📧 Email Itinerary Sharing
- 🗺 Google Maps Integration
- 🌍 Multi-language Support
- 📱 Native Mobile Application
- 🔔 Smart Travel Notifications
- 💳 Expense Tracking
- 🛂 Passport OCR
- 🛃 Visa Information Detection
- 📍 Live Flight Tracking
- 🌤 Weather Forecast Integration
- 🤖 Personalized AI Travel Recommendations

---

# 📈 Project Highlights

| Feature | Status |
|----------|:------:|
| User Authentication | ✅ |
| JWT Authorization | ✅ |
| OCR Processing | ✅ |
| PDF Parsing | ✅ |
| AI Integration | ✅ |
| Flight Extraction | ✅ |
| Hotel Extraction | ✅ |
| CRUD Operations | ✅ |
| Shareable Links | ✅ |
| Responsive UI | ✅ |
| Cloudinary Upload | ✅ |
| MongoDB Integration | ✅ |
| Render Deployment | ✅ |
| Vercel Deployment | ✅ |

---

# 💡 Challenges Solved

During the development of this project, several practical challenges were addressed:

- Implemented secure JWT-based authentication.
- Processed both PDF and image travel documents.
- Extracted travel information using OCR and PDF parsing.
- Integrated Groq AI to generate structured itineraries.
- Managed file uploads using Cloudinary.
- Configured CORS for local and production environments.
- Connected a Vercel frontend with a Render backend.
- Built a responsive UI compatible with desktop and mobile devices.

---

# 👨‍💻 Developer

## Lokesh M

**MERN Stack Developer**

### Connect with Me

- 💻 **GitHub**
  - https://github.com/Lokesh3177

- 💼 **LinkedIn**
  - https://www.linkedin.com/in/lokeshm31/

---

# 🙏 Acknowledgement

This project was developed as part of a technical assessment to demonstrate practical knowledge of full-stack web development using the MERN Stack.

The application showcases the integration of:

- React.js
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- OCR (Tesseract)
- PDF Parsing
- Groq AI
- Cloudinary
- Responsive UI Design

The primary objective of this project is to simplify travel itinerary management by automatically extracting information from uploaded travel documents and generating organized travel plans.

---

# 📄 License

This project is intended solely for educational purposes and technical assessment. It is not intended for commercial use.

---

<p align="center">

### ⭐ If you found this project useful, consider giving it a star!

Made with ❤️ using React, Node.js, Express.js, MongoDB, OCR & Groq AI.

</p>
```
