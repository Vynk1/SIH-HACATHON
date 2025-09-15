import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import {
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaDonate,
  FaHome,
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaTrash,
  FaPlus,
  FaEye
} from "react-icons/fa";
import search from "../assets/search.png";
import avatar1 from "../assets/avatar1.png";
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Tab management
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data states
  const [adminProfile, setAdminProfile] = useState({
    full_name: '',
    email: '',
    department: '',
    position: '',
    phone: ''
  });
  const [donations, setDonations] = useState([]);
  const [events, setEvents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [students, setStudents] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  
  // Loading and form states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Event form
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: ''
  });
  const [submittingEvent, setSubmittingEvent] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchAdminData();
  }, [isAuthenticated, user, navigate]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch admin profile
      try {
        const adminResponse = await api.getAdminProfile();
        if (adminResponse.success && adminResponse.profile) {
          setAdminProfile({
            full_name: adminResponse.profile.full_name || user?.full_name || '',
            email: adminResponse.profile.email || user?.email || '',
            department: adminResponse.profile.department || '',
            position: adminResponse.profile.position || '',
            phone: adminResponse.profile.phone || ''
          });
        }
      } catch (err) {
        console.error('Error fetching admin profile:', err);
      }
      
      // Fetch donations for admin view
      try {
        const donationsResponse = await api.getDonations();
        if (donationsResponse.success) {
          setDonations(donationsResponse.donations || []);
        }
      } catch (err) {
        console.error('Error fetching donations:', err);
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
      
      // Fetch alumni
      try {
        const alumniResponse = await api.getAllAlumni();
        if (alumniResponse.success) {
          setAlumni(alumniResponse.alumni || []);
        }
      } catch (err) {
        console.error('Error fetching alumni:', err);
      }
      
      // Fetch students
      try {
        const studentsResponse = await api.getAllStudents();
        if (studentsResponse.success) {
          setStudents(studentsResponse.students || []);
        }
      } catch (err) {
        console.error('Error fetching students:', err);
      }
      
      // Fetch mentorship requests
      try {
        const mentorshipResponse = await api.getAllMentorshipRequests();
        if (mentorshipResponse.success) {
          setMentorshipRequests(mentorshipResponse.requests || []);
        }
      } catch (err) {
        console.error('Error fetching mentorship requests:', err);
      }
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Profile form handlers
  const handleProfileChange = (e, field) => {
    setAdminProfile({ ...adminProfile, [field]: e.target.value });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleProfileSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      const response = await api.updateAdminProfile(adminProfile);
      if (response.success) {
        setSuccess('Profile updated successfully!');
        setIsEditingProfile(false);
        fetchAdminData();
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

  // Event handlers
  const handleEventChange = (e, field) => {
    setEventForm({ ...eventForm, [field]: e.target.value });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmittingEvent(true);
      setError('');
      setSuccess('');
      
      const response = await api.createEvent({
        ...eventForm,
        capacity: parseInt(eventForm.capacity) || null
      });
      
      if (response.success) {
        setSuccess('Event created successfully!');
        setEventForm({ title: '', description: '', date: '', location: '', capacity: '' });
        fetchAdminData();
      } else {
        setError(response.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error.message || 'Failed to create event');
    } finally {
      setSubmittingEvent(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      setError('');
      const response = await api.deleteEvent(eventId);
      if (response.success) {
        setSuccess('Event deleted successfully!');
        fetchAdminData();
      } else {
        setError(response.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      setError(error.message || 'Failed to delete event');
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

  if (!isAuthenticated || user?.role !== 'admin') {
    return null; // Will redirect
  }

  const totalDonations = donations.reduce((sum, donation) => sum + (donation.amount || 0), 0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardTab();
      case 'users':
        return renderUsersTab();
      case 'events':
        return renderEventsTab();
      case 'donations':
        return renderDonationsTab();
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
          <div className="text-sm text-gray-400">Total Alumni</div>
          <div className="text-2xl font-bold mt-2">{alumni.length}</div>
        </div>
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <div className="text-sm text-gray-400">Total Students</div>
          <div className="text-2xl font-bold mt-2">{students.length}</div>
        </div>
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <div className="text-sm text-gray-400">Total Events</div>
          <div className="text-2xl font-bold mt-2">{events.length}</div>
        </div>
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <div className="text-sm text-gray-400">Total Donations</div>
          <div className="text-2xl font-bold mt-2">${totalDonations.toFixed(2)}</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1f2740] rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Alumni Engagement</h3>
          <div className="flex items-center justify-center h-64">
            <img src={image1} alt="Alumni Engagement" className="rounded-lg max-w-full max-h-full object-contain" />
          </div>
        </div>
        <div className="bg-[#1f2740] rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Event Participation</h3>
          <div className="flex items-center justify-center h-64">
            <img src={image2} alt="Event Participation" className="rounded-lg max-w-full max-h-full object-contain" />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Alumni</h3>
          <div className="space-y-3">
            {alumni.slice(0, 5).map((alum, idx) => (
              <div key={alum._id || idx} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                  {alum.full_name?.charAt(0) || 'A'}
                </div>
                <div>
                  <div className="font-medium">{alum.full_name || 'Unknown'}</div>
                  <div className="text-sm text-gray-400">{alum.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
          <div className="space-y-3">
            {events.slice(0, 5).map((event, idx) => (
              <div key={event._id || idx}>
                <div className="font-medium">{event.title || 'Untitled Event'}</div>
                <div className="text-sm text-gray-400">
                  {event.date ? new Date(event.date).toLocaleDateString() : 'Date TBD'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#1f2740] p-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Mentorship Requests</h3>
          <div className="text-2xl font-bold mb-2">{mentorshipRequests.length}</div>
          <div className="text-sm text-gray-400">Pending requests</div>
        </div>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alumni List */}
        <div className="bg-[#1f2740] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Alumni ({alumni.length})</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {alumni.map((alum, idx) => (
              <div key={alum._id || idx} className="flex items-center justify-between p-3 bg-[#2a324d] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                    {alum.full_name?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <div className="font-medium">{alum.full_name || 'Unknown'}</div>
                    <div className="text-sm text-gray-400">{alum.email}</div>
                    <div className="text-sm text-gray-400">{alum.department || 'No department'}</div>
                  </div>
                </div>
                <FaEye className="text-gray-400 cursor-pointer hover:text-white" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Students List */}
        <div className="bg-[#1f2740] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Students ({students.length})</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {students.map((student, idx) => (
              <div key={student._id || idx} className="flex items-center justify-between p-3 bg-[#2a324d] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold">
                    {student.full_name?.charAt(0) || 'S'}
                  </div>
                  <div>
                    <div className="font-medium">{student.full_name || 'Unknown'}</div>
                    <div className="text-sm text-gray-400">{student.email}</div>
                    <div className="text-sm text-gray-400">{student.department || 'No department'}</div>
                  </div>
                </div>
                <FaEye className="text-gray-400 cursor-pointer hover:text-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventsTab = () => (
    <div>
      {/* Create Event Form */}
      <div className="bg-[#1f2740] p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Create New Event</h3>
        <form onSubmit={handleEventSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Event Title"
            value={eventForm.title}
            onChange={(e) => handleEventChange(e, 'title')}
            className="bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="datetime-local"
            value={eventForm.date}
            onChange={(e) => handleEventChange(e, 'date')}
            className="bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={eventForm.location}
            onChange={(e) => handleEventChange(e, 'location')}
            className="bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Capacity (optional)"
            value={eventForm.capacity}
            onChange={(e) => handleEventChange(e, 'capacity')}
            className="bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Event Description"
            value={eventForm.description}
            onChange={(e) => handleEventChange(e, 'description')}
            className="bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2 h-24 resize-none"
            required
          />
          <button
            type="submit"
            disabled={submittingEvent}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-6 py-3 rounded-lg font-medium transition md:col-span-2"
          >
            {submittingEvent ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
      
      {/* Events List */}
      <div className="bg-[#1f2740] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">All Events ({events.length})</h3>
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={event._id || idx} className="flex items-center justify-between p-4 bg-[#2a324d] rounded-lg">
              <div>
                <div className="font-medium text-lg">{event.title || 'Untitled Event'}</div>
                <div className="text-gray-400 mt-1">{event.description}</div>
                <div className="text-sm text-gray-400 mt-2">
                  <span className="mr-4">📅 {event.date ? new Date(event.date).toLocaleDateString() : 'Date TBD'}</span>
                  <span className="mr-4">📍 {event.location || 'Location TBD'}</span>
                  {event.capacity && <span>👥 {event.capacity} capacity</span>}
                </div>
              </div>
              <button
                onClick={() => handleDeleteEvent(event._id)}
                className="text-red-400 hover:text-red-300 p-2 rounded transition"
                title="Delete Event"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-gray-400 text-center py-8">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderDonationsTab = () => (
    <div>
      <div className="bg-[#1f2740] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">All Donations ({donations.length})</h3>
        <div className="mb-4 p-4 bg-[#2a324d] rounded-lg">
          <div className="text-sm text-gray-400">Total Amount Raised</div>
          <div className="text-3xl font-bold text-green-400">${totalDonations.toFixed(2)}</div>
        </div>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {donations.map((donation, idx) => (
            <div key={donation._id || idx} className="flex items-center justify-between p-4 bg-[#2a324d] rounded-lg">
              <div>
                <div className="font-medium">{donation.donor_name || 'Anonymous'}</div>
                <div className="text-sm text-gray-400">{donation.purpose || 'General donation'}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : 'Date unknown'}
                </div>
              </div>
              <div className="text-green-400 font-bold text-lg">
                ${(donation.amount || 0).toFixed(2)}
              </div>
            </div>
          ))}
          {donations.length === 0 && (
            <p className="text-gray-400 text-center py-8">No donations found.</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div>
      <div className="bg-[#1f2740] p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Admin Profile</h3>
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
            {isEditingProfile ? (
              <input
                type="text"
                value={adminProfile.full_name}
                onChange={(e) => handleProfileChange(e, 'full_name')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {adminProfile.full_name || 'Not provided'}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            {isEditingProfile ? (
              <input
                type="email"
                value={adminProfile.email}
                onChange={(e) => handleProfileChange(e, 'email')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {adminProfile.email || 'Not provided'}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Department
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={adminProfile.department}
                onChange={(e) => handleProfileChange(e, 'department')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {adminProfile.department || 'Not provided'}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Position
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={adminProfile.position}
                onChange={(e) => handleProfileChange(e, 'position')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {adminProfile.position || 'Not provided'}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone
            </label>
            {isEditingProfile ? (
              <input
                type="tel"
                value={adminProfile.phone}
                onChange={(e) => handleProfileChange(e, 'phone')}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="bg-[#2a324d] px-4 py-3 rounded-lg text-gray-300">
                {adminProfile.phone || 'Not provided'}
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
                fetchAdminData();
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
          <img src={search} alt="Search" className="w-4 h-4" />
          Search for…
        </div>

        <div className="mt-6 space-y-2">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: FaHome },
            { key: 'users', label: 'Users', icon: FaUsers },
            { key: 'events', label: 'Events', icon: FaCalendarAlt },
            { key: 'donations', label: 'Donations', icon: FaDonate },
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
            <img src={avatar1} alt="User" className="w-9 h-9 rounded-full" />
            <div>
              <div className="font-bold">{user?.full_name?.split(' ')[0] || 'Admin'}</div>
              <div className="text-xs text-gray-400">Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="text-sm text-gray-400">
            Welcome, {user?.full_name?.split(' ')[0] || 'Admin'}
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

export default AdminDashboard;
