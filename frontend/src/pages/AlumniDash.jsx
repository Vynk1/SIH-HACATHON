import React from "react";
import search2 from "../assets/search copy.png";
import profilePic from "../assets/pfp.png";       // Placeholder
import image4 from "../assets/image4.jpeg";       // Placeholder chart

const AlumniDashboard = () => (
  <div className="flex h-screen w-screen bg-[#0f1626] text-white font-[Poppins]">
    {/* Sidebar */}
    <aside className="w-60 p-5 bg-[#1a2236] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <img src={search2} alt="Search-icon" className="w-4 h-4 object-contain" />
        <input
          type="text"
          placeholder="Search for…"
          className="w-full px-3 py-2 bg-[#2a324d] rounded-md text-gray-300 text-sm focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {["Messages", "Mentorship", "Events", "Jobs", "Donate", "Profile"].map((item, i) => (
          <div
            key={i}
            className="px-3 py-2 rounded-md cursor-pointer hover:bg-[#2a324d]"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-auto text-gray-400 px-3 py-2 cursor-pointer">Settings</div>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-7 overflow-y-auto">
      <h1 className="text-4xl mb-8">Alumni Dashboard</h1>

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
        <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full" />
        <div>
          <h2 className="text-2xl m-0">John</h2>
          <p className="text-gray-400 text-lg mt-1">Class of 2022, Computer Science</p>
        </div>
        <div className="ml-auto flex gap-3">
          <button className="px-5 py-2 bg-[#4A9EE2] rounded-md text-lg cursor-pointer">Edit Profile</button>
          <button className="px-5 py-2 bg-[#478093] rounded-md text-lg cursor-pointer">Message</button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(380px,1fr))]">
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <h3 className="text-2xl mb-3">About Me</h3>
          <p>Passionate about AI/ML, entrepreneurship, and volunteering.</p>
          <p><strong>Achievements:</strong> Published research papers, led hackathons</p>
        </div>

        <div className="bg-[#1f2740] p-5 rounded-lg">
          <h3 className="text-2xl mb-3">Education</h3>
          <p>XYZ University</p>
          <p>Batch of 2022</p>
          <p>B.Sc. Computer Science — Artificial Intelligence</p>
        </div>

        <div className="bg-[#1f2740] p-5 rounded-lg">
          <h3 className="text-2xl mb-3">Work Experience</h3>
          <p>Software Engineer at ABC Corp</p>
          <p>Undergrad Research Assistant at UIUC</p>
          <p>Intern at TechWave</p>
        </div>

        <div className="bg-[#1f2740] p-5 rounded-lg">
          <h3 className="text-2xl mb-3">Events Participated</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Tech Summit 2022</li>
            <li>Hackathon 2021</li>
            <li>Alumni Meetup</li>
          </ul>
        </div>

        <div className="bg-[#1f2740] p-5 rounded-lg">
          <h3 className="text-2xl mb-3">Mentorships Offered / Taken</h3>
          <p>2 Offered / 1 Taken</p>
          <div className="h-2 bg-[#2a324d] rounded mt-3">
            <div className="h-full bg-[#4A9EE2]" style={{ width: "66%" }} />
          </div>
        </div>

        <div className="bg-[#1f2740] p-5 rounded-lg flex items-center justify-center">
          <img src={image4} alt="Donation Trends" className="w-full h-40 object-contain rounded-md" />
        </div>
      </div>
    </main>
  </div>
);

export default AlumniDashboard;
