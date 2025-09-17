import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../config/api";
import { Button, Input, Card, Loading, CardSkeleton } from "../components/ui";
import {
  FaUser,
  FaBook,
  FaBuilding,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTags,
  FaEdit,
  FaSave,
  FaHome,
  FaCalendarAlt,
  FaDonate,
  FaUserGraduate,
  FaSignOutAlt
} from "react-icons/fa";
import {
  UserIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  HomeIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  CheckIcon,
  TrophyIcon,
  HeartIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import search2 from "../assets/search copy.png";
import profilePic from "../assets/pfp.png";

const AlumniDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Tab management
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data states
  const [profileData, setProfileData] = useState({
    batch_year: '',
    degree: '',
    department: '',
    current_position: '',
    company: '',
    linkedin_url: '',
    location: '',
    skills: ''
  });
  const [myDonations, setMyDonations] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [events, setEvents] = useState([]);
  
  // Loading and form states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Donation form
  const [donationForm, setDonationForm] = useState({
    amount: '',
    purpose: ''
  });
  const [submittingDonation, setSubmittingDonation] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'alumni') {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, user, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch alumni profile
      try {
        const profileResponse = await api.getAlumniProfile();
        if (profileResponse.success && profileResponse.profile) {
          setProfileData({
            batch_year: profileResponse.profile.batch_year || '',
            degree: profileResponse.profile.degree || '',
            department: profileResponse.profile.department || '',
            current_position: profileResponse.profile.current_position || '',
            company: profileResponse.profile.company || '',
            linkedin_url: profileResponse.profile.linkedin_url || '',
            location: profileResponse.profile.location || '',
            skills: Array.isArray(profileResponse.profile.skills) ? profileResponse.profile.skills.join(', ') : profileResponse.profile.skills || ''
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
      
      // Fetch donations
      try {
        const donationsResponse = await api.getMyDonations();
        if (donationsResponse.success) {
          setMyDonations(donationsResponse.donations || []);
        }
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
      
      // Fetch mentorship requests
      try {
        const mentorshipResponse = await api.getMentorshipRequests();
        if (mentorshipResponse.success) {
          setMentorshipRequests(mentorshipResponse.requests || []);
        }
      } catch (err) {
        console.error('Error fetching mentorship requests:', err);
      }
      
      // Fetch events
      try {
        const eventsResponse = await api.getEvents();
        if (eventsResponse.success) {
          setEvents(eventsResponse.events || []);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Profile form handlers
  const handleProfileChange = (e, field) => {
    setProfileData({ ...profileData, [field]: e.target.value });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleProfileSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      const dataToSave = {
        ...profileData,
        skills: profileData.skills ? profileData.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : []
      };
      
      const response = await api.updateAlumniProfile(dataToSave);
      if (response.success) {
        setSuccess('Profile updated successfully!');
        setIsEditingProfile(false);
        fetchDashboardData();
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Donation handlers
  const handleDonationChange = (e, field) => {
    setDonationForm({ ...donationForm, [field]: e.target.value });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmittingDonation(true);
      setError('');
      setSuccess('');
      
      const response = await api.createDonation({
        amount: parseFloat(donationForm.amount),
        purpose: donationForm.purpose
      });
      
      if (response.success) {
        setSuccess('Donation submitted successfully!');
        setDonationForm({ amount: '', purpose: '' });
        fetchDashboardData();
      } else {
        setError(response.message || 'Failed to submit donation');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      setError(error.message || 'Failed to submit donation');
    } finally {
      setSubmittingDonation(false);
    }
  };

  // Event registration
  const handleEventRegister = async (eventId) => {
    try {
      setError('');
      setSuccess('');
      const response = await api.registerForEvent(eventId);
      if (response.success) {
        setSuccess('Successfully registered for the event!');
        fetchDashboardData();
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      setError(error.message || 'Registration failed');
    }
  };

  // Mentorship status update
  const handleMentorshipStatusUpdate = async (requestId, status) => {
    try {
      setError('');
      setSuccess('');
      const response = await api.updateMentorshipStatus(requestId, { status });
      if (response.success) {
        setSuccess(`Request ${status} successfully!`);
        fetchDashboardData();
      } else {
        setError(response.message || 'Failed to update request status');
      }
    } catch (error) {
      console.error('Error updating mentorship status:', error);
      setError(error.message || 'Failed to update request status');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  // Tab navigation instead of page navigation
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setError(''); // Clear errors when switching tabs
    setSuccess(''); // Clear success messages when switching tabs
  };

  const totalDonated = myDonations.reduce((sum, donation) => sum + (donation.amount || 0), 0);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isAuthenticated || user?.role !== 'alumni') {
    return null; // Will redirect
  }

  return (
    <motion.div 
      className="flex h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white overflow-hidden font-[Poppins] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Sidebar */}
      <motion.aside 
        className="w-60 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col p-5 relative z-10"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl text-gray-300 text-sm border border-white/20">
          <img src={search2} alt="Search" className="w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..."
            className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-400"
          />
        </div>

        <div className="mt-6 space-y-2">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: HomeIcon },
            { key: 'profile', label: 'Profile', icon: UserIcon },
            { key: 'events', label: 'Events', icon: CalendarDaysIcon },
            { key: 'donations', label: 'Donations', icon: CurrencyDollarIcon },
            { key: 'mentorship', label: 'Mentorship', icon: AcademicCapIcon }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleTabSwitch(item.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all duration-300 group ${
                  activeTab === item.key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'hover:bg-white/10 text-gray-300 hover:text-white hover:transform hover:scale-102'
                }`}
                whileHover={{ scale: activeTab === item.key ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {activeTab === item.key && (
                  <motion.div
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-auto">
          <div 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer hover:bg-[#2a324d] text-sm text-gray-400 hover:text-white transition mb-4"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            Logout
          </div>
          <div className="flex items-center gap-2">
            <img src={profilePic} alt="User" className="w-9 h-9 rounded-full" />
            <div>
              <div className="font-bold">{user?.full_name?.split(' ')[0] || 'Alumni'}</div>
              <div className="text-xs text-gray-400">Alumni Member</div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main 
        className="flex-1 p-8 overflow-y-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Alumni Portal
            </h1>
            <p className="text-gray-300 mt-2">Welcome back, {user?.full_name?.split(' ')[0] || 'Alumni'}!</p>
          </div>
          <Card variant="glass" padding="md" hover={false}>
            <div className="text-center">
              <p className="text-sm text-gray-400">Class of</p>
              <p className="font-semibold text-lg">
                {profileData?.batch_year || 'Alumni'}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Messages */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl text-red-200 backdrop-blur-sm"
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
              className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-xl text-green-200 backdrop-blur-sm"
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

        {/* Loading State */}
        {loading ? (
          <Loading type="spinner" size="lg" color="white" message="Loading alumni data..." />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Profile Header */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card variant="glass" padding="lg">
                  <div className="flex items-center gap-6">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full border-2 border-blue-400/30" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        {user?.full_name || 'Alumni User'}
                      </h2>
                      <p className="text-gray-400 text-lg mt-1">
                        {profileData?.batch_year ? `Class of ${profileData.batch_year}` : 'Alumni'}
                        {profileData?.degree && `, ${profileData.degree}`}
                      </p>
                      {profileData?.current_position && profileData?.company && (
                        <p className="text-blue-300 text-sm mt-1 flex items-center gap-1">
                          <BuildingOfficeIcon className="w-4 h-4" />
                          {profileData.current_position} at {profileData.company}
                        </p>
                      )}
                      {profileData?.location && (
                        <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4" />
                          {profileData.location}
                        </p>
                      )}
                    </div>
                    <Button 
                      onClick={() => handleTabSwitch('profile')}
                      variant="glass"
                      className="flex items-center gap-2"
                    >
                      <PencilIcon className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </div>
                </Card>
                
                <Card variant="glass" padding="lg">
                  <Card.Header>
                    <Card.Title className="flex items-center gap-2">
                      <TrophyIcon className="w-5 h-5 text-yellow-400" />
                      My Achievement Score
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <div className="text-center">
                      <motion.div 
                        className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {Math.floor((totalDonated * 2) + (mentorshipRequests.length * 10) + (events.length * 0.5))}
                      </motion.div>
                      <div className="text-sm text-gray-400">Alumni Score</div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    title: 'Total Donations', 
                    value: `$${totalDonated.toFixed(2)}`, 
                    icon: CurrencyDollarIcon, 
                    color: 'from-green-500 to-emerald-600',
                    bgColor: 'bg-green-500/10'
                  },
                  { 
                    title: 'Available Events', 
                    value: events.length, 
                    icon: CalendarDaysIcon, 
                    color: 'from-blue-500 to-blue-600',
                    bgColor: 'bg-blue-500/10'
                  },
                  { 
                    title: 'Mentorship Requests', 
                    value: mentorshipRequests.length, 
                    icon: AcademicCapIcon, 
                    color: 'from-purple-500 to-purple-600',
                    bgColor: 'bg-purple-500/10'
                  },
                  { 
                    title: 'Network Score', 
                    value: Math.floor(totalDonated + mentorshipRequests.length * 5), 
                    icon: SparklesIcon, 
                    color: 'from-pink-500 to-rose-600',
                    bgColor: 'bg-pink-500/10'
                  }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card variant="glass" padding="lg" className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-xl mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm text-gray-400 mb-1">{stat.title}</div>
                        <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Activity & Actions */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card variant="glass" padding="lg">
                  <Card.Header>
                    <Card.Title className="flex items-center gap-2">
                      <HeartIcon className="w-5 h-5" />
                      Recent Activity
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-3">
                      {myDonations.slice(0, 4).map((donation, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div>
                            <div className="font-medium text-white">${donation.amount}</div>
                            <div className="text-sm text-gray-400">{donation.purpose}</div>
                          </div>
                          <div className="text-xs text-green-400">Donated</div>
                        </motion.div>
                      ))}
                      {myDonations.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4">No recent activity</p>
                      )}
                    </div>
                  </Card.Body>
                </Card>
                
                <Card variant="glass" padding="lg">
                  <Card.Header>
                    <Card.Title>Quick Actions</Card.Title>
                    <Card.Description>What would you like to do today?</Card.Description>
                  </Card.Header>
                  <Card.Body>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { 
                          label: 'View Events', 
                          action: () => handleTabSwitch('events'),
                          color: 'from-blue-500 to-blue-600',
                          icon: CalendarDaysIcon
                        },
                        { 
                          label: 'Make Donation', 
                          action: () => handleTabSwitch('donations'),
                          color: 'from-green-500 to-emerald-600',
                          icon: CurrencyDollarIcon
                        },
                        { 
                          label: 'Mentorship Hub', 
                          action: () => handleTabSwitch('mentorship'),
                          color: 'from-purple-500 to-purple-600',
                          icon: AcademicCapIcon
                        }
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={index}
                            onClick={item.action}
                            className={`w-full bg-gradient-to-r ${item.color} hover:shadow-lg text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3 font-medium`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Icon className="w-5 h-5" />
                            {item.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </div>
          )}

          {activeTab === 'profile' && (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    My Profile
                  </h2>
                  <p className="text-gray-400 mt-1">Manage your professional information</p>
                </div>
                <Button
                  onClick={isEditingProfile ? handleProfileSave : () => setIsEditingProfile(true)}
                  disabled={saving}
                  variant={isEditingProfile ? "primary" : "glass"}
                  className="flex items-center gap-2"
                >
                  {saving ? (
                    <Loading type="spinner" size="sm" color="white" />
                  ) : isEditingProfile ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <PencilIcon className="w-4 h-4" />
                  )}
                  {saving ? "Saving..." : isEditingProfile ? "Save Changes" : "Edit Profile"}
                </Button>
              </motion.div>

              {/* Professional Information */}
              <Card variant="glass" padding="lg">
                <Card.Header>
                  <Card.Title className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5" />
                    Professional Information
                  </Card.Title>
                  <Card.Description>Your academic and career details</Card.Description>
                </Card.Header>
                <Card.Body>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Batch Year", field: "batch_year", type: "number", icon: AcademicCapIcon, placeholder: "e.g. 2020" },
                      { label: "Degree", field: "degree", type: "text", icon: AcademicCapIcon, placeholder: "e.g. B.Tech Computer Science" },
                      { label: "Department", field: "department", type: "text", icon: AcademicCapIcon, placeholder: "e.g. Computer Science" },
                      { label: "Current Position", field: "current_position", type: "text", icon: UserIcon, placeholder: "e.g. Software Engineer" },
                      { label: "Company", field: "company", type: "text", icon: BuildingOfficeIcon, placeholder: "e.g. Google Inc." },
                      { label: "Location", field: "location", type: "text", icon: MapPinIcon, placeholder: "e.g. San Francisco, CA" },
                    ].map((field, idx) => {
                      const Icon = field.icon;
                      return (
                        <motion.div 
                          key={idx} 
                          className="space-y-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                        >
                          <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                            <Icon className="w-4 h-4" /> {field.label}
                          </label>
                          {isEditingProfile ? (
                            <Input
                              type={field.type}
                              value={profileData[field.field]}
                              onChange={(e) => handleProfileChange(e, field.field)}
                              placeholder={field.placeholder}
                              disabled={saving}
                              className="bg-white/5 border-white/20"
                            />
                          ) : (
                            <div className="h-12 px-4 flex items-center rounded-lg bg-white/5 border border-white/10 text-gray-300">
                              {profileData[field.field] || <span className="text-gray-500">Not specified</span>}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
              
              {/* Social & Skills */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card variant="glass" padding="lg">
                  <Card.Header>
                    <Card.Title className="flex items-center gap-2">
                      <FaLinkedin className="w-5 h-5 text-blue-400" />
                      LinkedIn Profile
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {isEditingProfile ? (
                      <Input
                        type="url"
                        value={profileData.linkedin_url}
                        onChange={(e) => handleProfileChange(e, 'linkedin_url')}
                        placeholder="https://linkedin.com/in/yourprofile"
                        disabled={saving}
                        className="bg-white/5 border-white/20"
                      />
                    ) : (
                      <div className="h-12 px-4 flex items-center rounded-lg bg-white/5 border border-white/10">
                        {profileData.linkedin_url ? (
                          <a 
                            href={profileData.linkedin_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                          >
                            <FaLinkedin className="w-4 h-4" />
                            View Profile
                          </a>
                        ) : (
                          <span className="text-gray-500">No LinkedIn profile added</span>
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
                
                <Card variant="glass" padding="lg">
                  <Card.Header>
                    <Card.Title className="flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5" />
                      Skills & Expertise
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {isEditingProfile ? (
                      <Input
                        type="text"
                        value={profileData.skills}
                        onChange={(e) => handleProfileChange(e, 'skills')}
                        placeholder="e.g. React, Node.js, Python (comma separated)"
                        disabled={saving}
                        className="bg-white/5 border-white/20"
                      />
                    ) : (
                      <div className="min-h-12 px-4 py-3 rounded-lg bg-white/5 border border-white/10">
                        {profileData.skills ? (
                          <div className="flex flex-wrap gap-2">
                            {profileData.skills.split(',').map((skill, index) => (
                              <motion.span 
                                key={index} 
                                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm text-white font-medium"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                              >
                                {skill.trim()}
                              </motion.span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-500">No skills added yet</span>
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>
              
              {/* Account Information */}
              <Card variant="glass" padding="lg">
                <Card.Header>
                  <Card.Title>Account Information</Card.Title>
                  <Card.Description>Your basic account details</Card.Description>
                </Card.Header>
                <Card.Body>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Full Name", value: user?.full_name },
                      { label: "Email Address", value: user?.email },
                      { label: "Phone Number", value: user?.phone_number },
                      { label: "Account Type", value: user?.role }
                    ].map((item, index) => item.value && (
                      <motion.div 
                        key={index}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <label className="text-sm font-medium text-gray-400">{item.label}</label>
                        <div className="h-12 px-4 flex items-center rounded-lg bg-white/5 border border-white/10 text-gray-300">
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                    <p className="text-sm text-blue-200 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Account information can only be changed by contacting support.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'events' && (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Alumni Events
                </h2>
                <p className="text-gray-400 mt-2">Connect with fellow alumni and expand your network</p>
              </motion.div>

              {events.length > 0 ? (
                <motion.div 
                  className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {events.map((event, index) => (
                    <motion.div
                      key={event._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card variant="glass" padding="lg" className="h-full flex flex-col">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-white leading-tight">
                              {event.title || 'Untitled Event'}
                            </h3>
                            <div className="ml-2 px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                              Upcoming
                            </div>
                          </div>
                          
                          {event.description && (
                            <p className="text-gray-300 mb-4 text-sm line-clamp-3">
                              {event.description}
                            </p>
                          )}
                          
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <div className="flex items-center gap-2">
                                <MapPinIcon className="w-4 h-4 text-blue-400" />
                                <span>{event.location || 'Location TBD'}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <div className="flex items-center gap-2">
                                <CalendarDaysIcon className="w-4 h-4 text-green-400" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                            </div>
                            
                            {event.time && (
                              <div className="flex items-center gap-3 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                  </svg>
                                  <span>{event.time}</span>
                                </div>
                              </div>
                            )}
                            
                            {event.max_participants && (
                              <div className="flex items-center gap-3 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                  <UserIcon className="w-4 h-4 text-purple-400" />
                                  <span>Max: {event.max_participants} participants</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleEventRegister(event._id)}
                          variant="primary"
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300"
                        >
                          Register for Event
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card variant="glass" padding="xl" className="max-w-md mx-auto">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CalendarDaysIcon className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">No Events Available</h3>
                      <p className="text-gray-400">Check back soon for exciting alumni events and networking opportunities!</p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'donations' && (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Support Your Alma Mater
                </h2>
                <p className="text-gray-400 mt-2">Make a meaningful contribution to help future generations</p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Donation Form */}
                <motion.div 
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card variant="glass" padding="lg">
                    <Card.Header>
                      <Card.Title className="flex items-center gap-2">
                        <HeartIcon className="w-5 h-5 text-red-400" />
                        Make a Donation
                      </Card.Title>
                      <Card.Description>Your contribution makes a difference in the lives of students</Card.Description>
                    </Card.Header>
                    <Card.Body>
                      <form onSubmit={handleDonationSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              <CurrencyDollarIcon className="w-4 h-4 inline mr-1" />
                              Amount ($) *
                            </label>
                            <Input
                              type="number"
                              value={donationForm.amount}
                              onChange={(e) => handleDonationChange(e, 'amount')}
                              placeholder="Enter amount"
                              min="1"
                              step="0.01"
                              required
                              disabled={submittingDonation}
                              className="bg-white/5 border-white/20"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              <SparklesIcon className="w-4 h-4 inline mr-1" />
                              Purpose *
                            </label>
                            <Input
                              type="text"
                              value={donationForm.purpose}
                              onChange={(e) => handleDonationChange(e, 'purpose')}
                              placeholder="e.g., Scholarship Fund, Infrastructure"
                              required
                              disabled={submittingDonation}
                              className="bg-white/5 border-white/20"
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          disabled={submittingDonation}
                          variant="primary"
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        >
                          {submittingDonation ? (
                            <><Loading type="spinner" size="sm" color="white" /> Processing...</>
                          ) : (
                            <>💝 Submit Donation</>
                          )}
                        </Button>
                      </form>
                    </Card.Body>
                  </Card>
                </motion.div>
                
                {/* Impact Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card variant="glass" padding="lg" className="h-fit">
                    <Card.Header>
                      <Card.Title className="text-center">Your Impact</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-center space-y-4">
                        <motion.div 
                          className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          ${totalDonated.toFixed(2)}
                        </motion.div>
                        <div className="text-sm text-gray-400">Total Contributed</div>
                        <div className="border-t border-white/10 pt-4">
                          <div className="text-lg font-semibold text-white">{myDonations.length}</div>
                          <div className="text-sm text-gray-400">Donations Made</div>
                        </div>
                        
                        {/* Suggested Amounts */}
                        <div className="border-t border-white/10 pt-4">
                          <div className="text-sm font-medium text-gray-300 mb-3">Quick Select</div>
                          <div className="grid grid-cols-2 gap-2">
                            {['25', '50', '100', '250'].map((amount) => (
                              <motion.button
                                key={amount}
                                onClick={() => handleDonationChange({target: {value: amount}}, 'amount')}
                                className="py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors border border-white/10"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                ${amount}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </div>
              
              {/* Donation History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card variant="glass" padding="lg">
                  <Card.Header>
                    <Card.Title className="flex items-center gap-2">
                      <CurrencyDollarIcon className="w-5 h-5" />
                      Donation History
                    </Card.Title>
                    <Card.Description>Track your contributions and their impact</Card.Description>
                  </Card.Header>
                  <Card.Body>
                    {myDonations.length > 0 ? (
                      <div className="space-y-4">
                        {myDonations.map((donation, index) => (
                          <motion.div 
                            key={donation._id || index} 
                            className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="text-xl font-bold text-green-400">
                                    ${donation.amount}
                                  </div>
                                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    donation.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                                    donation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                                    'bg-gray-500/20 text-gray-300 border border-gray-400/30'
                                  }`}>
                                    {donation.status || 'Submitted'}
                                  </div>
                                </div>
                                <div className="text-white font-medium mb-1">{donation.purpose}</div>
                                <div className="text-sm text-gray-400 flex items-center gap-1">
                                  <CalendarDaysIcon className="w-4 h-4" />
                                  {formatDate(donation.createdAt || donation.date)}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                                  <HeartIcon className="w-4 h-4 text-green-400" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div 
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CurrencyDollarIcon className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Start Your Giving Journey</h3>
                        <p className="text-gray-400">Your first donation will appear here. Every contribution makes a difference!</p>
                      </motion.div>
                    )}
                  </Card.Body>
                </Card>
              </motion.div>
            </motion.div>
          )}
          
          {activeTab === 'mentorship' && (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Mentorship Hub
                </h2>
                <p className="text-gray-400 mt-2">Guide the next generation of professionals</p>
              </motion.div>

              {mentorshipRequests.length > 0 ? (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {mentorshipRequests.map((request, index) => (
                    <motion.div
                      key={request._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card variant="glass" padding="lg">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center font-bold text-lg">
                              {(request.student_name || 'A').charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                {request.student_name || 'Anonymous Student'}
                              </h3>
                              <p className="text-gray-400 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                                {request.student_email || 'No email provided'}
                              </p>
                            </div>
                          </div>
                          <div className={`px-4 py-2 rounded-full text-sm font-medium border ${
                            request.status === 'approved' ? 'bg-green-500/20 text-green-300 border-green-400/30' :
                            request.status === 'rejected' ? 'bg-red-500/20 text-red-300 border-red-400/30' :
                            'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                          }`}>
                            {request.status === 'approved' ? '✓ Approved' :
                             request.status === 'rejected' ? '✗ Rejected' :
                             '⏳ Pending'}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                              <AcademicCapIcon className="w-4 h-4" />
                              Topic
                            </h4>
                            <p className="text-gray-300 p-3 bg-white/5 rounded-lg border border-white/10">
                              {request.topic || 'General mentorship'}
                            </p>
                          </div>
                          
                          {request.preferred_time && (
                            <div>
                              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                Preferred Time
                              </h4>
                              <p className="text-gray-300 p-3 bg-white/5 rounded-lg border border-white/10">
                                {request.preferred_time}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {request.description && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                              </svg>
                              Description
                            </h4>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                              <p className="text-gray-300 leading-relaxed">{request.description}</p>
                            </div>
                          </div>
                        )}
                        
                        {request.status === 'pending' && (
                          <div className="flex gap-4">
                            <Button
                              onClick={() => handleMentorshipStatusUpdate(request._id, 'approved')}
                              variant="primary"
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                            >
                              <CheckIcon className="w-4 h-4 mr-2" />
                              Accept Request
                            </Button>
                            <Button
                              onClick={() => handleMentorshipStatusUpdate(request._id, 'rejected')}
                              variant="secondary"
                              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-red-400/30"
                            >
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              Decline
                            </Button>
                          </div>
                        )}
                        
                        {request.status === 'approved' && (
                          <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                            <p className="text-green-200 text-sm flex items-center gap-2">
                              <CheckIcon className="w-4 h-4" />
                              You have accepted this mentorship request. The student can now reach out to you directly.
                            </p>
                          </div>
                        )}
                        
                        {request.status === 'rejected' && (
                          <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4">
                            <p className="text-red-200 text-sm flex items-center gap-2">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              You have declined this mentorship request.
                            </p>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card variant="glass" padding="xl" className="max-w-md mx-auto">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto">
                        <AcademicCapIcon className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">No Mentorship Requests</h3>
                      <p className="text-gray-400">Students haven't reached out yet. When they do, you'll be able to guide the next generation of professionals!</p>
                      <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mt-6">
                        <p className="text-blue-200 text-sm flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          Make sure your profile is complete to attract mentorship requests.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
          </motion.div>
        )}
      </motion.main>
    </motion.div>
  );
};

export default AlumniDashboard;
