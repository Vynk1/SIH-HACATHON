import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-screen overflow-hidden text-white text-center px-5 font-[Poppins] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 right-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10"></div>
      
      <div className="relative z-20">
        <NavBar />

        {/* Hero content */}
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              ALUMNI
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
                CONNECT
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Bridge the gap between students and alumni. Build meaningful connections, 
              find mentors, and create lasting professional relationships.
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/login" 
                className="group relative px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl text-lg font-semibold transition-all duration-300 shadow-2xl shadow-indigo-500/25"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/register" 
                className="px-10 py-4 border-2 border-white/20 hover:border-white/40 text-white rounded-2xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
              >
                Sign Up
              </Link>
            </motion.div>
          </motion.div>

          {/* Feature highlights */}
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { icon: '🎓', title: 'Alumni Network', desc: 'Connect with successful graduates' },
              { icon: '🤝', title: 'Mentorship', desc: 'Find experienced mentors' },
              { icon: '💼', title: 'Career Growth', desc: 'Accelerate your professional journey' }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
