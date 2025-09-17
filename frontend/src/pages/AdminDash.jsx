import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../config/api";
import { Button, Input, Card, Loading, CardSkeleton } from "../components/ui";
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
import {
  UserIcon,
  UsersIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
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
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Total Alumni', 
            value: alumni.length, 
            icon: UsersIcon, 
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10'
          },
          { 
            title: 'Total Students', 
            value: students.length, 
            icon: UserIcon, 
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-500/10'
          },
          { 
            title: 'Total Events', 
            value: events.length, 
            icon: CalendarDaysIcon, 
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/10'
          },
          { 
            title: 'Total Donations', 
            value: `$${totalDonations.toFixed(2)}`, 
            icon: CurrencyDollarIcon, 
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-500/10'
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
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {index === 0 && '+2.5% from last month'}
                  {index === 1 && '+8.1% from last month'}
                  {index === 2 && '+12.3% from last month'}
                  {index === 3 && '+5.7% from last month'}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card variant="glass" padding="lg">
          <Card.Header>
            <Card.Title>Alumni Engagement</Card.Title>
            <Card.Description>Monthly active alumni statistics</Card.Description>
          </Card.Header>
          <Card.Body>
            <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl">
              <motion.img 
                src={image1} 
                alt="Alumni Engagement" 
                className="rounded-lg max-w-full max-h-full object-contain" 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </Card.Body>
        </Card>
        
        <Card variant="glass" padding="lg">
          <Card.Header>
            <Card.Title>Event Participation</Card.Title>
            <Card.Description>Event attendance trends</Card.Description>
          </Card.Header>
          <Card.Body>
            <div className="flex items-center justify-center h-64 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl">
              <motion.img 
                src={image2} 
                alt="Event Participation" 
                className="rounded-lg max-w-full max-h-full object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Recent Activities */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card variant="glass" padding="lg">
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              Recent Alumni
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              {alumni.slice(0, 5).map((alum, idx) => (
                <motion.div 
                  key={alum._id || idx} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {alum.full_name?.charAt(0) || 'A'}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{alum.full_name || 'Unknown'}</div>
                    <div className="text-sm text-gray-400">{alum.email}</div>
                  </div>
                  <EyeIcon className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                </motion.div>
              ))}
            </div>
          </Card.Body>
        </Card>
        
        <Card variant="glass" padding="lg">
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <CalendarDaysIcon className="w-5 h-5" />
              Recent Events
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              {events.slice(0, 5).map((event, idx) => (
                <motion.div 
                  key={event._id || idx}
                  className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <div className="font-medium text-white mb-1">{event.title || 'Untitled Event'}</div>
                  <div className="text-sm text-gray-400">
                    {event.date ? new Date(event.date).toLocaleDateString() : 'Date TBD'}
                  </div>
                  <div className="text-xs text-blue-400 mt-1">Click to view details</div>
                </motion.div>
              ))}
            </div>
          </Card.Body>
        </Card>
        
        <Card variant="glass" padding="lg">
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Mentorship Activity
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="text-center">
              <motion.div 
                className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {mentorshipRequests.length}
              </motion.div>
              <div className="text-sm text-gray-400 mb-4">Pending requests</div>
              <div className="flex justify-center space-x-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-400">Pending</span>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
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
          <img src={search} alt="Search" className="w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..."
            className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-400"
          />
        </div>

        <div className="mt-6 space-y-2">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: HomeIcon },
            { key: 'users', label: 'Users', icon: UsersIcon },
            { key: 'events', label: 'Events', icon: CalendarDaysIcon },
            { key: 'donations', label: 'Donations', icon: CurrencyDollarIcon },
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
              Admin Dashboard
            </h1>
            <p className="text-gray-300 mt-2">Manage your alumni network efficiently</p>
          </div>
          <Card variant="glass" padding="md" hover={false}>
            <div className="text-center">
              <p className="text-sm text-gray-400">Welcome back,</p>
              <p className="font-semibold text-lg">
                {user?.full_name?.split(' ')[0] || 'Admin'}
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
          <Loading type="spinner" size="lg" color="white" message="Loading dashboard data..." />
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

export default AdminDashboard;
