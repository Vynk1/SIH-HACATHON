import React from "react";
import { motion } from "framer-motion";
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
      className="relative flex flex-col items-center text-center px-6 py-20 md:px-20 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="relative z-10">
        {/* About Us Heading */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📖 About Us
        </motion.h2>

        {/* About Us Paragraphs */}
        <motion.div 
          className="max-w-6xl text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-2xl p-8 shadow-lg mb-8">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 font-medium">
              At Alumni Connect, our mission is to bridge the gap between alumni,
              students, and institutions by creating a unified digital platform for
              networking, growth, and engagement.
            </p>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              We built this platform after recognizing the challenges faced by alumni
              and educational institutions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📄</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Scattered Information</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Alumni data often gets lost across different spreadsheets, social media groups, or outdated systems. This makes it hard to stay connected or track career growth.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-2xl">🤝</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Lack of Networking Opportunities</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Alumni and students miss chances to collaborate, seek guidance, or discover professional opportunities because there is no centralized community space.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📢</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Event Communication Gaps</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Important updates about reunions, seminars, or webinars don't always reach the right people, leading to low participation.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-2xl">💖</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Difficulty in Giving Back</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Alumni who wish to support their institution (through mentorship, projects, or donations) often don't have a clear or secure channel to contribute.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">No Centralized System for Admins</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Institutions struggle to maintain alumni records, verify profiles, and generate insights for future planning.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What We Offer Heading */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          ✨ What We Offer
        </motion.h2>

        {/* Offerings Cards */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full mb-16">
          {offerings.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative bg-white/90 backdrop-blur-sm border border-indigo-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
              whileHover={{ 
                y: -5, 
                scale: 1.02
              }}
            >
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-3 text-gray-800 hover:text-indigo-600 transition-colors">
                  {item.title}
                </h4>
                <p className="leading-relaxed text-gray-600 text-sm">{item.desc}</p>
              </div>
              
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Images Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.div 
            className="group relative overflow-hidden rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={Aboutus1}
              alt="Networking event"
              className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent group-hover:from-indigo-900/40 transition-all duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Networking Events</h3>
              <p className="text-sm opacity-90">Building connections that last a lifetime</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="group relative overflow-hidden rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={Aboutus2}
              alt="Community gathering"
              className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent group-hover:from-purple-900/40 transition-all duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Community Gathering</h3>
              <p className="text-sm opacity-90">Strengthening our alumni bond</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
