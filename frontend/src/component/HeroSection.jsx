// import React from "react"; // Adjust path as needed
// import NavBar from "./NavBar";
// import bgImage from "../assets/background.png";
// import { Link } from "react-router-dom";

// const HeroSection = () => {
//   return (
//     <div
//       className="relative flex flex-col min-h-screen w-screen overflow-hidden text-white text-center px-5 font-sans"
//       style={{
//         backgroundImage: `url(/globeLogo.png)`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      
//       <NavBar />

//       {/* Hero content */}
//       <div className="relative z-20 flex flex-col items-center gap-8 mt-[500px] pt-24 mb-24">
//         <h1 className="text-5xl md:text-6xl font-semibold">ALUMNI CONNECT</h1>
//         <Link to={"/login"} className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-medium transition-colors duration-300">
//           Get Started
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
// Example: Globe icon from react-icons
import { FaGlobe } from "react-icons/fa";
import Reveal from "../components/Reveal";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-screen overflow-hidden text-white text-center px-5 font-sans bg-black">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      <NavBar />

      {/* Hero content */}
      <div className="relative z-20 flex flex-col items-center gap-8 mt-[200px] pt-24 mb-24">
        {/* Globe Icon instead of background image */}
        <Reveal>
          <FaGlobe className="text-blue-400 w-40 h-40 animate-spin-slow" />
        </Reveal>

        <Reveal>
          <h1 className="text-5xl md:text-6xl font-semibold">ALUMNI CONNECT</h1>
        </Reveal>

        <Reveal>
          <Link
            to="/login"
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-medium transition-colors duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </Reveal>
      </div>
    </div>
  );
};

export default HeroSection;
