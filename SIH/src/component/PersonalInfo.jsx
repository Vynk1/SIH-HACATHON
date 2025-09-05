import React from "react";
import "./PersonalInfo.css";
import { Link } from "react-router-dom";
import Phone from "../assets/phone.jpg"; 
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import user from "../assets/icon.png";

const PersonalInfo = () => {
  return (
    <div className="personal-info-container">

      <div className="phone-left">
          <img src={Phone} alt="Phone Mockup" />
      </div>

      <div className="form-box">
        <h2 className="form-title">Personal information</h2>
        <form>
          <div className="input-group">
            <img src={emailIcon} alt="email" className="input-image" />
            <input className="field-text" type="email" placeholder="Email" />
          </div>

          <div className="input-group">
            <img src={passwordIcon} alt="password" className="input-image" />
            <input className="field-text" type="password" placeholder="Password" />
          </div>

          <div className="input-group">
            <img src={user} alt="profession" className="input-image" />
            <input className="field-text" type="text" placeholder="Profession" />
          </div>

          <div className="input-group">
            <img src={user} alt="contact" className="input-image" />
            <input className="field-text" type="text" placeholder="Contact" />
          </div>

          <div className="input-group">
            <img src={user} alt="role" className="input-image" />
            <input className="field-text" type="text" placeholder="Role" />
          </div>

          <button type="submit" className="submit-btn">
            SUBMIT
          </button>
        </form>
      </div>
          
    </div>
  );
};

export default PersonalInfo;
