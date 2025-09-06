import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDash from "./pages/AdminDash";
import AlumniDash from "./pages/AlumniDash";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import EnterCode from "./pages/EnterCode";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    // <AlumniDash />
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/alumnidash" element={<AlumniDash />} />
        <Route path="/adminDash" element={<AdminDash />} />
        <Route path="/me" element={<Profile />} />
      </Routes>
    </Router>
  );
}
export default App;
