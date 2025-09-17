import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../config/api";
import { Button, Input, Card, Loading, CardSkeleton } from "../components/ui";
import {
  FaUser,
  FaUserGraduate,
  FaCalendarAlt,
  FaHome,
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
  FaBuilding,
  FaBook,
  FaTags,
  FaHandshake,
  FaPaperPlane,
  FaClock,
  FaCheckCircle
} from "react-icons/fa";
import {
  UserIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  CheckIcon,
  UsersIcon,
  HandRaisedIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  TrophyIcon,
  HeartIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import search2 from "../assets/search copy.png";
import profilePic from "../assets/pfp.png";

const StudentDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Tab management
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data states
  const [profileData, setProfileData] = useState({
    batch_year: '',
    degree: '',
    department: '',
    current_semester: '',
    interests: '',
    career_goals: '',
    gpa: '',
    skills: ''
  });
  const [availableMentors, setAvailableMentors] = useState([]);
  const [myMentorshipRequests, setMyMentorshipRequests] = useState([]);
  const [events, setEvents] = useState([]);
  
  // Loading and form states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Mentorship request form
  const [mentorshipForm, setMentorshipForm] = useState({
    mentor_id: '',
    message: '',
    preferred_meeting_type: 'virtual'
  });
  const [submittingRequest, setSubmittingRequest] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'student') {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, user, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch student profile
      try {
        const profileResponse = await api.getStudentProfile();
        if (profileResponse.success && profileResponse.profile) {
          setProfileData({
            batch_year: profileResponse.profile.batch_year || '',
            degree: profileResponse.profile.degree || '',
            department: profileResponse.profile.department || '',
            current_semester: profileResponse.profile.current_semester || '',
            interests: profileResponse.profile.interests || '',
            career_goals: profileResponse.profile.career_goals || '',
            gpa: profileResponse.profile.gpa || '',
            skills: Array.isArray(profileResponse.profile.skills) 
              ? profileResponse.profile.skills.join(', ') 
              : profileResponse.profile.skills || ''
          });
        }
      } catch (err) {
        console.error('Error fetching student profile:', err);
      }
      
      // Fetch available mentors
      try {
        const mentorsResponse = await api.getAvailableMentors();
        if (mentorsResponse.success) {
          setAvailableMentors(mentorsResponse.mentors || []);
        }
      } catch (err) {
        console.error('Error fetching mentors:', err);
      }
      
      // Fetch my mentorship requests
      try {
        const requestsResponse = await api.getMyMentorshipRequests();
        if (requestsResponse.success) {
          setMyMentorshipRequests(requestsResponse.requests || []);
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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
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
        skills: profileData.skills 
          ? profileData.skills.split(',').map(skill => skill.trim()).filter(skill => skill) 
          : []
      };
      
      const response = await api.updateStudentProfile(dataToSave);
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

  // Mentorship request handlers
  const handleMentorshipRequestSubmit = async (mentorId) => {
    try {
      setSubmittingRequest(true);
      setError('');
      setSuccess('');
      
      const response = await api.createMentorshipRequest({
        mentor_id: mentorId,
        message: mentorshipForm.message,
        preferred_meeting_type: mentorshipForm.preferred_meeting_type
      });
      
      if (response.success) {
        setSuccess('Mentorship request sent successfully!');
        setMentorshipForm({ mentor_id: '', message: '', preferred_meeting_type: 'virtual' });
        fetchDashboardData();
      } else {
        setError(response.message || 'Failed to send mentorship request');
      }
    } catch (error) {
      console.error('Error sending mentorship request:', error);
      setError(error.message || 'Failed to send mentorship request');
    } finally {
      setSubmittingRequest(false);
    }
  };

  if (!isAuthenticated || user?.role !== 'student') {
    return null; // Will redirect
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardTab();
      case 'mentors':
        return renderMentorsTab();
      case 'requests':
        return renderRequestsTab();
      case 'events':
        return renderEventsTab();
      case 'profile':
        return renderProfileTab();
      default:
        return renderDashboardTab();
    }
  };

  const renderDashboardTab = () => (
    <div className="space-y-8">
      {/* Profile Welcome Card */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="lg:col-span-2">
          <Card variant="glass" padding="lg">
            <div className="flex items-center gap-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full border-2 border-indigo-400/30" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
              </motion.div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  {user?.full_name || 'Student'}
                </h2>
                <p className="text-gray-400 text-lg mt-1">
                  {profileData?.degree || 'Student'}
                  {profileData?.department && ` • ${profileData.department}`}
                </p>
                <p className="text-indigo-300 text-sm mt-1 flex items-center gap-1">
                  <AcademicCapIcon className="w-4 h-4" />
                  {profileData?.current_semester ? `Semester ${profileData.current_semester}` : 'Current Student'}
                  {profileData?.gpa && ` • GPA: ${profileData.gpa}`}
                </p>
              </div>
              <Button 
                onClick={() => setActiveTab('profile')}
                variant="glass"
                className="flex items-center gap-2"
              >
                <PencilIcon className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </Card>
        </div>
        
        <Card variant="glass" padding="lg">
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              Student Score
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
                {Math.floor(
                  (myMentorshipRequests.filter(req => req.status === 'accepted').length * 20) +
                  (events.length * 2) +
                  (profileData?.gpa ? parseFloat(profileData.gpa) * 25 : 0)
                )}
              </motion.div>
              <div className="text-sm text-gray-400">Engagement Score</div>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Available Mentors', 
            value: availableMentors.length, 
            icon: UsersIcon, 
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-500/10'
          },
          { 
            title: 'My Requests', 
            value: myMentorshipRequests.length, 
            icon: HandRaisedIcon, 
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/10'
          },
          { 
            title: 'Accepted Requests', 
            value: myMentorshipRequests.filter(req => req.status === 'accepted').length, 
            icon: CheckIcon, 
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-500/10'
          },
          { 
            title: 'Upcoming Events', 
            value: events.length, 
            icon: CalendarDaysIcon, 
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
      
      {/* Activities */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card variant="glass" padding="lg">
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <TrophyIcon className="w-5 h-5 text-yellow-400" />
              Featured Mentors
            </Card.Title>
            <Card.Description>Connect with industry professionals</Card.Description>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              {availableMentors.slice(0, 4).map((mentor, index) => (
                <motion.div 
                  key={mentor._id || index} 
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveTab('mentors')}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {mentor.full_name?.charAt(0) || 'M'}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{mentor.full_name || 'Unknown'}</div>
                    <div className="text-sm text-gray-400">{mentor.current_position || 'Professional'}</div>
                    <div className="text-xs text-indigo-300">{mentor.company || 'Industry Expert'}</div>
                  </div>
                  <div className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                    View
                  </div>
                </motion.div>
              ))}
            </div>
            {availableMentors.length > 4 && (
              <Button
                onClick={() => setActiveTab('mentors')}
                variant="glass"
                className="w-full mt-4"
              >
                View All {availableMentors.length} Mentors
              </Button>
            )}
          </Card.Body>
        </Card>
        
        <Card variant="glass" padding="lg">
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Recent Requests
            </Card.Title>
            <Card.Description>Track your mentorship journey</Card.Description>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              {myMentorshipRequests.slice(0, 4).map((request, index) => (
                <motion.div 
                  key={request._id || index} 
                  className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-white">
                      {request.mentor?.full_name || 'Unknown Mentor'}
                    </div>
                    <div className={`px-2 py-1 text-xs rounded-full font-medium ${
                      request.status === 'accepted' ? 'bg-green-500/20 text-green-300' :
                      request.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {request.status === 'accepted' ? '✓ Accepted' :
                       request.status === 'rejected' ? '✗ Declined' :
                       '⏳ Pending'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 truncate">
                    {request.message?.substring(0, 60) || 'No message'}
                    {request.message?.length > 60 && '...'}
                  </div>
                </motion.div>
              ))}
              {myMentorshipRequests.length === 0 && (
                <div className="text-center py-6">
                  <HandRaisedIcon className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No requests yet. Start connecting!</p>
                </div>
              )}
            </div>
            <Button
              onClick={() => setActiveTab('requests')}
              variant="glass"
              className="w-full mt-4"
            >
              {myMentorshipRequests.length > 0 ? 'View All Requests' : 'Start Networking'}
            </Button>
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );

  const renderMentorsTab = () => (
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
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
          Find Your Mentor
        </h2>
        <p className="text-gray-400 mt-2">Connect with industry professionals and alumni experts</p>
      </motion.div>

      {availableMentors.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {availableMentors.map((mentor, index) => {
            const isRequested = myMentorshipRequests.some(req => 
              req.mentor_id === mentor._id || req.mentor?._id === mentor._id
            );
            
            return (
              <motion.div
                key={mentor._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg" className="h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-xl">
                      {mentor.full_name?.charAt(0) || 'M'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white">{mentor.full_name || 'Unknown'}</h3>
                      <p className="text-sm text-indigo-300">{mentor.current_position || 'Professional'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <BuildingOfficeIcon className="w-4 h-4 text-blue-400" />
                      <span>{mentor.company || 'Industry Expert'}</span>
                    </div>
                    
                    {mentor.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPinIcon className="w-4 h-4 text-green-400" />
                        <span>{mentor.location}</span>
                      </div>
                    )}
                    
                    {mentor.department && (
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <AcademicCapIcon className="w-4 h-4 text-purple-400" />
                        <span>{mentor.department}</span>
                      </div>
                    )}
                    
                    {mentor.skills && (
                      <div className="flex items-start gap-2 text-sm text-gray-300">
                        <SparklesIcon className="w-4 h-4 text-yellow-400 mt-0.5" />
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(mentor.skills) ? mentor.skills : mentor.skills.split(','))
                            .slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {mentor.linkedin_url && (
                      <div className="flex items-center gap-2 text-sm">
                        <FaLinkedin className="w-4 h-4 text-blue-400" />
                        <a 
                          href={mentor.linkedin_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          View LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => {
                      setMentorshipForm({ 
                        mentor_id: mentor._id, 
                        message: '', 
                        preferred_meeting_type: 'virtual' 
                      });
                      if (isRequested) {
                        setError('You already have a request with this mentor');
                        return;
                      }
                      setActiveTab('request-form');
                    }}
                    disabled={isRequested}
                    variant={isRequested ? "secondary" : "primary"}
                    className={`w-full ${isRequested ? 'opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'}`}
                  >
                    {isRequested ? (
                      <>
                        <CheckIcon className="w-4 h-4 mr-2" />
                        Request Sent
                      </>
                    ) : (
                      <>
                        <HandRaisedIcon className="w-4 h-4 mr-2" />
                        Connect with Mentor
                      </>
                    )}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
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
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                <UsersIcon className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">No Mentors Available</h3>
              <p className="text-gray-400">Check back soon for experienced professionals ready to guide your journey!</p>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Mentorship Request Form Modal */}
      <AnimatePresence>
        {mentorshipForm.mentor_id && activeTab === 'request-form' && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setMentorshipForm({ mentor_id: '', message: '', preferred_meeting_type: 'virtual' });
                setActiveTab('mentors');
              }
            }}
          >
            <motion.div 
              className="bg-black/40 backdrop-blur-xl border border-white/20 p-6 rounded-2xl max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  Send Mentorship Request
                </h3>
                <button
                  onClick={() => {
                    setMentorshipForm({ mentor_id: '', message: '', preferred_meeting_type: 'virtual' });
                    setActiveTab('mentors');
                  }}
                  className="w-6 h-6 text-gray-400 hover:text-white transition-colors"
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <ClockIcon className="w-4 h-4 inline mr-2" />
                    Meeting Preference
                  </label>
                  <select
                    value={mentorshipForm.preferred_meeting_type}
                    onChange={(e) => setMentorshipForm({
                      ...mentorshipForm, 
                      preferred_meeting_type: e.target.value
                    })}
                    className="w-full bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="virtual" className="bg-gray-800">Virtual Meeting</option>
                    <option value="in-person" className="bg-gray-800">In-Person Meeting</option>
                    <option value="phone" className="bg-gray-800">Phone Call</option>
                    <option value="flexible" className="bg-gray-800">Flexible</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-2" />
                    Your Message
                  </label>
                  <textarea
                    value={mentorshipForm.message}
                    onChange={(e) => setMentorshipForm({
                      ...mentorshipForm, 
                      message: e.target.value
                    })}
                    placeholder="Introduce yourself and explain what you hope to learn from this mentorship..."
                    className="w-full bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => handleMentorshipRequestSubmit(mentorshipForm.mentor_id)}
                  disabled={submittingRequest || !mentorshipForm.message.trim()}
                  variant="primary"
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  {submittingRequest ? (
                    <><Loading type="spinner" size="sm" color="white" /> Sending...</>
                  ) : (
                    <>📩 Send Request</>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setMentorshipForm({ mentor_id: '', message: '', preferred_meeting_type: 'virtual' });
                    setActiveTab('mentors');
                  }}
                  variant="secondary"
                  className="px-6"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderRequestsTab = () => (
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
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
          My Mentorship Requests
        </h2>
        <p className="text-gray-400 mt-2">Track your mentorship journey and connections</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[
          { 
            title: 'Total Requests', 
            value: myMentorshipRequests.length, 
            icon: HandRaisedIcon, 
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-500/10'
          },
          { 
            title: 'Accepted', 
            value: myMentorshipRequests.filter(req => req.status === 'accepted').length, 
            icon: CheckIcon, 
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-500/10'
          },
          { 
            title: 'Pending', 
            value: myMentorshipRequests.filter(req => req.status === 'pending').length, 
            icon: ClockIcon, 
            color: 'from-yellow-500 to-amber-600',
            bgColor: 'bg-yellow-500/10'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
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
      </motion.div>

      {/* Requests List */}
      {myMentorshipRequests.length > 0 ? (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {myMentorshipRequests.map((request, index) => {
            const getStatusColor = (status) => {
              switch (status) {
                case 'accepted': return 'bg-green-500/20 text-green-300 border-green-500/30';
                case 'rejected': return 'bg-red-500/20 text-red-300 border-red-500/30';
                default: return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
              }
            };

            const getStatusIcon = (status) => {
              switch (status) {
                case 'accepted': return <CheckIcon className="w-4 h-4" />;
                case 'rejected': return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
                default: return <ClockIcon className="w-4 h-4" />;
              }
            };

            return (
              <motion.div
                key={request._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg" className="hover:scale-[1.02] transition-transform">
                  <div className="flex items-start gap-6">
                    {/* Mentor Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {request.mentor?.full_name?.charAt(0) || 'M'}
                    </div>
                    
                    {/* Request Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-white mb-1">
                            {request.mentor?.full_name || 'Unknown Mentor'}
                          </h3>
                          <p className="text-indigo-300 text-sm mb-2">
                            {request.mentor?.current_position || 'Professional'}
                            {request.mentor?.company && (
                              <>
                                <span className="mx-2">•</span>
                                <span className="text-gray-400">{request.mentor.company}</span>
                              </>
                            )}
                          </p>
                        </div>
                        
                        {/* Status Badge */}
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </div>
                      </div>
                      
                      {/* Request Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <ClockIcon className="w-4 h-4 text-blue-400" />
                            <span className="font-medium">Meeting Type:</span>
                            <span className="capitalize">{request.preferred_meeting_type}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <CalendarDaysIcon className="w-4 h-4 text-green-400" />
                            <span className="font-medium">Sent:</span>
                            <span>{request.createdAt ? new Date(request.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            }) : 'Date unknown'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Message */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <ChatBubbleLeftRightIcon className="w-4 h-4" />
                          Your Message:
                        </h4>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {request.message || 'No message provided'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Mentor Response */}
                      {request.mentor_response && (
                        <motion.div 
                          className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-4 rounded-lg border border-indigo-500/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="text-sm font-medium text-indigo-300 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                            Mentor Response:
                          </h4>
                          <p className="text-sm text-white leading-relaxed">
                            {request.mentor_response}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card variant="glass" padding="xl" className="max-w-md mx-auto">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                <HandRaisedIcon className="w-10 h-10 text-indigo-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">No Requests Yet</h3>
                <p className="text-gray-400">Ready to start your mentorship journey? Connect with experienced professionals!</p>
              </div>
              <Button
                onClick={() => setActiveTab('mentors')}
                variant="primary"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                <HandRaisedIcon className="w-4 h-4 mr-2" />
                Find Mentors
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );

  const renderEventsTab = () => (
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
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
          Campus Events
        </h2>
        <p className="text-gray-400 mt-2">Discover networking opportunities and learning experiences</p>
      </motion.div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {events.map((event, index) => {
            const eventDate = event.date ? new Date(event.date) : null;
            const isUpcoming = eventDate ? eventDate > new Date() : true;
            
            return (
              <motion.div
                key={event._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card variant="glass" padding="lg" className="h-full flex flex-col relative overflow-hidden">
                  {/* Event Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${isUpcoming ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                      {isUpcoming ? '🟢 Upcoming' : '🔴 Past'}
                    </div>
                  </div>

                  {/* Event Header */}
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <CalendarDaysIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">
                      {event.title || 'Untitled Event'}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {event.description || 'No description available for this event.'}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6 flex-1">
                    {eventDate && (
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <ClockIcon className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="font-medium">
                            {eventDate.toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="text-xs text-gray-400">
                            {eventDate.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <MapPinIcon className="w-4 h-4 text-green-400" />
                      <span>{event.location || 'Location TBD'}</span>
                    </div>
                    
                    {event.capacity && (
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <UsersIcon className="w-4 h-4 text-yellow-400" />
                        <span>Capacity: {event.capacity} attendees</span>
                      </div>
                    )}
                    
                    {event.organizer && (
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <UserIcon className="w-4 h-4 text-purple-400" />
                        <span>Organized by: {event.organizer}</span>
                      </div>
                    )}
                  </div>

                  {/* Registration Section */}
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-gray-400">
                        {event.registered_count || 0} registered
                      </div>
                      {event.price && (
                        <div className="text-sm font-medium text-green-400">
                          {event.price === 0 ? 'Free' : `$${event.price}`}
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="primary"
                      className={`w-full transition-all duration-300 ${
                        isUpcoming 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:scale-105'
                          : 'bg-gray-500/50 cursor-not-allowed'
                      }`}
                      disabled={!isUpcoming}
                      onClick={() => {
                        // Handle event registration
                        if (isUpcoming) {
                          setSuccess(`Registration for "${event.title}" is being processed!`);
                        }
                      }}
                    >
                      {isUpcoming ? (
                        <>
                          <CalendarDaysIcon className="w-4 h-4 mr-2" />
                          Register Now
                        </>
                      ) : (
                        'Event Ended'
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card variant="glass" padding="xl" className="max-w-md mx-auto">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                <CalendarDaysIcon className="w-10 h-10 text-indigo-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">No Events Available</h3>
                <p className="text-gray-400">Stay tuned for upcoming networking events, workshops, and learning opportunities!</p>
              </div>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  onClick={() => {
                    setSuccess('We\'ll notify you when new events are announced!');
                  }}
                >
                  <span className="mr-2">🔔</span>
                  Notify Me
                </Button>
                <p className="text-xs text-gray-500">Get notified about upcoming events</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );

  const renderProfileTab = () => (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            My Profile
          </h2>
          <p className="text-gray-400 mt-2">Manage your academic information and preferences</p>
        </div>
        <Button
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          variant={isEditingProfile ? "secondary" : "primary"}
          className={isEditingProfile 
            ? "bg-gray-500/20 hover:bg-gray-500/30" 
            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          }
        >
          {isEditingProfile ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </motion.div>

      {/* Profile Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card variant="glass" padding="lg">
          {/* Profile Header Section */}
          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-white/10">
            <div className="relative">
              <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full border-2 border-indigo-400/50" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-1">
                {user?.full_name || 'Student Name'}
              </h3>
              <p className="text-indigo-300 mb-2">{user?.email || 'email@example.com'}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <AcademicCapIcon className="w-4 h-4" />
                  {profileData?.degree || 'Student'}
                </span>
                {profileData?.current_semester && (
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    Semester {profileData.current_semester}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <BuildingOfficeIcon className="w-4 h-4 inline mr-2" />
                Department
              </label>
              {isEditingProfile ? (
                <Input
                  type="text"
                  value={profileData.department}
                  onChange={(e) => handleProfileChange(e, 'department')}
                  placeholder="Enter your department"
                  className="w-full"
                />
              ) : (
                <div className="bg-white/5 px-4 py-3 rounded-lg text-white border border-white/10">
                  {profileData.department || 'Not provided'}
                </div>
              )}
            </motion.div>

            {/* Degree Program */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <AcademicCapIcon className="w-4 h-4 inline mr-2" />
                Degree Program
              </label>
              {isEditingProfile ? (
                <Input
                  type="text"
                  value={profileData.degree}
                  onChange={(e) => handleProfileChange(e, 'degree')}
                  placeholder="e.g., Computer Science, Engineering"
                  className="w-full"
                />
              ) : (
                <div className="bg-white/5 px-4 py-3 rounded-lg text-white border border-white/10">
                  {profileData.degree || 'Not provided'}
                </div>
              )}
            </motion.div>

            {/* Batch Year */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <CalendarDaysIcon className="w-4 h-4 inline mr-2" />
                Batch Year
              </label>
              {isEditingProfile ? (
                <Input
                  type="text"
                  value={profileData.batch_year}
                  onChange={(e) => handleProfileChange(e, 'batch_year')}
                  placeholder="e.g., 2024"
                  className="w-full"
                />
              ) : (
                <div className="bg-white/5 px-4 py-3 rounded-lg text-white border border-white/10">
                  {profileData.batch_year || 'Not provided'}
                </div>
              )}
            </motion.div>

            {/* Current Semester */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <AcademicCapIcon className="w-4 h-4 inline mr-2" />
                Current Semester
              </label>
              {isEditingProfile ? (
                <Input
                  type="text"
                  value={profileData.current_semester}
                  onChange={(e) => handleProfileChange(e, 'current_semester')}
                  placeholder="e.g., 6"
                  className="w-full"
                />
              ) : (
                <div className="bg-white/5 px-4 py-3 rounded-lg text-white border border-white/10">
                  {profileData.current_semester || 'Not provided'}
                </div>
              )}
            </motion.div>

            {/* GPA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <StarIcon className="w-4 h-4 inline mr-2" />
                GPA
              </label>
              {isEditingProfile ? (
                <Input
                  type="text"
                  value={profileData.gpa}
                  onChange={(e) => handleProfileChange(e, 'gpa')}
                  placeholder="e.g., 3.85"
                  className="w-full"
                />
              ) : (
                <div className="bg-white/5 px-4 py-3 rounded-lg text-white border border-white/10 flex items-center gap-2">
                  {profileData.gpa ? (
                    <>
                      <span>{profileData.gpa}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-4 h-4 ${parseFloat(profileData.gpa) >= (i + 1) * 0.8 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    'Not provided'
                  )}
                </div>
              )}
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <SparklesIcon className="w-4 h-4 inline mr-2" />
                Skills (comma separated)
              </label>
              {isEditingProfile ? (
                <Input
                  type="text"
                  value={profileData.skills}
                  onChange={(e) => handleProfileChange(e, 'skills')}
                  placeholder="e.g., React, Python, Machine Learning"
                  className="w-full"
                />
              ) : (
                <div className="bg-white/5 px-4 py-3 rounded-lg text-white border border-white/10">
                  {profileData.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.split(',').map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    'Not provided'
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Full-width fields */}
          <div className="mt-6 space-y-6">
            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <HeartIcon className="w-4 h-4 inline mr-2" />
                Interests
              </label>
              {isEditingProfile ? (
                <textarea
                  value={profileData.interests}
                  onChange={(e) => handleProfileChange(e, 'interests')}
                  placeholder="Tell us about your academic and personal interests..."
                  className="w-full bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                />
              ) : (
                <div className="bg-white/5 px-4 py-3 rounded-lg text-white border border-white/10 min-h-[96px]">
                  {profileData.interests || 'Not provided'}
                </div>
              )}
            </motion.div>

            {/* Career Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <TrophyIcon className="w-4 h-4 inline mr-2" />
                Career Goals
              </label>
              {isEditingProfile ? (
                <textarea
                  value={profileData.career_goals}
                  onChange={(e) => handleProfileChange(e, 'career_goals')}
                  placeholder="Describe your career aspirations and professional goals..."
                  className="w-full bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                />
              ) : (
                <div className="bg-white/5 px-4 py-3 rounded-lg text-white border border-white/10 min-h-[96px]">
                  {profileData.career_goals || 'Not provided'}
                </div>
              )}
            </motion.div>
          </div>

          {/* Save/Cancel Buttons */}
          <AnimatePresence>
            {isEditingProfile && (
              <motion.div 
                className="mt-8 pt-6 border-t border-white/10 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={handleProfileSave}
                  disabled={saving}
                  variant="primary"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 flex-1 sm:flex-none"
                >
                  {saving ? (
                    <><Loading type="spinner" size="sm" color="white" /> Saving...</>
                  ) : (
                    <>
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Save Profile
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setIsEditingProfile(false);
                    fetchDashboardData();
                  }}
                  variant="secondary"
                  className="bg-gray-500/20 hover:bg-gray-500/30"
                >
                  Cancel
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div 
      className="flex h-screen w-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden font-[Poppins] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"
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
            { key: 'mentors', label: 'Find Mentors', icon: AcademicCapIcon },
            { key: 'requests', label: 'My Requests', icon: HandRaisedIcon },
            { key: 'events', label: 'Events', icon: CalendarDaysIcon },
            { key: 'profile', label: 'Profile', icon: UserIcon }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all duration-300 group ${
                  activeTab === item.key
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
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
              <div className="font-bold">{user?.full_name?.split(' ')[0] || 'Student'}</div>
              <div className="text-xs text-gray-400">Student Member</div>
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              Student Portal
            </h1>
            <p className="text-gray-300 mt-2">Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}!</p>
          </div>
          <Card variant="glass" padding="md" hover={false}>
            <div className="text-center">
              <p className="text-sm text-gray-400">Current Semester</p>
              <p className="font-semibold text-lg">
                {profileData?.current_semester || 'Student'}
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
          <Loading type="spinner" size="lg" color="white" message="Loading student data..." />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {renderTabContent()}
          </motion.div>
        )}
      </motion.main>
    </motion.div>
  );
};

export default StudentDashboard;
