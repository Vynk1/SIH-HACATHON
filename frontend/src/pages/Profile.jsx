import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../config/api";
import {
  FaUser,
  FaBook,
  FaEnvelope,
  FaPhone,
  FaBell,
  FaSearch,
  FaEdit,
  FaSave,
  FaBuilding,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTags
} from "react-icons/fa";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // User profile data
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

  useEffect(() => {
    if (isAuthenticated && user?.role === 'alumni') {
      fetchAlumniProfile();
    } else if (isAuthenticated) {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchAlumniProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.getAlumniProfile();
      if (response.success && response.profile) {
        setProfileData({
          batch_year: response.profile.batch_year || '',
          degree: response.profile.degree || '',
          department: response.profile.department || '',
          current_position: response.profile.current_position || '',
          company: response.profile.company || '',
          linkedin_url: response.profile.linkedin_url || '',
          location: response.profile.location || '',
          skills: Array.isArray(response.profile.skills) ? response.profile.skills.join(', ') : response.profile.skills || ''
        });
      }
    } catch (error) {
      console.error('Error fetching alumni profile:', error);
      setError(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, field) => {
    setProfileData({ ...profileData, [field]: e.target.value });
    // Clear messages when typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      // Prepare data for backend
      const dataToSave = {
        ...profileData,
        skills: profileData.skills ? profileData.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : []
      };
      
      const response = await api.updateAlumniProfile(dataToSave);
      if (response.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        // Refresh profile data
        fetchAlumniProfile();
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full font-[Poppins] bg-gradient-to-b from-[#0f1d2f] to-[#2b9ec0] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-300">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (user?.role !== 'alumni') {
    return (
      <div className="min-h-screen w-full font-[Poppins] bg-gradient-to-b from-[#0f1d2f] to-[#2b9ec0] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Alumni Profile Only</h2>
          <p className="text-gray-300">This profile page is available for alumni users only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-[Poppins] bg-gradient-to-b from-[#0f1d2f] to-[#2b9ec0] text-white flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl mb-8 gap-4 sm:gap-0">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Welcome, {user?.full_name?.split(" ")[0] || 'Alumni'}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="flex items-center w-full sm:w-auto gap-3">
          <div className="flex items-center bg-white rounded-md px-3 py-2 text-black flex-1 sm:flex-none">
            <FaSearch className="w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 border-none outline-none text-sm bg-white text-black"
            />
          </div>
          <FaBell className="w-6 h-6" />
        </div>
      </header>

      {/* Profile Info */}
      <section className="flex flex-col w-full max-w-5xl bg-black/20 rounded-xl p-6 sm:p-10 gap-6">
        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded-lg">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Avatar & Name */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black text-3xl">
            <FaUser />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold">
              {user?.full_name || 'Alumni User'}
            </h3>
            <p className="text-gray-300">{user?.email}</p>
            {profileData.current_position && profileData.company && (
              <p className="text-gray-400 text-sm">
                {profileData.current_position} at {profileData.company}
              </p>
            )}
          </div>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            disabled={saving || loading}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 px-4 py-2 rounded-md text-white font-semibold transition"
          >
            {saving ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : isEditing ? (
              <FaSave />
            ) : (
              <FaEdit />
            )}
            {saving ? "Saving..." : isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          /* Form Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                label: "Batch Year",
                icon: <FaUser />,
                value: profileData.batch_year,
                field: "batch_year",
                type: "number",
                placeholder: "e.g. 2020"
              },
              {
                label: "Degree",
                icon: <FaBook />,
                value: profileData.degree,
                field: "degree",
                type: "text",
                placeholder: "e.g. B.Tech Computer Science"
              },
              {
                label: "Department",
                icon: <FaBook />,
                value: profileData.department,
                field: "department",
                type: "text",
                placeholder: "e.g. Computer Science"
              },
              {
                label: "Current Position",
                icon: <FaUser />,
                value: profileData.current_position,
                field: "current_position",
                type: "text",
                placeholder: "e.g. Software Engineer"
              },
              {
                label: "Company",
                icon: <FaBuilding />,
                value: profileData.company,
                field: "company",
                type: "text",
                placeholder: "e.g. Google Inc."
              },
              {
                label: "Location",
                icon: <FaMapMarkerAlt />,
                value: profileData.location,
                field: "location",
                type: "text",
                placeholder: "e.g. San Francisco, CA"
              },
              {
                label: "LinkedIn URL",
                icon: <FaLinkedin />,
                value: profileData.linkedin_url,
                field: "linkedin_url",
                type: "url",
                placeholder: "https://linkedin.com/in/yourprofile",
                fullWidth: true
              },
              {
                label: "Skills",
                icon: <FaTags />,
                value: profileData.skills,
                field: "skills",
                type: "text",
                placeholder: "e.g. React, Node.js, Python (comma separated)",
                fullWidth: true
              },
            ].map((field, idx) => (
              <div key={idx} className={`flex flex-col w-full ${field.fullWidth ? 'md:col-span-2' : ''}`}>
                <label className="mb-2 text-base font-medium flex items-center gap-2">
                  {field.icon} {field.label}
                </label>

                {isEditing ? (
                  <input
                    type={field.type || "text"}
                    value={field.value}
                    onChange={(e) => handleChange(e, field.field)}
                    placeholder={field.placeholder}
                    className="w-full h-10 px-3 rounded-md text-black bg-white text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    disabled={saving}
                  />
                ) : (
                  <p className="w-full min-h-10 px-3 flex items-center rounded-md bg-white/10 text-sm">
                    {field.value || "—"}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* User Info Section */}
        <div className="flex flex-col gap-3 mt-4">
          <p className="mb-2 font-medium flex items-center gap-2">
            <FaUser /> Basic Information
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-md">
              <FaEnvelope className="w-5 h-5" />
              <div>
                <p className="font-medium text-sm text-gray-300">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-md">
              <FaUser className="w-5 h-5" />
              <div>
                <p className="font-medium text-sm text-gray-300">Full Name</p>
                <p className="font-medium">{user?.full_name}</p>
              </div>
            </div>
            {user?.phone_number && (
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-md">
                <FaPhone className="w-5 h-5" />
                <div>
                  <p className="font-medium text-sm text-gray-300">Phone</p>
                  <p className="font-medium">{user.phone_number}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-md">
              <FaUser className="w-5 h-5" />
              <div>
                <p className="font-medium text-sm text-gray-300">Role</p>
                <p className="font-medium capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
