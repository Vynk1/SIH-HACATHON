import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDash from "./pages/AdminDash";
import AlumniDash from "./pages/AlumniDash";
import StudentDash from "./pages/StudentDash";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import EnterCode from "./pages/EnterCode";
import LandingPage from "./pages/LandingPage";
import Donation from "./pages/Donation";
import Events from "./pages/Events";
import Mentorship from "./pages/Mentorship";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Chatbot from "./component/Chatbot";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />

          {/* Protected routes */}
          <Route
            path="/alumnidash"
            element={
            <ProtectedRoute requiredRoles={["alumni", "Alumni"]}>
              <AlumniDash />
            </ProtectedRoute>
            }
          />
          <Route
            path="/adminDash"
            element={
            <ProtectedRoute requiredRoles={["admin", "Admin"]}>
              <AdminDash />
            </ProtectedRoute>
            }
          />
          <Route
            path="/studentdash"
            element={
            <ProtectedRoute requiredRoles={["student", "Student"]}>
              <StudentDash />
            </ProtectedRoute>
            }
          />
          {/* Profile is now integrated into Alumni Dashboard */}
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donation"
            element={
              <ProtectedRoute>
                <Donation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donations"
            element={
              <ProtectedRoute>
                <Donation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentorship"
            element={
              <ProtectedRoute>
                <Mentorship />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Global Chatbot */}
        <Chatbot />
      </Router>
    </AuthProvider>
  );
}
export default App;
