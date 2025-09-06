import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDash from "./component/AdminDash";
import AlumniDash from "./component/AlumniDash";
import Login from "./component/Login";
//import HeroSection from "./component/HeroSection";
//import MainContent from "./component/MainContent";
import CreateAccount from "./component/CreateAccount";
import PersonalInfo from "./component/PersonalInfo";
import Profile from "./component/Profile";
import HeroSection from "./component/HeroSection";

function App() {
  return (
     //<AdminDash />
     <HeroSection/>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/CreateAccount" element={<CreateAccount />} />
    //     <Route path="/PersonalInfo" element={<PersonalInfo />} />
    //   </Routes>
    // </Router>
  );
}
export default App;
