import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDash from "./pages/AdminDash";
import AlumniDash from "./pages/AlumniDash";
import Login from "./pages/Login";
//import HeroSection from "./component/HeroSection";
//import MainContent from "./component/MainContent";
import CreateAccount from "./pages/CreateAccount";
import PersonalInfo from "./pages/PersonalInfo";
import Profile from "./pages/Profile";
import EnterCode from "./pages/EnterCode";
import HeroSection from "./component/HeroSection";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
     //<Profile />
     <LandingPage/>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/CreateAccount" element={<CreateAccount />} />
    //     <Route path="/PersonalInfo" element={<PersonalInfo />} />
    //   </Routes>
    // </Router>
  );
}
export default App;
