import React from "react";
import globeBg from "../assets/background.png"; // Adjust path as needed
import NavBar from "./NavBar";

const HeroSection = () => {
  return (
    <div
      className="relative flex flex-col min-h-screen w-screen overflow-hidden text-white text-center bg-cover bg-center bg-no-repeat px-5 font-sans"
      style={{ backgroundImage: `url(../assets/background.png)` }}
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-60 z-10"></div>

      <NavBar/> 

      {/* Hero content */}
      <div className="relative z-20 flex flex-col items-center gap-8 mt-[500px] pt-24 mb-24">
        <h1 className="text-5xl md:text-6xl font-semibold">ALUMNI CONNECT</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-medium transition-colors duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
