import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../config/api";

// Import fallback images
import event1 from "../assets/event1.jpeg";
import event2 from "../assets/event2.jpeg";
import event3 from "../assets/event3.jpeg";
import event4 from "../assets/event4.jpeg";
import event5 from "../assets/event5.jpeg";
import event6 from "../assets/event6.jpeg";

const fallbackImages = [event1, event2, event3, event4, event5, event6];

const Event = () => {
  const { user, isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registering, setRegistering] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    max_participants: ''
  });
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.getEvents();
      if (response.success) {
        setEvents(response.events || []);
      } else {
        setError(response.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterForEvent = async (eventId) => {
    try {
      setRegistering(eventId);
      setError('');
      setSuccess('');
      const response = await api.registerForEvent(eventId);
      if (response.success) {
        setSuccess('Successfully registered for the event!');
        // Optionally refresh events to update registration status
        fetchEvents();
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

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      setError('');
      setSuccess('');
      const response = await api.createEvent(newEvent);
      if (response.success) {
        setSuccess('Event created successfully!');
        setShowCreateModal(false);
        setNewEvent({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          max_participants: ''
        });
        fetchEvents(); // Refresh events list
      } else {
        setError(response.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error.message || 'Failed to create event');
    } finally {
      setCreating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRandomFallbackImage = (index) => {
    return fallbackImages[index % fallbackImages.length];
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 md:p-12 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to view events.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="p-6 md:p-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block">
          Event Management Section
          <span className="block w-16 h-1 bg-indigo-500 mt-2 rounded-full"></span>
        </h2>

        {user?.role === 'admin' && (
          <button 
            onClick={() => setShowCreateModal(true)}
            className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
          >
            + New Event
          </button>
        )}
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Subheading */}
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">
        All Events
      </h3>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {/* Event Cards */}
          {events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <div
                  key={event._id || index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  {/* Event Image */}
                  <img
                    src={event.image || getRandomFallbackImage(index)}
                    alt={event.title}
                    className="w-full h-48 object-cover object-top"
                    onError={(e) => {
                      e.target.src = getRandomFallbackImage(index);
                    }}
                  />

                  {/* Event Content */}
                  <div className="p-4 text-left">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {event.title || 'Untitled Event'}
                    </h4>
                    {event.description && (
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    )}
                    <p className="text-sm text-gray-600">📍 {event.location || 'Location TBD'}</p>
                    <p className="text-sm text-gray-600">📅 {formatDate(event.date)}</p>
                    {event.time && (
                      <p className="text-sm text-gray-600">⏰ {event.time}</p>
                    )}
                    {event.max_participants && (
                      <p className="text-sm text-gray-600">👥 Max: {event.max_participants}</p>
                    )}
                    
                    {/* Register Button for Alumni/Students */}
                    {(user?.role === 'alumni' || user?.role === 'student') && (
                      <button
                        onClick={() => handleRegisterForEvent(event._id)}
                        disabled={registering === event._id}
                        className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300"
                      >
                        {registering === event._id ? 'Registering...' : 'Register'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No events found.</p>
              {user?.role === 'admin' && (
                <p className="text-gray-400 mt-2">Create the first event to get started!</p>
              )}
            </div>
          )}
        </>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Create New Event</h3>
            
            <form onSubmit={handleCreateEvent}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    value={newEvent.max_participants}
                    onChange={(e) => setNewEvent({...newEvent, max_participants: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition duration-300"
                >
                  {creating ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Event;
