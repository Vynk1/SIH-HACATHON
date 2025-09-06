import React from "react";
import { Link } from "react-router-dom";
import Phone from "../assets/phone.jpg"; 
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import user from "../assets/icon.png";

const PersonalInfo = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center font-[Poppins] bg-gradient-to-b from-[#0f2027] via-[#357e9e] to-[#478093]">
      
      {/* Left Image */}
      <div className="hidden md:flex justify-center mr-10">
        <img src={Phone} alt="Phone Mockup" className="w-[300px] max-w-full" />
      </div>

      {/* Form Box */}
      <div className="bg-black/30 p-10 rounded-xl w-full max-w-[500px] text-white text-center">
        <h2 className="mb-8 text-2xl font-semibold">Personal Information</h2>
        <form className="flex flex-col">
          
          {/* Email */}
          <div className="flex items-center border-b border-white mb-4 px-2 py-2">
            <img src={emailIcon} alt="email" className="w-6 h-6 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-b border-white mb-4 px-2 py-2">
            <img src={passwordIcon} alt="password" className="w-6 h-6 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
            />
          </div>

          {/* Profession */}
          <div className="flex items-center border-b border-white mb-4 px-2 py-2">
            <img src={user} alt="profession" className="w-6 h-6 mr-3" />
            <input
              type="text"
              placeholder="Profession"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
            />
          </div>

          {/* Contact */}
          <div className="flex items-center border-b border-white mb-4 px-2 py-2">
            <img src={user} alt="contact" className="w-6 h-6 mr-3" />
            <input
              type="text"
              placeholder="Contact"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
            />
          </div>

          {/* Role */}
          <div className="flex items-center border-b border-white mb-4 px-2 py-2">
            <img src={user} alt="role" className="w-6 h-6 mr-3" />
            <input
              type="text"
              placeholder="Role"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-5 bg-[#4a9ee2] hover:bg-[#357bbd] px-5 py-3 rounded-lg text-lg font-bold transition text-white w-full"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
