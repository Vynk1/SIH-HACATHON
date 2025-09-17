import Globe from "../assets/logo.png";
import google from "../assets/google.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input } from "../components/ui";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import AuthDebugger from "../components/AuthDebugger";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || '/';
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('🔐 Starting login process with:', { email: formData.email });
      const result = await login(formData);
      console.log('🔐 Login result:', result);
      
      if (result.success) {
        console.log('✅ Login successful! User role:', result.user.role);
        
        // Redirect based on user role (roles are lowercase in database)
        let redirectPath;
        switch (result.user.role) {
          case 'admin':
            redirectPath = '/adminDash';
            console.log('🔄 Redirecting admin to:', redirectPath);
            break;
          case 'alumni':
            redirectPath = '/alumnidash';
            console.log('🔄 Redirecting alumni to:', redirectPath);
            break;
          case 'student':
            redirectPath = '/studentdash';
            console.log('🔄 Redirecting student to:', redirectPath);
            break;
          default:
            redirectPath = from === '/login' ? '/' : from; // Fallback to home or intended page
            console.log('🔄 Using fallback redirect to:', redirectPath);
        }
        
        console.log('🚀 About to navigate to:', redirectPath);
        navigate(redirectPath, { replace: true });
      } else {
        console.log('❌ Login failed - result.success is false');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white font-[Poppins] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
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

      <AuthDebugger />
      
      {/* Left Section - Form */}
      <motion.div 
        className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 py-12 relative z-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Welcome Text */}
        <motion.div 
          className="text-center md:text-left mb-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-base sm:text-lg">
            Welcome back! Please enter your details to continue.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form 
          className="flex flex-col items-center md:items-start w-full max-w-md mx-auto md:mx-0" 
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                className="w-full mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl text-red-200 text-sm backdrop-blur-sm"
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
          </AnimatePresence>
          
          {/* Email Input */}
          <div className="w-full mb-6">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
              leftIcon={<EnvelopeIcon className="w-5 h-5" />}
            />
          </div>

          {/* Password Input */}
          <div className="w-full mb-8">
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
              leftIcon={<LockClosedIcon className="w-5 h-5" />}
            />
          </div>

          {/* Sign In Button */}
          <div className="w-full mb-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
              loading={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative w-full mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-gray-300">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <div className="w-full mb-6">
            <Button
              type="button" 
              variant="outline"
              size="lg"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              leftIcon={<img src={google} alt="Google" className="w-5 h-5" />}
            >
              Continue with Google
            </Button>
          </div>

          {/* Signup Text */}
          <motion.p 
            className="text-sm text-center text-gray-300"
            whileHover={{ scale: 1.02 }}
          >
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
            >
              Sign up for free
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>

      {/* Right Section - Logo & Text */}
      <motion.div 
        className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12 relative z-10"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.img 
          src={Globe} 
          alt="Logo" 
          className="w-48 sm:w-64 md:w-80 lg:w-[400px] mb-8"
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.h1 
          className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          ALUMNI <br /> CONNECT
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-300 font-medium max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Stay connected, grow together, and build lasting relationships with your alma mater.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default Login;
