# Alumni Portal Backend

## Overview

This is the backend for the Alumni Portal, designed to manage alumni, events, donations, mentorship, and admin functionalities for an educational institution.

---

## Table of Contents

- [Setup](#setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Authentication](#authentication)

---

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with required environment variables (see `.env.example` if available).
4. Start the server:
   ```bash
   npm start
   ```

---

## Project Structure

```
controller/   # Business logic for each domain
middleware/   # Custom Express middleware
model/        # Mongoose models
routes/       # Express route definitions
index.js      # Main entry point
.env          # Environment variables
```

---

## API Endpoints

### Auth

- `POST /auth/login`  
  **Request:**  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
  **Response (success):**
  ```json
  {
    "success": true,
    "token": "JWT_TOKEN",
    "user": { /* user data */ }
  }
  ```
  **Response (error):**
  ```json
  {
    "success": false,
    "message": "Invalid credentials"
  }
  ```

- `POST /auth/register`  
  **Request:**  
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
  **Response (success):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "user": { /* user data */ }
  }
  ```
  **Response (error):**
  ```json
  {
    "success": false,
    "message": "Registration failed"
  }
  ```

---

### Alumni

- `GET /alumni/`  
  **Response:**
  ```json
  {
    "success": true,
    "alumni": [ /* array of alumni profiles */ ]
  }
  ```

- `POST /alumni/`  
  **Request:**  
  ```json
  {
    "name": "Alumni Name",
    "batch": "2020",
    "email": "alumni@example.com",
    // other fields
  }
  ```
  **Response (success):**
  ```json
  {
    "success": true,
    "message": "Alumni profile created",
    "alumni": { /* alumni profile data */ }
  }
  ```
  **Response (error):**
  ```json
  {
    "success": false,
    "message": "Failed to create alumni profile"
  }
  ```

---

### Admin

- `GET /admin/`  
  **Response:**
  ```json
  {
    "success": true,
    "admin": { /* admin dashboard data */ }
  }
  ```

---

### Events

- `GET /events/`  
  **Response:**
  ```json
  {
    "success": true,
    "events": [ /* array of events */ ]
  }
  ```

- `POST /events/`  
  **Request:**  
  ```json
  {
    "title": "Event Title",
    "date": "2025-09-05",
    // other fields
  }
  ```
  **Response (success):**
  ```json
  {
    "success": true,
    "message": "Event created",
    "event": { /* event data */ }
  }
  ```
  **Response (error):**
  ```json
  {
    "success": false,
    "message": "Failed to create event"
  }
  ```

---

### Donations

- `GET /donations/`  
  **Response:**
  ```json
  {
    "success": true,
    "donations": [ /* array of donations */ ]
  }
  ```

- `POST /donations/`  
  **Request:**  
  ```json
  {
    "amount": 1000,
    "alumniId": "alumni_id",
    // other fields
  }
  ```
  **Response (success):**
  ```json
  {
    "success": true,
    "message": "Donation successful",
    "donation": { /* donation data */ }
  }
  ```
  **Response (error):**
  ```json
  {
    "success": false,
    "message": "Donation failed"
  }
  ```

---

### Mentorship

- `GET /mentorships/`  
  **Response:**
  ```json
  {
    "success": true,
    "mentors": [ /* array of mentors */ ]
  }
  ```

- `POST /mentorships/`  
  **Request:**  
  ```json
  {
    "mentorId": "mentor_id",
    "menteeId": "mentee_id",
    // other fields
  }
  ```
  **Response (success):**
  ```json
  {
    "success": true,
    "message": "Mentorship request sent",
    "mentorship": { /* mentorship data */ }
  }
  ```
  **Response (error):**
  ```json
  {
    "success": false,
    "message": "Failed to request mentorship"
  }
  ```

---

## Models

- **User:** Authentication and user info
- **AlumniProfile:** Alumni details
- **AdminProfile:** Admin details
- **Events:** Event details
- **Donation:** Donation records
- **Mentorship:** Mentorship requests

---

## Authentication

Authentication is handled via JWT. Protected routes require a valid token in