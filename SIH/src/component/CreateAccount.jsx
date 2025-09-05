import React from "react";
import { Link } from "react-router-dom"; 
import "./CreateAccount.css";
import Phone from "../assets/phone.jpg"; 
import User from "../assets/icon-copy.png"; 


function CreateAccount() {
  return (
    <div className="create-page">
      <div className="create-container">
        {/* Left Form Section */}
        <div className="create-left">
          <h2>Create an account</h2>
          <form className="create-form">

  <div className="input-group">
    {/* <i className="fas fa-user"></i> */}
    <img src={User} alt="user icon" className="input-icon" />
    <input type="text" placeholder="Name" />
  </div>

  <div className="input-group">
    {/* <i className="fas fa-users"></i> */}
    <img src={User} alt="user icon" className="input-icon" />
    <input type="text" placeholder="Batch" />
  </div>

  <div className="input-group">
    {/* <i className="fas fa-graduation-cap"></i> */}
    <img src={User} alt="user icon" className="input-icon" />
    <input type="text" placeholder="Degree" />
  </div>

  <Link to="/PersonalInfo" type="submit" className="next-btn">
    Next
  </Link>
</form>

        </div>

        {/* Right Image Section */}
        <div className="create-right">
          <img src={Phone} alt="Phone Mockup" />
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
