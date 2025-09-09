# 🎓 Alumni Connect – Frontend

This is the **React.js frontend** for the **Alumni Connect** project (SIH Hackathon 2025).  
It provides the user interface for alumni, students, and administrators to interact with the platform.

---

## 🚀 Features

- **Authentication Pages**
  - Register, Login, Logout
  - JWT-based session management

- **Alumni Dashboard**
  - Update personal and professional profile
  - View and register for events
  - Offer mentorship to students
  - Make donations

- **Student Dashboard**
  - Search for alumni mentors
  - Request mentorship
  - Join alumni events

- **Admin Dashboard**
  - Create/manage events
  - Approve mentorship requests
  - View donation summaries
  - Access analytics

- **UI/UX**
  - Built with **React + Vite**
  - Styled with **CSS / Tailwind**
  - Responsive design for desktop and mobile

---

## 🛠️ Tech Stack

- **Framework:** React.js (Vite)
- **Routing:** React Router DOM
- **Styling:** CSS / Tailwind CSS
- **API Calls:** Axios / Fetch
- **Icons & Components:** shadcn/ui, lucide-react (optional)

---

## 📂 Project Structure

frontend/
│── src/
│ ├── assets/ # images, icons
│ ├── components/ # reusable components (Navbar, Sidebar, etc.)
│ ├── pages/ # main pages (Login, AlumniDash, AdminDash, etc.)
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│── package.json
│── vite.config.js
│── README.md


---

## ⚡ Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/<your-username>/SIH-HACATHON.git
cd SIH-HACATHON/frontend

2. Install dependencies
npm install

3. Configure Environment

Create a .env file in frontend/ with:

VITE_BACKEND_URL=http://localhost:5000


Change VITE_BACKEND_URL to your deployed backend URL (e.g., https://alumni-connect-backend.onrender.com) when deploying.

4. Run locally
npm run dev


Frontend will start at http://localhost:3000
.

🔗 API Integration

The frontend interacts with the backend at:

POST /api/auth/register – User registration

POST /api/auth/login – User login

GET /api/alumni/me – Fetch alumni profile

POST /api/events/:id/register – Register for events

POST /api/mentorships/request – Request mentorship

POST /api/donations – Make a donation

👉 Make sure VITE_BACKEND_URL points to the correct backend.

📦 Build for Production
npm run build


The optimized build will be in the dist/ folder.
You can deploy this build to Vercel, Netlify, or any static hosting service.

👨‍💻 Contributors (Frontend)

Navya – React.js, Components & UI

Arsh – UI/UX (Figma)

Vinayak – Integration with backend APIs

Deepanshu – Backend support, API testing

📅 Smart India Hackathon 2025

This project is part of SIH 2025 under the Alumni Engagement problem statement.
Frontend is designed for fast, simple, and responsive user experience.
