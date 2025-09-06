import React from "react";
import "./Profile.css";
import avatar from "../assets/avatar1.png"; // temporary image
import emailIcon from "../assets/email.png"; // temporary image
import searchIcon from "../assets/search.png"; // temporary image
import bellIcon from "../assets/avatar2.png"; // temporary image
import menuIcon from "../assets/avatar3.png"; // temporary image

const Profile = () => {
  return (
    <div className="profile-page">
      <aside className="sidebar">
        <div className="menu-icons">
          <img src={menuIcon} alt="menu" />
          <img src={menuIcon} alt="time" />
          <img src={menuIcon} alt="profile" />
          <img src={menuIcon} alt="job" />
          <img src={menuIcon} alt="settings" />
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            <h2 className="welcome">Welcome, John</h2>
            <p className="date">Tue, 07 June 2022</p>
          </div>
          <div className="search-box">
            <img src={searchIcon} alt="search" />
            <input type="text" placeholder="Search" />
          </div>
          <img src={bellIcon} alt="bell" className="bell-icon" />
        </header>

        <section className="profile-section">
          <div className="user-info">
            <img src={avatar} alt="John" className="user-avatar" />
            <div className="john-info">
              <h3>John</h3>
              <p>john@gmail.com</p>
            </div>
            <button className="edit-button">Edit</button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="field">Full Name</label>
              <input type="text" placeholder="Enter name" />
            </div>
            <div className="form-group">
              <label className="field">Degree</label>
              <input type="text" placeholder="Your degree" />
            </div>
            <div className="form-group">
              <label className="field">Email</label>
              <input type="text" placeholder="Your email" />
            </div>
            <div className="form-group">
              <label className="field">Contact</label>
              <input type="text" placeholder="Your number" />
            </div>
            <div className="form-group">
              <label className="field">Batch</label>
              <input type="text" placeholder="Your batch" />
            </div>
            <div className="form-group">
              <label className="field">Time Zone</label>
              <input type="text" placeholder="Time Zone" />
            </div>
          </div>

          <div className="email-section">
            <p>My email Address</p>
            <div className="email-card">
              <img src={emailIcon} alt="Email Icon" />
              <div>
                <p>john@gmail.com</p>
                <span>1 month ago</span>
              </div>
            </div>
            <button className="add-email-btn">+ Add Email Address</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
