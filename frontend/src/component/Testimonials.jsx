import React from "react";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Anjali Mehta",
      role: "Class of 2018",
      position: "Data Scientist at Google",
      feedback:
        "Alumni Connect helped me land my first internship through the guidance of a senior mentor. The platform made networking so much easier!",
      avatar: "AM",
      rating: 5
    },
    {
      name: "Rohan Sharma", 
      role: "Class of 2016",
      position: "Entrepreneur & Startup Founder",
      feedback:
        "Through Alumni Connect, I found collaborators for my startup journey and reconnected with old batchmates. It's been invaluable for my business growth.",
      avatar: "RS",
      rating: 5
    },
    {
      name: "Prof. Kavita Rao",
      role: "Faculty Advisor",
      position: "Computer Science Department",
      feedback:
        "The platform has made alumni engagement seamless, strengthening bonds between students and graduates. I've seen remarkable connections being formed.",
      avatar: "KR",
      rating: 5
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative py-20 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 overflow-hidden"
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

      <div className="relative z-10 flex flex-col items-center px-6 md:px-20 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          💬 What Our Community Says
        </motion.h2>

        {/* Subtext */}
        <motion.p 
          className="max-w-4xl text-gray-600 text-lg md:text-xl leading-relaxed mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Every connection tells a story. Alumni Connect brings together graduates
          from across the globe to inspire, support, and create lasting bonds.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              
              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                {testimonial.avatar}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 italic group-hover:text-gray-800">
                "{testimonial.feedback}"
              </p>
              
              {/* Author Info */}
              <div className="border-t border-indigo-100 pt-4">
                <h4 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-indigo-600 font-medium">{testimonial.role}</p>
                <p className="text-xs text-gray-500 mt-1">{testimonial.position}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border border-indigo-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Ready to Share Your Success Story?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our community of alumni making a difference.
            </p>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/register'}
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
