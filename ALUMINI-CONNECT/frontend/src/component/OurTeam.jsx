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
    <section
      id="team"
      className="flex flex-col items-center px-6 py-12 md:px-20 bg-white"
    >
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
        Meet Our Team
      </h2>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mb-4"
            />
            <p className="text-lg font-medium text-gray-800">{member.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
