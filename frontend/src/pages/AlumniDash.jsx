import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
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
  <div className="flex h-screen w-screen bg-[#0f1626] text-white font-[Poppins]">
    {/* Sidebar */}
    <aside className="w-60 p-5 bg-[#1a2236] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <img src={search2} alt="Search-icon" className="w-4 h-4 object-contain" />
        <input
          type="text"
          placeholder="Search for…"
          className="w-full px-3 py-2 bg-[#2a324d] rounded-md text-gray-300 text-sm focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {[
          { name: "Dashboard", key: "dashboard", icon: <FaHome className="w-4 h-4" /> },
          { name: "Profile", key: "profile", icon: <FaUser className="w-4 h-4" /> },
          { name: "Events", key: "events", icon: <FaCalendarAlt className="w-4 h-4" /> },
          { name: "Donations", key: "donations", icon: <FaDonate className="w-4 h-4" /> },
          { name: "Mentorship", key: "mentorship", icon: <FaUserGraduate className="w-4 h-4" /> }
        ].map((item) => (
          <div
            key={item.key}
            onClick={() => handleTabSwitch(item.key)}
            className={`px-3 py-2 rounded-md cursor-pointer transition flex items-center gap-3 ${
              activeTab === item.key 
                ? 'bg-[#4A9EE2] text-white' 
                : 'hover:bg-[#2a324d] text-gray-300'
            }`}
          >
            {item.icon}
            {item.name}
          </div>
        ))}
      </div>

      <div 
        onClick={handleLogout}
        className="mt-auto text-gray-400 px-3 py-2 cursor-pointer hover:text-white transition flex items-center gap-3"
      >
        <FaSignOutAlt className="w-4 h-4" />
        Logout
      </div>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-7 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl mb-2">Alumni Portal</h1>
          <p className="text-gray-400">Welcome back, {user?.full_name?.split(' ')[0] || 'Alumni'}!</p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 text-green-200 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A9EE2]"></div>
        </div>
      ) : (
        <div className="bg-[#1f2740] rounded-lg p-6">
          {activeTab === 'dashboard' && (
            <div>
              <div className="flex items-center gap-6 mb-8">
                <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full" />
                <div>
                  <h2 className="text-2xl m-0">{user?.full_name || 'Alumni User'}</h2>
                  <p className="text-gray-400 text-lg mt-1">
                    {profileData?.batch_year ? `Class of ${profileData.batch_year}` : 'Alumni'}
                    {profileData?.degree && `, ${profileData.degree}`}
                  </p>
                  {profileData?.current_position && profileData?.company && (
                    <p className="text-gray-300 text-sm mt-1">
                      {profileData.current_position} at {profileData.company}
                    </p>
                  )}
                </div>
                <div className="ml-auto flex gap-3">
                  <button 
                    onClick={() => handleTabSwitch('profile')}
                    className="px-5 py-2 bg-[#4A9EE2] hover:bg-[#357eb5] rounded-md text-lg cursor-pointer transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Quick Stats */}
                <div className="bg-[#2a324d] p-5 rounded-lg">
                  <h3 className="text-xl mb-3 text-[#4A9EE2]">My Stats</h3>
                  <div className="space-y-2">
                    <p className="text-sm">Total Donations: ${totalDonated.toFixed(2)}</p>
                    <p className="text-sm">Events Available: {events.length}</p>
                    <p className="text-sm">Mentorship Requests: {mentorshipRequests.length}</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[#2a324d] p-5 rounded-lg">
                  <h3 className="text-xl mb-3 text-[#4A9EE2]">Recent Activity</h3>
                  <div className="space-y-2">
                    {myDonations.slice(0, 3).map((donation, index) => (
                      <p key={index} className="text-sm text-gray-300">
                        Donated ${donation.amount} for {donation.purpose}
                      </p>
                    ))}
                    {myDonations.length === 0 && (
                      <p className="text-sm text-gray-400">No recent activity</p>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-[#2a324d] p-5 rounded-lg">
                  <h3 className="text-xl mb-3 text-[#4A9EE2]">Quick Actions</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleTabSwitch('events')}
                      className="w-full bg-[#478093] hover:bg-[#356a7a] text-white py-2 rounded transition text-sm"
                    >
                      View Events
                    </button>
                    <button 
                      onClick={() => handleTabSwitch('donations')}
                      className="w-full bg-[#4A9EE2] hover:bg-[#357eb5] text-white py-2 rounded transition text-sm"
                    >
                      Make Donation
                    </button>
                    <button 
                      onClick={() => handleTabSwitch('mentorship')}
                      className="w-full bg-[#6c757d] hover:bg-[#5a6268] text-white py-2 rounded transition text-sm"
                    >
                      Mentorship
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">My Profile</h2>
                <button
                  onClick={isEditingProfile ? handleProfileSave : () => setIsEditingProfile(true)}
                  disabled={saving}
                  className="flex items-center gap-2 bg-[#4A9EE2] hover:bg-[#357eb5] disabled:bg-gray-500 px-4 py-2 rounded-lg text-white font-medium transition"
                >
                  {saving ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : isEditingProfile ? (
                    <FaSave />
                  ) : (
                    <FaEdit />
                  )}
                  {saving ? "Saving..." : isEditingProfile ? "Save" : "Edit"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Batch Year", field: "batch_year", type: "number", icon: <FaUser />, placeholder: "e.g. 2020" },
                  { label: "Degree", field: "degree", type: "text", icon: <FaBook />, placeholder: "e.g. B.Tech Computer Science" },
                  { label: "Department", field: "department", type: "text", icon: <FaBook />, placeholder: "e.g. Computer Science" },
                  { label: "Current Position", field: "current_position", type: "text", icon: <FaUser />, placeholder: "e.g. Software Engineer" },
                  { label: "Company", field: "company", type: "text", icon: <FaBuilding />, placeholder: "e.g. Google Inc." },
                  { label: "Location", field: "location", type: "text", icon: <FaMapMarkerAlt />, placeholder: "e.g. San Francisco, CA" },
                ].map((field, idx) => (
                  <div key={idx} className="flex flex-col">
                    <label className="mb-2 text-base font-medium flex items-center gap-2 text-gray-300">
                      {field.icon} {field.label}
                    </label>
                    {isEditingProfile ? (
                      <input
                        type={field.type}
                        value={profileData[field.field]}
                        onChange={(e) => handleProfileChange(e, field.field)}
                        placeholder={field.placeholder}
                        className="w-full h-12 px-3 rounded-md text-white bg-[#2a324d] border border-gray-600 focus:border-[#4A9EE2] outline-none transition"
                        disabled={saving}
                      />
                    ) : (
                      <div className="w-full h-12 px-3 flex items-center rounded-md bg-[#2a324d] text-gray-300">
                        {profileData[field.field] || "—"}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* LinkedIn URL - Full width */}
                <div className="md:col-span-2 flex flex-col">
                  <label className="mb-2 text-base font-medium flex items-center gap-2 text-gray-300">
                    <FaLinkedin /> LinkedIn URL
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="url"
                      value={profileData.linkedin_url}
                      onChange={(e) => handleProfileChange(e, 'linkedin_url')}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full h-12 px-3 rounded-md text-white bg-[#2a324d] border border-gray-600 focus:border-[#4A9EE2] outline-none transition"
                      disabled={saving}
                    />
                  ) : (
                    <div className="w-full h-12 px-3 flex items-center rounded-md bg-[#2a324d] text-gray-300">
                      {profileData.linkedin_url ? (
                        <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[#4A9EE2] hover:underline">
                          {profileData.linkedin_url}
                        </a>
                      ) : "—"}
                    </div>
                  )}
                </div>
                
                {/* Skills - Full width */}
                <div className="md:col-span-2 flex flex-col">
                  <label className="mb-2 text-base font-medium flex items-center gap-2 text-gray-300">
                    <FaTags /> Skills
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.skills}
                      onChange={(e) => handleProfileChange(e, 'skills')}
                      placeholder="e.g. React, Node.js, Python (comma separated)"
                      className="w-full h-12 px-3 rounded-md text-white bg-[#2a324d] border border-gray-600 focus:border-[#4A9EE2] outline-none transition"
                      disabled={saving}
                    />
                  ) : (
                    <div className="w-full min-h-12 px-3 py-3 rounded-md bg-[#2a324d] text-gray-300">
                      {profileData.skills ? (
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.split(',').map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-[#4A9EE2] rounded text-sm text-white">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      ) : "—"}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-300">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="mb-2 text-base font-medium text-gray-300">Full Name</label>
                    <div className="w-full h-12 px-3 flex items-center rounded-md bg-[#2a324d] text-gray-300">
                      {user?.full_name || "—"}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 text-base font-medium text-gray-300">Email</label>
                    <div className="w-full h-12 px-3 flex items-center rounded-md bg-[#2a324d] text-gray-300">
                      {user?.email || "—"}
                    </div>
                  </div>
                  {user?.phone_number && (
                    <div className="flex flex-col">
                      <label className="mb-2 text-base font-medium text-gray-300">Phone</label>
                      <div className="w-full h-12 px-3 flex items-center rounded-md bg-[#2a324d] text-gray-300">
                        {user.phone_number}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <label className="mb-2 text-base font-medium text-gray-300">Role</label>
                    <div className="w-full h-12 px-3 flex items-center rounded-md bg-[#2a324d] text-gray-300 capitalize">
                      {user?.role || "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'events' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Events</h2>
              {events.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {events.map((event, index) => (
                    <div key={event._id || index} className="bg-[#2a324d] p-5 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {event.title || 'Untitled Event'}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-gray-300 mb-3">{event.description}</p>
                      )}
                      <div className="space-y-2 text-sm text-gray-400 mb-4">
                        <p>📍 {event.location || 'Location TBD'}</p>
                        <p>📅 {formatDate(event.date)}</p>
                        {event.time && <p>⏰ {event.time}</p>}
                        {event.max_participants && <p>👥 Max: {event.max_participants}</p>}
                      </div>
                      <button
                        onClick={() => handleEventRegister(event._id)}
                        className="w-full bg-[#4A9EE2] hover:bg-[#357eb5] text-white py-2 rounded transition"
                      >
                        Register for Event
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No events available at the moment.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'donations' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Donations</h2>
              
              {/* Donation Form */}
              <div className="bg-[#2a324d] p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Make a Donation</h3>
                <form onSubmit={handleDonationSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Amount ($) *
                      </label>
                      <input
                        type="number"
                        value={donationForm.amount}
                        onChange={(e) => handleDonationChange(e, 'amount')}
                        className="w-full h-12 px-3 rounded-md text-white bg-[#1f2740] border border-gray-600 focus:border-[#4A9EE2] outline-none transition"
                        placeholder="Enter amount"
                        min="1"
                        step="0.01"
                        required
                        disabled={submittingDonation}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Purpose *
                      </label>
                      <input
                        type="text"
                        value={donationForm.purpose}
                        onChange={(e) => handleDonationChange(e, 'purpose')}
                        className="w-full h-12 px-3 rounded-md text-white bg-[#1f2740] border border-gray-600 focus:border-[#4A9EE2] outline-none transition"
                        placeholder="Donation purpose"
                        required
                        disabled={submittingDonation}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submittingDonation}
                    className="bg-[#4A9EE2] hover:bg-[#357eb5] disabled:bg-gray-500 text-white py-2 px-6 rounded-lg font-medium transition"
                  >
                    {submittingDonation ? 'Submitting...' : 'Submit Donation'}
                  </button>
                </form>
              </div>
              
              {/* Donation History */}
              <div className="bg-[#2a324d] p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">My Donation History</h3>
                {myDonations.length > 0 ? (
                  <>
                    <div className="mb-4">
                      <p className="text-lg text-[#4A9EE2] font-semibold">
                        Total Donated: ${totalDonated.toFixed(2)}
                      </p>
                      <p className="text-gray-300">{myDonations.length} donation{myDonations.length !== 1 ? 's' : ''} made</p>
                    </div>
                    <div className="space-y-3">
                      {myDonations.map((donation, index) => (
                        <div key={donation._id || index} className="border border-gray-600 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-lg text-white">${donation.amount}</h4>
                              <p className="text-gray-300 mt-1">{donation.purpose}</p>
                              <p className="text-sm text-gray-400 mt-2">
                                Date: {formatDate(donation.createdAt || donation.date)}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                              donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {donation.status || 'Submitted'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-gray-400">No donations made yet. Make your first donation above!</p>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'mentorship' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Mentorship Requests</h2>
              {mentorshipRequests.length > 0 ? (
                <div className="space-y-4">
                  {mentorshipRequests.map((request, index) => (
                    <div key={request._id || index} className="bg-[#2a324d] border border-gray-600 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-white">
                            {request.student_name || 'Anonymous Student'}
                          </h3>
                          <p className="text-gray-300">{request.student_email || 'No email provided'}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status || 'pending'}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div>
                          <h4 className="font-medium text-white">Topic:</h4>
                          <p className="text-gray-300">{request.topic || 'General mentorship'}</p>
                        </div>
                        
                        {request.description && (
                          <div>
                            <h4 className="font-medium text-white">Description:</h4>
                            <p className="text-gray-300">{request.description}</p>
                          </div>
                        )}
                        
                        {request.preferred_time && (
                          <div>
                            <h4 className="font-medium text-white">Preferred Time:</h4>
                            <p className="text-gray-300">{request.preferred_time}</p>
                          </div>
                        )}
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleMentorshipStatusUpdate(request._id, 'approved')}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleMentorshipStatusUpdate(request._id, 'rejected')}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No mentorship requests yet.</p>
                  <p className="text-gray-500 mt-2">Students will be able to reach out to you for mentorship guidance.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  </div>
  );
};

export default AlumniDashboard;
