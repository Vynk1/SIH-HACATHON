import React, { useState } from "react";
import { FiUser, FiUserCheck, FiMail, FiLock, FiPhone } from "react-icons/fi";
import Phone from "../assets/phone.jpg"; // Right-side phone mockup

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted! Check console for details.");
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center font-[Poppins] bg-gradient-to-b from-[#0f2027] via-[#357e9e] to-[#478093] text-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-4/5 max-w-[1200px] gap-10">

        {/* Left Form Section */}
        <div className="bg-black/30 p-10 rounded-xl w-full md:w-[500px] text-center md:text-left">
          <h2 className="mb-8 text-2xl sm:text-3xl font-semibold">
            {step === 1 ? "Create an Account" : "Personal Information"}
          </h2>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {step === 1 ? (
              <>
                {/* Full Name */}
                <div className="flex items-center border-b border-white pb-2">
                  <FiUser className="w-7 h-7 mr-3 mb-1" />
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
                    required
                  />
                </div>

                {/* Role */}
                <div className="flex items-center border-b border-white pb-2">
                  <FiUserCheck className="w-7 h-7 mr-3 mb-1" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none outline-none text-white text-base"
                    required
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="mt-5 bg-[#4a9ee2] hover:bg-[#357eb5] px-5 py-3 rounded-lg text-lg font-semibold transition text-white w-full"
                >
                  Next
                </button>
              </>
            ) : (
              <>
                {/* Email */}
                <div className="flex items-center border-b border-white pb-2">
                  <FiMail className="w-6 h-6 mr-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
                    required
                  />
                </div>

                {/* Password */}
                <div className="flex items-center border-b border-white pb-2">
                  <FiLock className="w-6 h-6 mr-3" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
                    required
                  />
                </div>

                {/* Phone Number (Optional) */}
                <div className="flex items-center border-b border-white pb-2">
                  <FiPhone className="w-6 h-6 mr-3" />
                  <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/80 text-base"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-5">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 px-5 py-3 rounded-lg text-lg font-semibold transition text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#4a9ee2] hover:bg-[#357eb5] px-5 py-3 rounded-lg text-lg font-semibold transition text-white"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <img
            src={Phone}
            alt="Phone Mockup"
            className="w-64 sm:w-72 md:w-80 lg:w-[400px] max-w-full mt-6 md:mt-0"
          />
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
