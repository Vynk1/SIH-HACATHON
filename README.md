# 🎓 Alumni Connect – SIH Hackathon 2025

A centralized **Alumni Management System** built for **Smart India Hackathon**.  
It helps institutions connect with alumni, manage events, mentorships, and donations, while providing admins with powerful tools for outreach and analytics.

---

## 🚀 Features

### 👨‍🎓 For Alumni
- Create and update profiles (education, career, skills)
- Connect with batchmates and faculty
- Register for alumni events
- Provide mentorship to current students
- Make donations (demo mode / Razorpay integration ready)

### 🧑‍🎓 For Students
- Find and connect with alumni mentors
- Apply for internships and guidance
- Access alumni-driven networking opportunities

### 🏫 For Admin / Institution
- Manage alumni database in one place
- Create and track events
- Manage mentorship requests
- Track donations and fundraising
- Analytics dashboard for alumni engagement

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js (Vite)  
- CSS / Tailwind (UI styling)  

**Backend:**  
- Node.js + Express.js  
- MongoDB Atlas (database)  
- JWT Auth (secure login)  
- Multer + Cloudinary (file uploads)  

**Deployment:**  
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

---

## 📂 Project Structure
SIH-HACATHON/
│── backend/ # Node.js + Express backend
│── frontend/ # React frontend
│── docs/ # API docs, Postman collections (if any)
│── README.md

---

## ⚡ Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/<your-username>/SIH-HACATHON.git
cd SIH-HACATHON
```
2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # add your keys
npm start
```
Backend runs at: https://alumnibackend-3wf3.onrender.com


3. Frontend Setup
```bash 
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:3000
# 📡 API Overview

 POST /api/auth/register – Register user
 
 GET /api/alumni/me – Get alumni profile
 
 POST /api/alumni/me – Update alumni profile
 
 GET /api/events – List events
 
 POST /api/events/:id/register – Register for event
 
 POST /api/mentorships/request – Request mentorship
 
 POST /api/donations – Make a donation
 
 👉 Full API contract available in ALUMINI-CONNECT/backend/docs/postman/demo-runbook.md

# 📸 Screenshots 
- **Alumni Dashboard**  
![Alumni Dashboard](frontend/frontend_pages/alumni_dashboard.png)

- **Student Dashboard**  
![Student Dashboard](frontend/frontend_pages/student_dashboard.png)

- **Admin Dashboard**  
![Admin Dashboard](frontend/frontend_pages/admin_dashboard.png)

- **Events Page**  
![Events Page](frontend/frontend_pages/event_tab.png)


# 👨‍💻 Contributors

### Vinayak – Team Lead, Backend + Integration
### Navya – Frontend Developer
### Arsh – UI/UX (Figma)
### Vansh – Java / Spring Boot + Backend Support
### Naman – Postman Testing + Docs & PPT
### Deepanshu - Backend lead + frontend assist + Integration + Database
# 📅 Smart India Hackathon 2025
### This project is developed as part of SIH 2025 under the problem statement:
### “ SIH25017: A centralized alumni management platform for better engagement, mentorship, and fundraising.”









