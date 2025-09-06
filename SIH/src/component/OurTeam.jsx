import React from "react";

const teamMembers = [
  {
    name: "Vinayak Gupta",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Vansh Bansal",
    img: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    name: "Navya Gupta",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Naman Chopra",
    img: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    name: "Arshdeep Singh",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Deepanshu Jaiswal",
    img: "https://randomuser.me/api/portraits/men/70.jpg",
  },
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
