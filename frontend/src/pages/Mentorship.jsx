import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

const Mentorship = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' for alumni, 'request' for students
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // For students to request mentorship
  const [newRequest, setNewRequest] = useState({
    mentor_email: '',
    topic: '',
    description: '',
    preferred_time: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'alumni') {
        setActiveTab('requests');
        fetchMentorshipRequests();
      } else if (user?.role === 'student') {
        setActiveTab('request');
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [isAuthenticated, user]);

  const fetchMentorshipRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.getMentorshipRequests();
      if (response.success) {
        setMentorshipRequests(response.requests || []);
      } else {
        setError(response.message || 'Failed to fetch mentorship requests');
      }
    } catch (error) {
      console.error('Error fetching mentorship requests:', error);
      setError(error.message || 'Failed to load mentorship requests');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      setSuccess('');
      
      const response = await api.requestMentorship(newRequest);
      if (response.success) {
        setSuccess('Mentorship request submitted successfully!');
        setNewRequest({
          mentor_email: '',
          topic: '',
          description: '',
          preferred_time: ''
        });
      } else {
        setError(response.message || 'Failed to submit mentorship request');
      }
    } catch (error) {
      console.error('Error submitting mentorship request:', error);
      setError(error.message || 'Failed to submit mentorship request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      setError('');
      setSuccess('');
      
      const response = await api.updateMentorshipStatus(requestId, { status });
      if (response.success) {
        setSuccess(`Request ${status} successfully!`);
        fetchMentorshipRequests(); // Refresh the list
      } else {
        setError(response.message || 'Failed to update request status');
      }
    } catch (error) {
      console.error('Error updating mentorship status:', error);
      setError(error.message || 'Failed to update request status');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to access mentorship features.</p>
        </div>
      </div>
    );
  }

  if (user?.role !== 'alumni' && user?.role !== 'student') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600">Mentorship features are available for alumni and students only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Mentorship Program</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect alumni mentors with students for career guidance, skill development, and professional growth.
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Alumni View - Mentorship Requests */}
        {user?.role === 'alumni' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mentorship Requests for You</h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <>
                {mentorshipRequests.length > 0 ? (
                  <div className="space-y-4">
                    {mentorshipRequests.map((request, index) => (
                      <div key={request._id || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">
                              {request.student_name || 'Anonymous Student'}
                            </h3>
                            <p className="text-gray-600">{request.student_email || 'No email provided'}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status || 'pending'}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-800">Topic:</h4>
                          <p className="text-gray-600">{request.topic || 'General mentorship'}</p>
                        </div>
                        
                        {request.description && (
                          <div className="mb-3">
                            <h4 className="font-medium text-gray-800">Description:</h4>
                            <p className="text-gray-600">{request.description}</p>
                          </div>
                        )}
                        
                        {request.preferred_time && (
                          <div className="mb-3">
                            <h4 className="font-medium text-gray-800">Preferred Time:</h4>
                            <p className="text-gray-600">{request.preferred_time}</p>
                          </div>
                        )}
                        
                        {request.status === 'pending' && (
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() => handleStatusUpdate(request._id, 'approved')}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(request._id, 'rejected')}
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
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No mentorship requests yet.</p>
                    <p className="text-gray-400 mt-2">Students will be able to reach out to you for mentorship guidance.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Student View - Request Mentorship */}
        {user?.role === 'student' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Request Mentorship</h2>
            
            <form onSubmit={handleRequestSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mentor Email *
                </label>
                <input
                  type="email"
                  value={newRequest.mentor_email}
                  onChange={(e) => setNewRequest({...newRequest, mentor_email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter the email of the alumni mentor"
                  required
                  disabled={submitting}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter the email address of the alumni you'd like to request mentorship from.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic/Area of Interest *
                </label>
                <input
                  type="text"
                  value={newRequest.topic}
                  onChange={(e) => setNewRequest({...newRequest, topic: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Software Development, Career Guidance, Entrepreneurship"
                  required
                  disabled={submitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  rows="4"
                  placeholder="Describe what you're looking for help with and your goals..."
                  disabled={submitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Meeting Time
                </label>
                <input
                  type="text"
                  value={newRequest.preferred_time}
                  onChange={(e) => setNewRequest({...newRequest, preferred_time: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Weekends, Evenings, Flexible"
                  disabled={submitting}
                />
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition"
              >
                {submitting ? 'Submitting Request...' : 'Submit Mentorship Request'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentorship;
