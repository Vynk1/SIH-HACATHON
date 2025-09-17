import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import bgImage from "../assets/image.png";

const HeroSection = () => {
  console.log('Background image path:', bgImage); // Debug log
  
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#000"
  };

  return (
    <div
      className="relative flex flex-col min-h-screen w-screen overflow-hidden text-white text-center px-5 font-sans"
      style={backgroundStyle}
    >
      {/* Overlay temporarily removed to debug background image */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div> */}
      
      <NavBar />

      {/* Hero content */}
      <div className="relative z-20 flex flex-col items-center gap-8 mt-[200px] pt-24 mb-24">
        <h1 className="text-5xl md:text-6xl font-semibold">ALUMNI CONNECT</h1>
        <Link 
          to="/login" 
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-medium transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
