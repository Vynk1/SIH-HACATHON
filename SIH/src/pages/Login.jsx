import React from "react";
import Globe from "../assets/logo.png";
import google from "../assets/google.png";

function Login() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-gradient-to-b from-[#0F2027] via-[#357E9E] to-[#478093] text-white font-[Poppins]">
      
      {/* Left Section */}
      <div className="flex flex-1 flex-col justify-center px-6 sm:px-10 md:px-16 py-8">
        
        {/* Welcome Text */}
        <div className="text-center mb-8 md:-ml-8">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold mb-2">
            Welcome Back
          </h1>
          <p className="text-[#eee] text-sm sm:text-base">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col items-center md:items-start md:ml-[18%] w-full">
          
          {/* Email */}
          <label className="text-sm sm:text-base mb-2 w-[90%] md:w-[380px] text-left">
            Email
          </label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-[90%] md:w-[380px] p-3 outline-1 rounded-xl mb-5 text-black text-[15px] shadow-md focus:outline-none border border-transparent hover:border-white transition"
          />

          {/* Password */}
          <label className="text-sm sm:text-base mb-2 w-[90%] md:w-[380px] text-left">
            Password
          </label>
          <input 
            type="password" 
            placeholder="********" 
            className="w-[90%] md:w-[380px] p-3 outline-1 rounded-xl mb-5 text-black text-[15px] shadow-md focus:outline-none border border-transparent hover:border-white transition"
          />

          {/* Options */}
          <div className="flex justify-between items-center w-[90%] md:w-[380px] text-[14px] mb-5">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#4A9EE2]" /> Remember me
            </label>
            <a href="#" className="text-[#4A9EE2] hover:underline">Forgot password?</a>
          </div>

          {/* Sign In Button */}
          <a 
            href="/CreateAccount" 
            className="w-[90%] md:w-[380px] text-center bg-[#4A9EE2] text-white py-3 rounded-xl font-medium mb-4 shadow-md hover:opacity-90 cursor-pointer"
          >
            Sign in
          </a>

          {/* Google Button */}
          <button 
            type="button" 
            className="w-[90%] md:w-[380px] flex justify-center items-center bg-white text-black py-3 rounded-xl font-medium mb-4 shadow-md"
          >
            <img src={google} alt="Google" className="w-[30px] mr-2" />
            Sign in with Google
          </button>

          {/* Signup Text */}
          <p className="text-[14px] sm:text-[15px] mt-2 text-center md:text-left md:ml-[9%]">
            Don’t have an account?{" "}
            <a href="#" className="text-[#4A9EE2] hover:underline">Sign up for free!</a>
          </p>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 flex-col justify-center items-center text-center px-4 py-6">
        <img src={Globe} alt="Logo" className="w-[250px] sm:w-[350px] md:w-[500px] mb-[-10px]" />
        <h1 className="font-[Poltawski_Nowy] text-4xl sm:text-5xl md:text-[80px] leading-tight md:leading-[100px] -mt-6 md:-mt-[60px]">
          ALUMNI <br /> CONNECT
        </h1>
        <p className="text-lg sm:text-xl md:text-[24px] italic font-semibold -mt-2 md:-mt-[10px]">
          Stay connected, grow together
        </p>
      </div>
    </div>
  );
}

export default Login;
