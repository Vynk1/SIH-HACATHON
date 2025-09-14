import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Anjali Mehta",
      role: "Class of 2018 · Data Scientist at Gongle",
      feedback:
        "Alumni Connect helped me land my first internship through the guidance of a senior mentor.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rohan Sharma",
      role: "Class of 2016 · Entrepreneur",
      feedback:
        "Through Alumni Connect, I found collaborators for my startup journey and reconnected with old batchmates.",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Prof. Kavita Rao",
      role: "Faculty Advisor",
      feedback:
        "The platform has made alumni engagement seamless, strengthening bonds between students and graduates.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section
      id="testimonials"
      className="flex flex-col items-center px-6 py-12 md:px-20 bg-white"
    >
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
        Testimonials
      </h2>

      {/* Subtext */}
      <p className="max-w-6xl text-gray-600 text-base md:text-lg leading-relaxed mb-12 text-center">
        Every connection tells a story. Alumni Connect brings together graduates
        from across the globe to inspire, support, and create lasting bonds. The
        success of our alumni speaks volumes. Hear how Alumni Connect is helping
        graduates stay connected, grow professionally, and give back to their
        alma mater.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h4 className="text-lg font-semibold text-gray-800">{t.name}</h4>
            <p className="text-sm text-gray-500 mb-3">{t.role}</p>
            <p className="text-gray-700 text-sm leading-relaxed">“{t.feedback}”</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
