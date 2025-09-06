import React from "react";

// Import team member images
import vinayakImg from "../assets/vinayak.jpeg";
import vanshImg from "../assets/vansh.jpeg";
import navyaImg from "../assets/navya.jpeg";
import namanImg from "../assets/naman.jpeg";
import arshdeepImg from "../assets/arshdeep.jpeg";
import deepanshuImg from "../assets/deepanshu.jpeg";

const teamMembers = [
  { name: "Vinayak Gupta", img: vinayakImg },
  { name: "Vansh Bansal", img: vanshImg },
  { name: "Navya Gupta", img: navyaImg },
  { name: "Naman Chopra", img: namanImg },
  { name: "Arshdeep Singh", img: arshdeepImg },
  { name: "Deepanshu Jaiswal", img: deepanshuImg },
];

const TeamSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-12 md:px-20 bg-white">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
        Meet our team
      </h2>

      {/* Team Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-10 max-w-5xl">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow-md mb-4"
            />
            <p className="text-lg font-medium text-gray-800">{member.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
