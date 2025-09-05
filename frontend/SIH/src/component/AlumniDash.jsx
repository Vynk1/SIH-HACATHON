import React from "react";
import "./AlumniDash.css";
import search2 from "../assets/search copy.png"
import profilePic from "../assets/pfp.png";       // Placeholder
import image4 from "../assets/image4.jpeg";  // Placeholder chart

const AlumniDashboard = () => (
  <div className="alumni-dashboard">
    <aside className="sidebar">
      <img src={search2.png} alt="Search-icon" className="search-icon"/>
      <input
       type="text" 
       placeholder="Search for…" 
       className="sidebar-search" />
      {["Messages", "Mentorship", "Events", "Jobs", "Donate", "Profile"].map((item, i) => (
        <div key={i} className="sidebar-item">{item}</div>
      ))}
      <div className="sidebar-footer">Settings</div>
    </aside>

    <main className="main-content">
      <h1>Alumni Dashboard</h1>

      <div className="profile-header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2>John</h2>
          <p>Class of 2022, Computer Science</p>
        </div>
        <div className="actions">
          <button className="btn edit">Edit Profile</button>
          <button className="btn message">Message</button>
        </div>
      </div>

      <div className="cards-grid">
        <div className="card">
          <h3>About Me</h3>
          <p>Passionate about AI/ML, entrepreneurship, and volunteering.</p>
          <p><strong>Achievements:</strong> Published research papers, led hackathons</p>
        </div>
        <div className="card">
          <h3>Education</h3>
          <p>XYZ University</p>
          <p>Batch of 2022</p>
          <p>B.Sc. Computer Science — Artificial Intelligence</p>
        </div>
        <div className="card">
          <h3>Work Experience</h3>
          <p>Software Engineer at ABC Corp</p>
          <p>Undergrad Research Assistant at UIUC</p>
          <p>Intern at TechWave</p>
        </div>
        <div className="card">
          <h3>Events Participated</h3>
          <ul>
            <li>Tech Summit 2022</li>
            <li>Hackathon 2021</li>
            <li>Alumni Meetup</li>
          </ul>
        </div>
        <div className="card">
          <h3>Mentorships Offered / Taken</h3>
          <p>2 Offered / 1 Taken</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: "66%" }} />
          </div>
        </div>
        <div className="card">
          <img src={image4} alt="Donation Trends" className="chart-img" />
        </div>
      </div>
    </main>
  </div>
);

export default AlumniDashboard;
