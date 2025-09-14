import React from "react";
import HeroSection from "../component/HeroSection";
import AboutUs from "../component/AboutUs";
//import Stats from '../component/Stats'
import TestimonialsSection from "../component/Testimonials";
import Team from "../component/OurTeam";
import Footer from "../component/Footer";

// import React from "react";
import { FaGlobe } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";

const iconSVG = renderToStaticMarkup(<FaGlobe size={64} color="#4A9EE2" />);
console.log(iconSVG);

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      {/* <Stats /> */}
      <TestimonialsSection />
      <Team />
      <Footer />
    </>
  );
};

export default LandingPage;
