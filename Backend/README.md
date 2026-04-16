# 🚖 Uber Clone - Backend

A scalable backend system for the Uber Clone application, handling authentication, ride management, and core business logic.

---

## ✨ Key Features

- 🔐 JWT-based authentication (secure login & signup)  
- 🚗 Ride creation and management system  
- 📡 RESTful APIs for frontend communication  
- 🧩 Modular and scalable architecture  
- ⚡ Efficient request handling  

---

## 🧠 Engineering Highlights

- Implemented secure authentication using JWT and bcrypt  
- Designed structured REST APIs for ride booking flow  
- Organized code using MVC architecture  
- Used middleware for validation and authentication  
- Built scalable MongoDB schemas  

---

## 🔐 Authentication Flow

- User registers via `/register` endpoint  
- Password is hashed using bcrypt  
- JWT token is generated and returned  
- Token is used for protected routes  

---

## 📌 API Documentation

### 📍 Endpoint: `/register`
**Method:** `POST`

### Request Body:
```json
{
  "fullname": {
    "firstname": "string (min length: 3)",
    "lastname": "string (optional)"
  },
  "email": "string",
  "password": "string (min length: 8)"
}

Validation Rules:
firstname → minimum 3 characters
lastname → optional
email → must be valid format
password → minimum 8 characters

{
  "token": "JWT token",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}


{
  "error": "error message"
}

🛠 Tech Stack
Node.js
Express.js
MongoDB
Mongoose
JWT (jsonwebtoken)
bcrypt

⚙️ Project Architecture

Layer Purpose
API Layer Handles routing & controllers
Service Layer Business logic & operations
Database Layer MongoDB schemas & queries
Auth Layer JWT authentication & middleware

📂 Project Structure

controllers/   → request handling logic  
models/        → database schemas  
routes/        → API routes  
middlewares/   → authentication & validation  
services/      → business logic  
db/            → database connection  

⚡ Key Challenges Solved
Securing authentication using JWT
Structuring scalable backend architecture
Handling validation and error responses
Managing database relationships efficiently
Maintaining clean and reusable codebase

🚀 Future Improvements
Ride history tracking
Real-time ride updates using WebSockets
Payment integration
Driver (captain) module expansion
Advanced error handling & logging