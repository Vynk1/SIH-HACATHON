import React from "react";
import "./AdminDash.css";
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
  { label: "Total duration/ Funds raised", value: "2.3K" },
];

const alumni = [
  { name: "Jane Doe", title: "Soffamic Engineer", year: "Class of 2015", avatar: avatar1 },
  { name: "Shawn Smith", title: "Product Manager", year: "Class of 2018", avatar: avatar2 },
  { name: "Emily Johnson", title: "UK UI Designer", year: "Class of 2020", avatar: avatar3 },
  { name: "Michael Brown", title: "Markering Specialist", year: "Class of 2016", avatar: avatar4 },
  { name: "Sarah Williams", title: "", year: "Class of 2017", avatar: avatar5 },
];

const AdminDashboard = () => (
  <div className="admin-dashboard">
    <aside className="side_bar">
      <div className="search">
        <img src={search.png} alt="Search-icon" className="search-icon"/>
        Search for…
        </div>
      {["Dashboard", "Alumni", "Events", "Jobs", "Donations", "Profile"].map((item, idx) => (
        <div key={idx} className="menu-item">{item}</div>
      ))}
      <div className="sidebar-footer">
        <img src={avatar1} alt="User Avatar" className="avatar-image" />
        <div>
          <div className="user-name">John Carter</div>
          <div className="user-role">Account settings</div>
        </div>
      </div>
    </aside>

    <main className="main-content">
      <h1 className="title">Admin Dashboard</h1>

      <div className="stats-row">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart">
          <img src={image1} alt="Alumni Engagement" className="chart-image" />
        </div>
        <div className="chart">
          <img src={image2} alt="Event Participation" className="chart-image" />
        </div>
      </div>

      <div className="lower-section">
        {/* Alumni Registrations */}
        <div className="panel alumni-panel">
          <h3>Recent Alumni Registrations</h3>
          <div className="alumni-list">
            {alumni.map((alum, idx) => (
              <div key={idx} className="alumni-item">
                <img src={alum.avatar} alt={alum.name} className="alumni-avatar" />
                <div className="alumni-details">
                  <div className="alumni-name">{alum.name}</div>
                  <div className="alumni-info">{alum.title} {alum.title && "–"} {alum.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="panel events-panel">
  <h3>Upcoming Events</h3>
  <div className="event-item">
    <div className="event-info">
      <div className="event-title">Alumni Networking</div>
      <div className="event-date">August 25</div>
    </div>
    <div className="event-rsvp">173 RSVPs</div>
  </div>
  <div className="event-item">
    <div className="event-info">
      <div className="event-title">Career Fair</div>
      <div className="event-date">September 10</div>
    </div>
    <div className="event-rsvp">200 RSVPs</div>
  </div>
  <div className="event-item">
    <div className="event-info">
      <div className="event-title">Fundraising Gala</div>
      <div className="event-date">October 6</div>
    </div>
    <div className="event-rsvp">80 RSVPs</div>
  </div>
</div>


        {/* Donation Trends */}
        <div className="panel donation-panel">
          {/* <h3>Donation/Funding Trends</h3> */}
          <img src={image3} alt="Donation Chart" className="chart-image small" />
        </div>
      </div>
    </main>
  </div>
);

export default AdminDashboard;
