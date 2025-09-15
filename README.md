# Alumni Portal

A full-stack web application for managing alumni connections, events, donations, and mentorship programs at educational institutions.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup
```bash
# 1. Clone the repository
git clone <repository-url>
cd SIH-HACATHON

# 2. Install all dependencies
npm run setup

# 3. Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 4. Configure your .env files (see Environment section below)

# 5. Start development servers
npm run dev
```

This will start:
- Backend server on http://localhost:3000
- Frontend server on http://localhost:5173

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run setup` | Install all dependencies (root + backend + frontend) |
| `npm run dev` | Start both frontend and backend servers |
| `npm run dev:backend` | Start only backend server |
| `npm run dev:frontend` | Start only frontend server |
| `npm run build` | Build frontend for production |
| `npm run lint` | Run ESLint on frontend |
| `npm run clean` | Remove all node_modules folders |

## 🔧 Environment Configuration

### Backend (.env)
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/alumni-portal
MONGO_DB=alumniDB
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=Alumni Portal
```

## 📁 Project Structure

```
├── backend/          # Express.js API server
│   ├── controller/   # Business logic
│   ├── middleware/   # Auth & validation middleware
│   ├── model/        # Mongoose models
│   ├── routes/       # API routes
│   └── index.js      # Server entry point
├── frontend/         # React application
│   ├── src/
│   │   ├── component/    # Reusable components
│   │   ├── pages/        # Route components
│   │   ├── config/       # API configuration
│   │   └── App.jsx       # Main app component
│   └── index.html
└── package.json      # Root workspace configuration
```

## 🔌 API Integration

The frontend uses a centralized API system in `src/config/api.js`:

```javascript
import api from './config/api.js';

// Example usage
const handleLogin = async (credentials) => {
  try {
    const response = await api.login(credentials);
    console.log('Login successful:', response);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};
```

## 📖 Features

- **Authentication**: JWT-based auth with role-based access control
- **Alumni Management**: Profile creation and management
- **Events**: Event creation, management, and participation
- **Donations**: Donation processing and tracking
- **Mentorship**: Mentor-mentee connection system
- **Admin Dashboard**: Administrative oversight tools

## 🛡️ Security

- JWT tokens for authentication
- Role-based access control
- CORS configuration for development
- Environment variable protection
- Input validation and sanitization

## 📝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests (when available)
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

For detailed development information, see [WARP.md](./WARP.md).
