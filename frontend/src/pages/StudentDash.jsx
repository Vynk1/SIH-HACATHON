import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
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
  const [registering, setRegistering] = useState(null);
  
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
  const handleRegisterForEvent = async (eventId) => {
    try {
      setRegistering(eventId);
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
    } finally {
      setRegistering(null);
    }
  };

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
    <div>
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <div className="text-sm text-gray-400">Available Mentors</div>
          <div className="text-2xl font-bold mt-2">{availableMentors.length}</div>
        </div>
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <div className="text-sm text-gray-400">My Requests</div>
          <div className="text-2xl font-bold mt-2">{myMentorshipRequests.length}</div>
        </div>
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <div className="text-sm text-gray-400">Accepted Requests</div>
          <div className="text-2xl font-bold mt-2 text-green-400">
            {myMentorshipRequests.filter(req => req.status === 'accepted').length}
          </div>
        </div>
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <div className="text-sm text-gray-400">Upcoming Events</div>
          <div className="text-2xl font-bold mt-2">{events.length}</div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Mentors */}
        <div className="bg-[#1f2740] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Featured Mentors</h3>
          <div className="space-y-4">
            {availableMentors.slice(0, 4).map((mentor, idx) => (
              <div key={mentor._id || idx} className="flex items-center gap-4 p-3 bg-[#2a324d] rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                  {mentor.full_name?.charAt(0) || 'M'}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{mentor.full_name || 'Unknown'}</div>
                  <div className="text-sm text-gray-400">{mentor.current_position || 'Position not specified'}</div>
                  <div className="text-sm text-gray-400">{mentor.company || 'Company not specified'}</div>
                </div>
                <button
                  onClick={() => setActiveTab('mentors')}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-xs rounded transition"
                >
                  View
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveTab('mentors')}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            View All Mentors
          </button>
        </div>
        
        {/* My Recent Requests */}
        <div className="bg-[#1f2740] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Requests</h3>
          <div className="space-y-4">
            {myMentorshipRequests.slice(0, 4).map((request, idx) => (
              <div key={request._id || idx} className="p-3 bg-[#2a324d] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">
                    {request.mentor?.full_name || 'Unknown Mentor'}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    request.status === 'accepted' ? 'bg-green-500/20 text-green-300' :
                    request.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="text-sm text-gray-400 truncate">
                  {request.message?.substring(0, 80) || 'No message'}
                  {request.message?.length > 80 && '...'}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveTab('requests')}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            View All Requests
          </button>
        </div>
      </div>
    </div>
  );

  const renderMentorsTab = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Available Mentors ({availableMentors.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableMentors.map((mentor, idx) => (
            <div key={mentor._id || idx} className="bg-[#1f2740] p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center font-bold text-xl">
                  {mentor.full_name?.charAt(0) || 'M'}
                </div>
                <div>
                  <div className="font-semibold text-lg">{mentor.full_name || 'Unknown'}</div>
                  <div className="text-sm text-gray-400">{mentor.current_position || 'Position not specified'}</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <FaBuilding className="w-4 h-4" />
                  {mentor.company || 'Company not specified'}
                </div>
                {mentor.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    {mentor.location}
                  </div>
                )}
                {mentor.department && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaBook className="w-4 h-4" />
                    {mentor.department}
                  </div>
                )}
                {mentor.skills && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaTags className="w-4 h-4" />
                    {Array.isArray(mentor.skills) ? mentor.skills.join(', ') : mentor.skills}
                  </div>
                )}
                {mentor.linkedin_url && (
                  <div className="flex items-center gap-2 text-sm text-blue-400">
                    <FaLinkedin className="w-4 h-4" />
                    <a 
                      href={mentor.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setMentorshipForm({ 
                    mentor_id: mentor._id, 
                    message: '', 
                    preferred_meeting_type: 'virtual' 
                  });
                  // Show the mentorship request form for this mentor
                  const existingRequest = myMentorshipRequests.find(req => 
                    req.mentor_id === mentor._id || req.mentor?._id === mentor._id
                  );
                  if (existingRequest) {
                    setError('You already have a request with this mentor');
                    return;
                  }
                  setActiveTab('request-form');
                }}
                disabled={myMentorshipRequests.some(req => 
                  req.mentor_id === mentor._id || req.mentor?._id === mentor._id
                )}
                className={`w-full py-2 rounded transition ${
                  myMentorshipRequests.some(req => 
                    req.mentor_id === mentor._id || req.mentor?._id === mentor._id
                  ) 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {myMentorshipRequests.some(req => 
                  req.mentor_id === mentor._id || req.mentor?._id === mentor._id
                ) 
                  ? 'Request Sent' 
                  : 'Request Mentorship'
                }
              </button>
            </div>
          ))}
        </div>
        {availableMentors.length === 0 && (
          <p className="text-gray-400 text-center py-8">No mentors available at the moment.</p>
        )}
      </div>

      {/* Mentorship Request Form Modal */}
      {mentorshipForm.mentor_id && activeTab === 'request-form' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1f2740] p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Send Mentorship Request</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meeting Preference
                </label>
                <select
                  value={mentorshipForm.preferred_meeting_type}
                  onChange={(e) => setMentorshipForm({
                    ...mentorshipForm, 
                    preferred_meeting_type: e.target.value
                  })}
                  className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="virtual">Virtual Meeting</option>
                  <option value="in-person">In-Person Meeting</option>
                  <option value="phone">Phone Call</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message to Mentor
                </label>
                <textarea
                  value={mentorshipForm.message}
                  onChange={(e) => setMentorshipForm({
                    ...mentorshipForm, 
                    message: e.target.value
                  })}
                  placeholder="Tell the mentor about yourself and what you hope to gain from mentorship..."
                  className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleMentorshipRequestSubmit(mentorshipForm.mentor_id)}
                disabled={submittingRequest || !mentorshipForm.message.trim()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded transition"
              >
                {submittingRequest ? 'Sending...' : 'Send Request'}
              </button>
              <button
                onClick={() => {
                  setMentorshipForm({ mentor_id: '', message: '', preferred_meeting_type: 'virtual' });
                  setActiveTab('mentors');
                }}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderRequestsTab = () => (
    <div>
      <div className="bg-[#1f2740] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">My Mentorship Requests ({myMentorshipRequests.length})</h3>
        <div className="space-y-4">
          {myMentorshipRequests.map((request, idx) => (
            <div key={request._id || idx} className="p-4 bg-[#2a324d] rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                    {request.mentor?.full_name?.charAt(0) || 'M'}
                  </div>
                  <div>
                    <div className="font-semibold">{request.mentor?.full_name || 'Unknown Mentor'}</div>
                    <div className="text-sm text-gray-400 mb-2">
                      {request.mentor?.current_position || 'Position not specified'} 
                      {request.mentor?.company && ` at ${request.mentor.company}`}
                    </div>
                    <div className="text-sm text-gray-300 mb-2">
                      <strong>Meeting Type:</strong> {request.preferred_meeting_type}
                    </div>
                    <div className="text-sm text-gray-300">
                      <strong>Message:</strong> {request.message || 'No message'}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Sent: {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'Date unknown'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    request.status === 'accepted' ? 'bg-green-500/20 text-green-300' :
                    request.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {request.status === 'pending' && <FaClock className="inline w-3 h-3 mr-1" />}
                    {request.status === 'accepted' && <FaCheckCircle className="inline w-3 h-3 mr-1" />}
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
              </div>
              {request.mentor_response && (
                <div className="mt-4 p-3 bg-[#1a2236] rounded border-l-4 border-blue-500">
                  <div className="text-sm font-medium text-blue-300 mb-1">Mentor Response:</div>
                  <div className="text-sm text-gray-300">{request.mentor_response}</div>
                </div>
              )}
            </div>
          ))}
          {myMentorshipRequests.length === 0 && (
            <p className="text-gray-400 text-center py-8">You haven't sent any mentorship requests yet.</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderEventsTab = () => (
    <div>
      <div className="bg-[#1f2740] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Upcoming Events ({events.length})</h3>
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={event._id || idx} className="p-4 bg-[#2a324d] rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-lg">{event.title || 'Untitled Event'}</div>
                  <div className="text-gray-400 mt-1">{event.description}</div>
                  <div className="text-sm text-gray-400 mt-2">
                    <span className="mr-4">
                      📅 {event.date ? new Date(event.date).toLocaleDateString() : 'Date TBD'}
                    </span>
                    <span className="mr-4">
                      📍 {event.location || 'Location TBD'}
                    </span>
                    {event.capacity && <span>👥 {event.capacity} capacity</span>}
                  </div>
                </div>
                <button
                  onClick={() => handleRegisterForEvent(event._id)}
                  disabled={registering === event._id}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded transition"
                >
                  {registering === event._id ? 'Registering...' : 'Register'}
                </button>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-gray-400 text-center py-8">No upcoming events.</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div>
      <div className="bg-[#1f2740] p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Student Profile</h3>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
          >
            {isEditingProfile ? <FaSave /> : <FaEdit />}
            {isEditingProfile ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaUser className="inline mr-2" />
              Full Name
            </label>
            <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
              {user?.full_name || 'Not provided'}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
              {user?.email || 'Not provided'}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaBook className="inline mr-2" />
              Department
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.department}
                onChange={(e) => handleProfileChange(e, 'department')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {profileData.department || 'Not provided'}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Degree Program
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.degree}
                onChange={(e) => handleProfileChange(e, 'degree')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {profileData.degree || 'Not provided'}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Batch Year
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.batch_year}
                onChange={(e) => handleProfileChange(e, 'batch_year')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {profileData.batch_year || 'Not provided'}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Semester
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.current_semester}
                onChange={(e) => handleProfileChange(e, 'current_semester')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {profileData.current_semester || 'Not provided'}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GPA
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.gpa}
                onChange={(e) => handleProfileChange(e, 'gpa')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {profileData.gpa || 'Not provided'}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaTags className="inline mr-2" />
              Skills (comma separated)
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.skills}
                onChange={(e) => handleProfileChange(e, 'skills')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {profileData.skills || 'Not provided'}
              </div>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Interests
            </label>
            {isEditingProfile ? (
              <textarea
                value={profileData.interests}
                onChange={(e) => handleProfileChange(e, 'interests')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300 min-h-[80px]">
                {profileData.interests || 'Not provided'}
              </div>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Career Goals
            </label>
            {isEditingProfile ? (
              <textarea
                value={profileData.career_goals}
                onChange={(e) => handleProfileChange(e, 'career_goals')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300 min-h-[80px]">
                {profileData.career_goals || 'Not provided'}
              </div>
            )}
          </div>
        </div>
        
        {isEditingProfile && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleProfileSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-50 rounded-lg transition"
            >
              <FaSave />
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              onClick={() => {
                setIsEditingProfile(false);
                fetchDashboardData();
              }}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen bg-[#0f1626] text-white overflow-hidden font-[Poppins]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1a2236] flex flex-col p-5">
        <div className="flex items-center gap-2 bg-[#2a324d] px-3 py-2 rounded-md text-gray-400 text-sm">
          <img src={search2} alt="Search" className="w-4 h-4" />
          Search for…
        </div>

        <div className="mt-6 space-y-2">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: FaHome },
            { key: 'mentors', label: 'Find Mentors', icon: FaUserGraduate },
            { key: 'requests', label: 'My Requests', icon: FaHandshake },
            { key: 'events', label: 'Events', icon: FaCalendarAlt },
            { key: 'profile', label: 'Profile', icon: FaUser }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-sm transition ${
                  activeTab === item.key
                    ? 'bg-[#4A9EE2] text-white'
                    : 'hover:bg-[#2a324d] text-gray-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </div>
            );
          })}
        </div>

        <div className="mt-auto">
          <div 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer hover:bg-[#2a324d] text-sm text-gray-400 hover:text-white transition mb-4"
          >
            <FaSignOutAlt className="w-4 h-4" />
            Logout
          </div>
          <div className="flex items-center gap-2">
            <img src={profilePic} alt="User" className="w-9 h-9 rounded-full" />
            <div>
              <div className="font-bold">{user?.full_name?.split(' ')[0] || 'Student'}</div>
              <div className="text-xs text-gray-400">Student</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <div className="text-sm text-gray-400">
            Welcome, {user?.full_name?.split(' ')[0] || 'Student'}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 text-green-200 rounded-lg">
            {success}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          renderTabContent()
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
