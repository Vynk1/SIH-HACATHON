import React, { useState } from "react";
import { FiUser, FiUserCheck, FiMail, FiLock, FiPhone } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleNext = () => {
    if (!formData.full_name || !formData.role) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setStep(2);
  };
  
  const handleBack = () => {
    setStep(1);
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await register(formData);
      if (result.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center font-[Poppins] bg-gradient-to-b from-[#0f2027] via-[#357e9e] to-[#478093] text-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-4/5 max-w-[1200px] gap-10">

        {/* Left Form Section */}
        <div className="bg-black/30 p-10 rounded-xl w-full md:w-[500px] text-center md:text-left">
          <h2 className="mb-8 text-2xl sm:text-3xl font-semibold">
            {step === 1 ? "Create an Account" : "Personal Information"}
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}
          
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-xl text-green-200 text-sm">
              {success}
            </div>
          )}

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
                    <option value="student">Student</option>
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
                    disabled={loading}
                    className="flex-1 bg-[#4a9ee2] hover:bg-[#357eb5] px-5 py-3 rounded-lg text-lg font-semibold transition text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Submit'}
                  </button>
                </div>
              </>
            )}
          </form>
          
          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-[14px] sm:text-[15px] text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-[#4a9ee2] hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
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
