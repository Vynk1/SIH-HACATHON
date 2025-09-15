import Globe from "../assets/logo.png";
import google from "../assets/google.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
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
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-b from-[#0F2027] via-[#357E9E] to-[#478093] text-white font-[Poppins]">
      <AuthDebugger />
      
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
        <form className="flex flex-col items-center md:items-start w-full" onSubmit={handleSubmit}>
          
          {/* Error Message */}
          {error && (
            <div className="w-full md:w-[380px] mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}
          
          {/* Email */}
          <label className="text-sm sm:text-base mb-2 w-full md:w-[380px] text-left">
            Email
          </label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email" 
            className="w-full md:w-[380px] p-3 rounded-xl mb-5 text-black text-[15px] shadow-md focus:outline-none border border-transparent hover:border-white transition"
            required
            disabled={loading}
          />

          {/* Password */}
          <label className="text-sm sm:text-base mb-2 w-full md:w-[380px] text-left">
            Password
          </label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********" 
            className="w-full md:w-[380px] p-3 rounded-xl mb-5 text-black text-[15px] shadow-md focus:outline-none border border-transparent hover:border-white transition"
            required
            disabled={loading}
          />

          {/* Options
          <div className="flex flex-col sm:flex-row justify-between items-center w-full md:w-[380px] text-[14px] mb-5 gap-2 sm:gap-0">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#4A9EE2]" /> Remember me
            </label>
            <a href="#" className="text-[#4A9EE2] hover:underline">Forgot password?</a>
          </div> */}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-[380px] cursor-pointer text-center bg-[#4A9EE2] text-white py-3 rounded-xl font-medium mb-4 shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          {/* Google Button */}
          <button 
            type="button" 
            className="w-full md:w-[380px] flex justify-center items-center bg-white text-black py-3 rounded-xl font-medium mb-4 shadow-md hover:opacity-90 transition"
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
    </div>
  );
}

export default Login;
