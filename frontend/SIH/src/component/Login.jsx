import React from "react";
import { Link } from "react-router-dom"; 
import "./Login.css";
import Globe from "../assets/logo.png";
import google from "../assets/google.png";

function Login() {
  return (
    <div className="page-container">
      <div className="left-section">
        <div className="welcome-text">
          <h1 className="headline">Welcome Back</h1>
          <p className="subtext">Welcome back! Please enter your details.</p>
        </div>

        <form className="form-box">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="********" />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot">Forgot password?</a>
          </div>

          {/* Styled link as a button */}
          <Link to="/CreateAccount" className="link-button">
            Sign in
          </Link>

          <button type="button" className="btn google">
            <img src={google} alt="Google" />
            Sign in with Google
          </button>
          <p className="signup">
          Don’t have an account? <a href="#">Sign up for free!</a>
        </p>
        </form>

        
      </div>

      <div className="right-section">
        <img src={Globe} alt="Logo" className="logo" />
        <h1 className="title">
          ALUMNI <br /> CONNECT
        </h1>
        <p className="tagline">Stay connected, grow together</p>
      </div>
    </div>
  );
}

export default Login;
