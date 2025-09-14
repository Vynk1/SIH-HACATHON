import React from "react";

// Import local images from assets folder
import event1 from "../assets/event1.jpeg";
import event2 from "../assets/event2.jpeg";
import event3 from "../assets/event3.jpeg";
import event4 from "../assets/event4.jpeg";
import event5 from "../assets/event5.jpeg";
import event6 from "../assets/event6.jpeg";

const events = [
  {
    title: "Induction Programme 2025",
    venue: "MAIT",
    date: "1st August 2025",
    time: "7:00 PM – 10:30 PM",
    image: event1,
  },
  {
    title: "Hindi Newspaper Feature",
    venue: "MAIT",
    date: "23rd June 2025",
    time: "8:00 AM – 1:00 PM",
    image: event2,
  },
  {
    title: "Book Fair 2025",
    venue: "MAIT",
    date: "2nd July 2025",
    time: "3:00 PM – 8:00 PM",
    image: event3,
  },
  {
    title: "International Yoga Day",
    venue: "MAIT",
    date: "21st June 2025",
    time: "9:00 AM – 11:00 AM",
    image: event4,
  },
  {
    title: "Spiritual Talk Event",
    venue: "MAIT Auditorium",
    date: "12th July 2025",
    time: "6:00 PM – 9:00 PM",
    image: event5,
  },
  {
    title: "Alumni Interaction",
    venue: "Board Room, MAIT",
    date: "30th July 2025",
    time: "11:00 AM – 1:00 PM",
    image: event6,
  },
];

const Event = () => {
  return (
    <section className="p-6 md:p-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block">
          Event Management Section
          <span className="block w-16 h-1 bg-indigo-500 mt-2 rounded-full"></span>
        </h2>

        <button className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300">
          + New Event
        </button>
      </div>

      {/* Subheading */}
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">
        All Events
      </h3>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Event Image */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover object-top"
            />

            {/* Event Content */}
            <div className="p-4 text-left">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {event.title}
              </h4>
              <p className="text-sm text-gray-600">📍 {event.venue}</p>
              <p className="text-sm text-gray-600">📅 {event.date}</p>
              <p className="text-sm text-gray-600">⏰ {event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Event;
