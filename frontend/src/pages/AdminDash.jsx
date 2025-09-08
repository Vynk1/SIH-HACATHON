import React from "react";
import image1 from "../assets/image1.jpeg"; // Alumni engagement chart
import image2 from "../assets/image2.jpeg"; // Event participation chart
import image3 from "../assets/image3.jpeg"; // Donation chart
import search from "../assets/search.png";

import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.png";

const stats = [
  { label: "Total alumni registered", value: "50.8K" },
  { label: "Total active alumni (this month)", value: "23.6K" },
  { label: "Events organized", value: "756" },
  { label: "Jobs/Internships listing posted", value: "120" },
  { label: "Total donations/ Funds raised", value: "2.3K" },
];

const alumni = [
  { name: "Jane Doe", title: "Software Engineer", year: "Class of 2015", avatar: avatar1 },
  { name: "Shawn Smith", title: "Product Manager", year: "Class of 2018", avatar: avatar2 },
  { name: "Emily Johnson", title: "UI Designer", year: "Class of 2020", avatar: avatar3 },
  { name: "Michael Brown", title: "Marketing Specialist", year: "Class of 2016", avatar: avatar4 },
  { name: "Sarah Williams", title: "", year: "Class of 2017", avatar: avatar5 },
];

const AdminDashboard = () => (
  <div className="flex h-screen w-screen bg-[#0f1626] text-white overflow-hidden font-[Poppins]">
    {/* Sidebar */}
    <aside className="w-60 bg-[#1a2236] flex flex-col p-5">
      <div className="flex items-center gap-2 bg-[#2a324d] px-3 py-2 rounded-md text-gray-400 text-sm">
        <img src={search} alt="Search" className="w-4 h-4" />
        Search for…
      </div>

      <div className="mt-6 space-y-2">
        {["Dashboard", "Alumni", "Events", "Jobs", "Donations", "Profile"].map((item, idx) => (
          <div
            key={idx}
            className="px-2 py-3 rounded-md cursor-pointer hover:bg-[#2a324d] text-sm"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-5">
        <img src={avatar1} alt="User" className="w-9 h-9 rounded-full" />
        <div>
          <div className="font-bold">John Carter</div>
          <div className="text-xs text-gray-400">Account settings</div>
        </div>
      </div>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      {/* Stats Row */}
      <div className="flex gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex-1 bg-[#1f2740] p-5 rounded-lg">
            <div className="text-sm text-gray-400">{stat.label}</div>
            <div className="text-xl mt-2">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-[#1f2740] rounded-lg flex items-center justify-center min-h-[300px]">
          <img src={image1} alt="Alumni Engagement" className="rounded-lg max-w-full max-h-full object-contain" />
        </div>
        <div className="flex-1 bg-[#1f2740] rounded-lg flex items-center justify-center min-h-[300px]">
          <img src={image2} alt="Event Participation" className="rounded-lg max-w-full max-h-full object-contain" />
        </div>
      </div>

      {/* Lower Section */}
      <div className="flex gap-4">
        {/* Alumni Registrations */}
        <div className="flex-1 bg-[#1f2740] p-5 rounded-lg">
          <h3 className="text-xl mb-4">Recent Alumni Registrations</h3>
          <div className="flex flex-col gap-4">
            {alumni.map((alum, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={alum.avatar} alt={alum.name} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-semibold">{alum.name}</div>
                  <div className="text-sm text-gray-400">
                    {alum.title} {alum.title && "–"} {alum.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="flex-1 bg-[#1f2740] p-5 rounded-lg">
          <h3 className="text-xl mb-6">Upcoming Events</h3>
          {[
            { title: "Alumni Networking", date: "August 25", rsvp: "173 RSVPs" },
            { title: "Career Fair", date: "September 10", rsvp: "200 RSVPs" },
            { title: "Fundraising Gala", date: "October 6", rsvp: "80 RSVPs" },
          ].map((event, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-2 mb-3 last:border-0 last:pb-0 last:mb-0">
              <div>
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-gray-400">{event.date}</div>
              </div>
              <div className="text-sm text-gray-300 whitespace-nowrap">{event.rsvp}</div>
            </div>
          ))}
        </div>

        {/* Donation Trends */}
        <div className="flex-1 bg-[#1f2740] p-5 rounded-lg flex items-center justify-center">
          <img src={image3} alt="Donation Chart" className="rounded-lg max-w-full object-contain" />
        </div>
      </div>
    </main>
  </div>
);

export default AdminDashboard;
