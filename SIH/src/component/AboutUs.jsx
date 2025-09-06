import React from "react";
import Aboutus1 from "../assets/aboutus1.jpeg"
import Aboutus2 from "../assets/aboutus2.jpeg"

const AboutUs = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-12 md:px-20 bg-white">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">About us</h2>

      {/* Paragraph */}
      <p className="max-w-3xl text-gray-700 text-base md:text-lg leading-relaxed mb-10">
        Alumni Connect is a platform built to bridge the gap between graduates
        and institutions, creating opportunities for networking, mentorship, and
        growth. <span className="font-medium">Alumni Connect is more than just a networking space—it’s a thriving community.</span> 
        We bring together graduates, students, and institutions to share
        knowledge, celebrate achievements, and collaborate on future
        opportunities.
      </p>

      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <img
          src={Aboutus1}
          alt="Networking event"
          className="rounded-lg shadow-md"
        />
        <img
          src={Aboutus2}
          alt="Community gathering"
          className="rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

export default AboutUs;
