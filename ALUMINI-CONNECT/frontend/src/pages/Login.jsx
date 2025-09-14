import Globe from "../assets/logo.png";
import google from "../assets/google.png";
import { Link } from "react-router-dom"; // Optional if using React Router
import { useState } from "react";
import Footer from "../component/Footer";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-b from-[#0F2027] via-[#357E9E] to-[#478093] text-white font-[Poppins]">
      
      {/* Left Section - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 py-12">
        
        {/* Welcome Text */}
        <div className="text-center md:text-left mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold mb-2">
            Welcome Back
          </h1>
          <p className="text-[#eee] text-sm sm:text-base">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 border border-white/10 rounded-2xl backdrop-blur-md p-6 w-full max-w-xl mx-auto shadow-xl">
        <form className="flex flex-col items-center md:items-start w-full">
          
          {/* Email */}
          <label className="text-sm sm:text-base mb-2 w-full md:w-[380px] text-left">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-[380px] p-3 rounded-xl mb-5 text-black text-[15px] shadow-md focus:outline-none border border-transparent hover:border-white transition focus:ring-2 focus:ring-[#4A9EE2]/60"
          />

          {/* Password */}
          <label className="text-sm sm:text-base mb-2 w-full md:w-[380px] text-left">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            className="w-full md:w-[380px] p-3 rounded-xl mb-5 text-black text-[15px] shadow-md focus:outline-none border border-transparent hover:border-white transition focus:ring-2 focus:ring-[#4A9EE2]/60"
          />

          {/* Options
          <div className="flex flex-col sm:flex-row justify-between items-center w-full md:w-[380px] text-[14px] mb-5 gap-2 sm:gap-0">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#4A9EE2]" /> Remember me
            </label>
            <a href="#" className="text-[#4A9EE2] hover:underline">Forgot password?</a>
          </div> */}

          {/* Sign In Button */}
          <Link 
            onClick={() => setIsLoggedIn(true)}
            to="/register"
            className="w-full md:w-[380px] text-center bg-[#4A9EE2] text-white py-3 rounded-xl font-medium mb-4 shadow-md hover:opacity-90 transition hover:shadow-lg"
          >
            Sign in
          </Link>

          {/* Google Button */}
          <button 
            type="button" 
            className="w-full md:w-[380px] flex justify-center items-center bg-white text-black py-3 rounded-xl font-medium mb-4 shadow-md hover:opacity-90 transition hover:shadow-lg"
          >
            <img src={google} alt="Google" className="w-6 sm:w-7 mr-2" />
            Sign in with Google
          </button>

          {/* Signup Text */}
          <p className="text-[14px] sm:text-[15px] mt-2 text-center md:text-left">
            Don’t have an account?{" "}
            <Link to={"/register"} className="text-[#4A9EE2] hover:underline">Sign up for free!</Link>
          </p>
        </form>
        </div>
      </div>

      {/* Right Section - Logo & Text */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12">
        <img src={Globe} alt="Logo" className="w-48 sm:w-64 md:w-80 lg:w-[500px] mb-6" />
        <h1 className="font-[Poltawski_Nowy] text-4xl sm:text-5xl md:text-[72px] lg:text-[80px] leading-tight md:leading-[90px] lg:leading-[100px]">
          ALUMNI <br /> CONNECT
        </h1>
        <p className="text-base sm:text-lg md:text-2xl lg:text-[24px] italic font-semibold mt-2">
          Stay connected, grow together
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
