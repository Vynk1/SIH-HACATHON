import React from "react";
import Aboutus1 from "../assets/aboutus1.jpeg";
import Aboutus2 from "../assets/aboutus2.jpeg";

const AboutUs = () => {
  const offerings = [
    {
      title: "🌍 Centralized Alumni Network",
      desc: "Stay connected with your batchmates, seniors, and juniors through a single, unified platform.",
    },
    {
      title: "📇 Smart Alumni Directory",
      desc: "Search and explore alumni profiles by name, batch, profession, or location to expand your professional network.",
    },
    {
      title: "🎓 Mentorship & Guidance",
      desc: "Alumni can share knowledge, mentor students, and provide career guidance for the next generation.",
    },
    {
      title: "📢 Events & Announcements",
      desc: "Never miss reunions, webinars, or important college updates with our event management and notification system.",
    },
    {
      title: "💼 Job & Internship Opportunities",
      desc: "Get access to exclusive job postings and internship opportunities shared by alumni from top industries.",
    },
    {
      title: "🤝 Alumni–Student Engagement",
      desc: "Bridge the gap through collaborative projects, knowledge sessions, and discussions.",
    },
    {
      title: "💳 Secure Donations & Contributions",
      desc: "Contribute back to your alma mater through a safe and transparent donation system powered by Razorpay.",
    },
    {
      title: "📊 Analytics Dashboard (for Admins)",
      desc: "Institutions can manage alumni data efficiently with insights on batches, industries, and global reach.",
    },
  ];

  return (
    <section
      id="about"
      className="flex flex-col items-center text-center px-6 py-12 md:px-20 bg-white"
    >
      {/* About Us Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">📖 About Us</h2>

      {/* About Us Paragraphs */}
      <div className="max-w-6xl text-left mb-12">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
          At Alumni Connect, our mission is to bridge the gap between alumni,
          students, and institutions by creating a unified digital platform for
          networking, growth, and engagement.
        </p>

        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
          We built this platform after recognizing the challenges faced by alumni
          and educational institutions:
        </p>

        <ul className="text-gray-700 text-base md:text-lg leading-relaxed list-disc list-inside space-y-3">
          <li>
            <strong>Scattered Information:</strong> Alumni data often gets lost
            across different spreadsheets, social media groups, or outdated
            systems. This makes it hard to stay connected or track career growth.
          </li>
          <li>
            <strong>Lack of Networking Opportunities:</strong> Alumni and students
            miss chances to collaborate, seek guidance, or discover professional
            opportunities because there is no centralized community space.
          </li>
          <li>
            <strong>Event Communication Gaps:</strong> Important updates about
            reunions, seminars, or webinars don’t always reach the right people,
            leading to low participation.
          </li>
          <li>
            <strong>Difficulty in Giving Back:</strong> Alumni who wish to support
            their institution (through mentorship, projects, or donations) often
            don’t have a clear or secure channel to contribute.
          </li>
          <li>
            <strong>No Centralized System for Admins:</strong> Institutions struggle
            to maintain alumni records, verify profiles, and generate insights for
            future planning.
          </li>
        </ul>
      </div>

      {/* What We Offer Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">✨ What We Offer</h2>

      {/* Offerings Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-gray-700 text-sm max-w-6xl w-full mb-12">
        {offerings.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left"
          >
            <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
            <p className="leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <img
          src={Aboutus1}
          alt="Networking event"
          className="rounded-lg shadow-md object-cover w-full h-64 md:h-80"
        />
        <img
          src={Aboutus2}
          alt="Community gathering"
          className="rounded-lg shadow-md object-cover w-full h-64 md:h-80"
        />
      </div>
    </section>
  );
};

export default AboutUs;
