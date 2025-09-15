import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

const Donation = () => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    amount: '',
    purpose: ''
  });
  const [myDonations, setMyDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showMyDonations, setShowMyDonations] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'alumni') {
      fetchMyDonations();
    }
  }, [isAuthenticated, user]);

  const fetchMyDonations = async () => {
    try {
      setLoadingDonations(true);
      setError('');
      const response = await api.getMyDonations();
      if (response.success) {
        setMyDonations(response.donations || []);
      } else {
        setError(response.message || 'Failed to fetch donations');
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
      setError(error.message || 'Failed to load donations');
    } finally {
      setLoadingDonations(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear messages when typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Please login to make a donation');
      return;
    }

    if (user?.role !== 'alumni') {
      setError('Only alumni can make donations');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const donationData = {
        amount: parseFloat(formData.amount),
        purpose: formData.purpose
      };
      
      const response = await api.createDonation(donationData);
      if (response.success) {
        setSuccess('Donation submitted successfully! Thank you for your contribution.');
        setFormData({ amount: '', purpose: '' });
        // Refresh donations list
        fetchMyDonations();
      } else {
        setError(response.message || 'Failed to submit donation');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      setError(error.message || 'Failed to submit donation');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to make a donation.</p>
        </div>
      </div>
    );
  }

  if (user?.role !== 'alumni') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600">Only alumni can make donations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex mb-8 bg-white rounded-lg p-2 shadow-md">
          <button
            onClick={() => setShowMyDonations(false)}
            className={`flex-1 py-2 px-4 rounded-md transition ${!showMyDonations ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Make Donation
          </button>
          <button
            onClick={() => setShowMyDonations(true)}
            className={`flex-1 py-2 px-4 rounded-md transition ${showMyDonations ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            My Donations ({myDonations.length})
          </button>
        </div>

        {!showMyDonations ? (
          /* Donation Form */
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-[#d8def0] rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-center text-black mb-6">Make a Donation</h2>
              
              {/* Success Message */}
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                  {success}
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Donation Amount */}
                <div>
                  <label className="block mb-1 font-medium text-gray-800">
                    <span className="inline-flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1C5.9 1 1 5.4 1 12s4.9 11 11 11 11-4.4 11-11S18.1 1 12 1zm1 17.9V19h-2v-.1c-1.8-.2-3.2-1.7-3.2-3.5h2c0 .9.8 1.7 1.8 1.7s1.8-.8 1.8-1.7c0-.9-.8-1.7-1.8-1.7-2.3 0-4.2-1.6-4.2-3.6 0-1.8 1.4-3.2 3.2-3.5V5h2v.1c1.8.2 3.2 1.7 3.2 3.5h-2c0-.9-.8-1.7-1.8-1.7s-1.8.8-1.8 1.7c0 .9.8 1.7 1.8 1.7 2.3 0 4.2 1.6 4.2 3.6 0 1.8-1.4 3.3-3.2 3.5z"/>
                      </svg>
                      Donation Amount ($)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full border-b-2 border-gray-400 bg-transparent outline-none py-1 px-2"
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label className="block mb-1 font-medium text-gray-800">
                    <span className="inline-flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h10v2H4v-2z"/>
                      </svg>
                      Purpose
                    </span>
                  </label>
                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full border-b-2 border-gray-400 bg-transparent outline-none py-1 px-2"
                    placeholder="Donation purpose"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
                  >
                    {loading ? 'Submitting...' : 'Submit Donation'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* My Donations List */
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Donation History</h2>
            
            {loadingDonations ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <>
                {myDonations.length > 0 ? (
                  <div className="space-y-4">
                    {myDonations.map((donation, index) => (
                      <div key={donation._id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">${donation.amount}</h3>
                            <p className="text-gray-600 mt-1">{donation.purpose}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              Date: {formatDate(donation.createdAt || donation.date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                              donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {donation.status || 'Submitted'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Total Donations */}
                    <div className="border-t pt-4 mt-6">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">
                          Total Donated: ${myDonations.reduce((sum, donation) => sum + (donation.amount || 0), 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No donations found.</p>
                    <button
                      onClick={() => setShowMyDonations(false)}
                      className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Make your first donation
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Donation;
