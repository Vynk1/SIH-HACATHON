# 🎓 Alumni Connect

**A Modern Full-Stack Alumni Network Platform**

Alumni Connect is a sophisticated web application that bridges the gap between alumni, students, and educational institutions. Built with modern React frontend and robust Node.js backend, it features glass morphism design, interactive analytics, AI-powered chatbot assistance, and comprehensive networking capabilities.

![Alumni Connect](frontend/public/image.png)

## ✨ Key Features

🤖 **AI Chatbot Assistant** - Meet "Alex", powered by Google Generative AI with smart fallback responses
📊 **Interactive Analytics** - Real-time charts with Chart.js integration  
🎨 **Modern Glass UI** - Beautiful glassmorphism design with smooth animations  
👥 **Smart Mentorship** - Connect students with industry professionals  
🎉 **Event Management** - Host and join networking events and reunions  
💝 **Secure Donations** - Razorpay integration for giving back  
📱 **Responsive Design** - Perfect experience across all devices  
🔐 **Role-Based Access** - Tailored experiences for Students, Alumni, and Admins

## 🚀 Quick Start

### 🔧 Tech Stack

**Frontend:**
- ⚛️ React 18 + Vite
- 🎨 Tailwind CSS + Framer Motion
- 📊 Chart.js + React-ChartJS-2
- 🤖 Google Generative AI (Gemini)
- 🎯 Heroicons + React Icons

**Backend:**
- 🚀 Node.js + Express.js
- 🍃 MongoDB + Mongoose
- 🔐 JWT Authentication
- 💳 Razorpay Integration

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn
- Git

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
VITE_APP_TITLE=Alumni Connect

# Optional: AI Chatbot Enhancement
# Get your API key from: https://aistudio.google.com/app/apikey
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** The chatbot works with smart fallback responses even without the API key!

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
│   │   │   ├── Chatbot/  # AI chatbot components
│   │   │   ├── Dashboard/ # Dashboard components
│   │   │   └── Landing/  # Landing page components
│   │   ├── pages/        # Route components
│   │   ├── config/       # API configuration
│   │   └── App.jsx       # Main app component
│   └── index.html
└── package.json      # Root workspace configuration
```

## 🌟 Feature Showcase

### Modern Landing Page
- **Interactive Charts**: Real-time statistics with Chart.js integration
- **Glass Morphism Design**: Modern UI with backdrop blur effects
- **Animated Components**: Smooth transitions with Framer Motion
- **Responsive Testimonials**: Dynamic alumni feedback display

### Advanced Dashboard System
- **Role-Based Views**: Customized dashboards for different user types
- **Interactive Analytics**: Real-time data visualization
- **Glass UI Elements**: Consistent design language throughout
- **Smooth Navigation**: Seamless user experience

### AI Integration
- **Google Generative AI**: Powered by Gemini for intelligent responses
- **Context-Aware**: Understands user intent and provides relevant help
- **Graceful Fallbacks**: Works even without API connectivity
- **Natural Conversation**: Human-like interaction patterns

## 🤖 AI Chatbot (Alex)

Alumni Connect features an intelligent AI chatbot assistant named "Alex" powered by Google's Generative AI (Gemini).

### Features
- **Smart Responses**: Context-aware assistance for platform navigation
- **Fallback System**: Works without API key using intelligent default responses
- **User-Friendly**: Easy-to-use chat interface with typing animations
- **Contextual Help**: Provides relevant information based on user queries

### Setup
1. Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add it to your frontend `.env` file:
   ```bash
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
3. The chatbot will automatically enhance with AI responses!

### Fallback Mode
Even without an API key, Alex provides helpful responses for:
- Platform navigation guidance
- Feature explanations
- Common user questions
- General assistance

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

## 📚 Usage Examples

### Chatbot Interactions
Try these example queries with Alex:
- "How do I update my profile?"
- "Show me upcoming events"
- "How can I become a mentor?"
- "How do I make a donation?"
- "Tell me about the analytics dashboard"

### Dashboard Navigation
- **Students**: Access mentorship, events, and donation features
- **Alumni**: Manage profile, mentor students, create events
- **Admin**: Analytics, user management, and platform oversight

## 🔧 Troubleshooting

### Common Issues

**Chatbot not responding with AI:**
- Check your `VITE_GEMINI_API_KEY` in frontend/.env
- Ensure API key is valid and active
- Fallback responses will work regardless

**Port conflicts:**
```bash
# Kill processes on ports 3000 and 5173
npx kill-port 3000 5173
```

**MongoDB connection issues:**
- Verify MongoDB is running
- Check MONGO_URI in backend/.env
- Ensure database permissions are correct

## 📝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests (when available)
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
