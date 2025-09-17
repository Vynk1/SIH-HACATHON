import React, { useState } from "react";
import { FiUser, FiUserCheck, FiMail, FiLock, FiPhone, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Card } from "../components/ui";
import { UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
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

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Let's Get Started";
      case 2: return "Account Details";
      default: return "Create Account";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return "Tell us about yourself to get started";
      case 2: return "Set up your login credentials";
      default: return "Join our alumni community";
    }
  };

  return (
    <motion.div 
      className="min-h-screen w-full flex justify-center items-center font-[Poppins] bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 gap-12 relative z-10">
        
        {/* Left Form Section */}
        <motion.div 
          className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card variant="glass" padding="lg" hover={false}>
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
                  }`}
                  whileScale={{ scale: step === 1 ? 1.1 : 1 }}
                >
                  1
                </motion.div>
                <div className={`flex-1 h-1 mx-2 rounded ${
                  step >= 2 ? 'bg-blue-500' : 'bg-gray-600'
                }`} />
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
                  }`}
                  whileScale={{ scale: step === 2 ? 1.1 : 1 }}
                >
                  2
                </motion.div>
              </div>
              <motion.h2 
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                key={step}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {getStepTitle()}
              </motion.h2>
              <motion.p 
                className="text-gray-300"
                key={step}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {getStepDescription()}
              </motion.p>
            </div>

            {/* Messages */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl text-red-200 text-sm backdrop-blur-sm"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
              
              {success && (
                <motion.div 
                  className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-xl text-green-200 text-sm backdrop-blur-sm"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{success}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <Input
                      label="Full Name"
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      leftIcon={<UserIcon className="w-5 h-5" />}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Role <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300/30 hover:border-gray-300/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10 backdrop-blur-sm text-white transition-all duration-300"
                          required
                        >
                          <option value="" className="bg-gray-800 text-white">Select your role</option>
                          <option value="alumni" className="bg-gray-800 text-white">Alumni</option>
                          <option value="student" className="bg-gray-800 text-white">Student</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handleNext}
                      variant="primary"
                      size="lg"
                      className="w-full mt-8"
                      rightIcon={<FiArrowRight />}
                    >
                      Continue
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      leftIcon={<EnvelopeIcon className="w-5 h-5" />}
                    />

                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a secure password"
                      required
                      leftIcon={<LockClosedIcon className="w-5 h-5" />}
                    />

                    <Input
                      label="Phone Number (Optional)"
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      leftIcon={<PhoneIcon className="w-5 h-5" />}
                    />

                    <div className="flex gap-4 mt-8">
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="ghost"
                        size="lg"
                        className="flex-1"
                        leftIcon={<FiArrowLeft />}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="flex-1"
                        disabled={loading}
                        loading={loading}
                      >
                        {loading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
            
            {/* Login Link */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-300">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </motion.div>
          </Card>
        </motion.div>

        {/* Right Image Section */}
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.img
            src={Phone}
            alt="Phone Mockup"
            className="w-80 sm:w-96 lg:w-[500px] max-w-full"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MultiStepForm;
