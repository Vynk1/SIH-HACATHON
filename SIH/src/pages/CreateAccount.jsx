import React from "react";
import { Link } from "react-router-dom"; 
import Phone from "../assets/phone.jpg"; 
import User from "../assets/icon-copy.png"; 

function CreateAccount() {
  return (
    <div className="h-screen w-screen flex justify-center items-center font-[Poppins] bg-gradient-to-b from-[#0f2027] via-[#357e9e] to-[#478093]">
      <div className="flex justify-between items-center w-4/5 max-w-[1200px] gap-16 flex-col md:flex-row text-white">
        
        {/* Left Section */}
        <div className="bg-black/30 p-10 rounded-xl w-full md:w-[500px] text-center">
          <h2 className="mb-8 text-2xl font-semibold">Create an account</h2>
          <form className="flex flex-col gap-6">

            <div className="flex items-center border-b border-white pb-2">
              <img src={User} alt="user icon" className="w-7 h-7 mr-3 mb-1" />
              <input 
                type="text" 
                placeholder="Name" 
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
              />
            </div>

            <div className="flex items-center border-b border-white pb-2">
              <img src={User} alt="user icon" className="w-7 h-7 mr-3 mb-1" />
              <input 
                type="text" 
                placeholder="Batch" 
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
              />
            </div>

            <div className="flex items-center border-b border-white pb-2">
              <img src={User} alt="user icon" className="w-7 h-7 mr-3 mb-1" />
              <input 
                type="text" 
                placeholder="Degree" 
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
              />
            </div>

            <Link 
              to="/PersonalInfo" 
              className="mt-5 bg-[#4a9ee2] hover:bg-[#357eb5] px-5 py-3 rounded-lg text-lg font-semibold transition text-white text-center"
            >
              Next
            </Link>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center">
          <img src={Phone} alt="Phone Mockup" className="w-[300px] max-w-full mt-6 md:mt-0" />
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
