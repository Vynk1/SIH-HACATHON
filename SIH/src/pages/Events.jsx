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
    title: "Networking Mixer",
    venue: "Olive Bar & Kitchen, Mehrauli",
    date: "18th October 2025",
    time: "7:00 PM – 10:30 PM",
    image: event1,
  },
  {
    title: "Golf Tournament",
    venue: "DLF Golf & Country Club, Gurgaon",
    date: "23rd November 2025",
    time: "8:00 AM – 1:00 PM",
    image: event2,
  },
  {
    title: "Homecoming Celebration",
    venue: "India Habitat Centre, Lodhi Road",
    date: "2nd November 2025",
    time: "3:00 PM – 8:00 PM",
    image: event3,
  },
  {
    title: "Alumni Panel",
    venue: "Auditorium, Delhi Campus",
    date: "12th December 2025",
    time: "11:00 AM – 1:00 PM",
    image: event4,
  },
  {
    title: "Alumni Career Fair",
    venue: "Convention Hall, Gurugram",
    date: "20th January 2026",
    time: "10:00 AM – 5:00 PM",
    image: event5,
  },
  {
    title: "Volunteer Day",
    venue: "Community Centre, Delhi",
    date: "15th February 2026",
    time: "9:00 AM – 2:00 PM",
    image: event6,
  },
];

const Event = () => {
  return (
    <section className="p-6 md:p-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Event Management Section
        </h2>
        <button className="mt-4 md:mt-0 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md transition">
          + New Event
        </button>
      </div>

      {/* All Events */}
      <h3 className="text-xl font-semibold text-gray-700 mb-6">All Events</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
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
