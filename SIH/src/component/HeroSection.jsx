import React from 'react';
import './HeroSection.css';
import globeBg from '../assets/background.png'; // Adjust path as needed

const HeroSection = () => {
  return (
    <div
      className="hero-wrapper"
      style={{ backgroundImage: `url(${globeBg})` }}
    >
      <div className="overlay"></div>

      <nav className="hero-navbar">
        <ul>
          <li>About Us</li>
          <li>Statistics</li>
          <li>Testimonials</li>
          <li>Our Team</li>
        </ul>
      </nav>

      <div className="hero-content">
        <h1>ALUMNI CONNECT</h1>
        <button className="get-started-btn">Get Started</button>
      </div>
    </div>
  );
};

export default HeroSection;
