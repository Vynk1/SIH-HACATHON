// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',
  
  // Alumni endpoints
  ALUMNI_ME: '/alumni/me',
  ALUMNI_ALL: '/alumni/all',
  
  // Admin endpoints  
  ADMIN_ME: '/admin/me',
  
  // Student endpoints
  STUDENT_ME: '/student/me',
  STUDENTS_ALL: '/students/all',
  
  // Events endpoints
  EVENTS_SHOW: '/events/show-events',
  EVENTS_CREATE: '/events/create-event',
  EVENTS_DELETE: (id) => `/events/${id}`,
  EVENTS_REGISTER: (id) => `/events/${id}/register`,
  
  // Donations endpoints
  DONATIONS_DONATE: '/donations/donate',
  DONATIONS_MY: '/donations/my',
  DONATIONS_SHOW: '/donations/show-donations',
  
  // Mentorship endpoints
  MENTORSHIPS_REQUEST: '/mentorships/request',
  MENTORSHIPS_AS_MENTOR: '/mentorships/as-mentor',
  MENTORSHIPS_MY_REQUESTS: '/mentorships/my-requests',
  MENTORSHIPS_ALL: '/mentorships/all',
  MENTORSHIPS_AVAILABLE_MENTORS: '/mentorships/available-mentors',
  MENTORSHIPS_STATUS: (id) => `/mentorships/${id}/status`
};

// Create full URL for an endpoint
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Default fetch configuration
export const defaultFetchConfig = {
  credentials: 'include', // Include cookies for authentication
  headers: {
    'Content-Type': 'application/json',
  }
};

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Add auth header if token exists
const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = { ...defaultFetchConfig.headers };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// API helper functions
export const apiRequest = async (endpoint, options = {}) => {
  const url = createApiUrl(endpoint);
  const config = {
    ...defaultFetchConfig,
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Specific API methods
export const api = {
  // Auth methods
  login: (credentials) => 
    apiRequest(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
    
  register: (userData) => 
    apiRequest(API_ENDPOINTS.REGISTER, {
      method: 'POST', 
      body: JSON.stringify(userData)
    }),
    
  // Verify token method (using /auth/me endpoint)
  verifyToken: () => 
    apiRequest(API_ENDPOINTS.ME, {
      method: 'GET'
    }),
    
  logout: () => 
    apiRequest(API_ENDPOINTS.LOGOUT, {
      method: 'POST'
    }),
    
  // Alumni methods
  getAlumniProfile: () => 
    apiRequest(API_ENDPOINTS.ALUMNI_ME, {
      method: 'GET'
    }),
  
  updateAlumniProfile: (alumniData) =>
    apiRequest(API_ENDPOINTS.ALUMNI_ME, {
      method: 'POST',
      body: JSON.stringify(alumniData)
    }),
    
  // Admin methods
  getAdminProfile: () => 
    apiRequest(API_ENDPOINTS.ADMIN_ME, {
      method: 'GET'
    }),
  
  updateAdminProfile: (adminData) =>
    apiRequest(API_ENDPOINTS.ADMIN_ME, {
      method: 'POST',
      body: JSON.stringify(adminData)
    }),
  
  getAllAlumni: () =>
    apiRequest(API_ENDPOINTS.ALUMNI_ALL, {
      method: 'GET'
    }),
  
  getAllStudents: () =>
    apiRequest(API_ENDPOINTS.STUDENTS_ALL, {
      method: 'GET'
    }),
  
  getAllMentorshipRequests: () =>
    apiRequest(API_ENDPOINTS.MENTORSHIPS_ALL, {
      method: 'GET'
    }),
    
  // Student methods
  getStudentProfile: () => 
    apiRequest(API_ENDPOINTS.STUDENT_ME, {
      method: 'GET'
    }),
  
  updateStudentProfile: (studentData) =>
    apiRequest(API_ENDPOINTS.STUDENT_ME, {
      method: 'POST',
      body: JSON.stringify(studentData)
    }),
    
  // Events methods
  getEvents: () => 
    apiRequest(API_ENDPOINTS.EVENTS_SHOW, {
      method: 'GET'
    }),
  
  createEvent: (eventData) =>
    apiRequest(API_ENDPOINTS.EVENTS_CREATE, {
      method: 'POST',
      body: JSON.stringify(eventData)
    }),
  
  deleteEvent: (eventId) =>
    apiRequest(API_ENDPOINTS.EVENTS_DELETE(eventId), {
      method: 'DELETE'
    }),
    
  registerForEvent: (eventId) =>
    apiRequest(API_ENDPOINTS.EVENTS_REGISTER(eventId), {
      method: 'POST'
    }),
    
  // Donations methods
  getDonations: () => 
    apiRequest(API_ENDPOINTS.DONATIONS_SHOW, {
      method: 'GET'
    }),
    
  getMyDonations: () => 
    apiRequest(API_ENDPOINTS.DONATIONS_MY, {
      method: 'GET'
    }),
  
  createDonation: (donationData) =>
    apiRequest(API_ENDPOINTS.DONATIONS_DONATE, {
      method: 'POST',
      body: JSON.stringify(donationData)
    }),
    
  // Mentorship methods
  requestMentorship: (mentorshipData) => 
    apiRequest(API_ENDPOINTS.MENTORSHIPS_REQUEST, {
      method: 'POST',
      body: JSON.stringify(mentorshipData)
    }),
    
  createMentorshipRequest: (mentorshipData) => 
    apiRequest(API_ENDPOINTS.MENTORSHIPS_REQUEST, {
      method: 'POST',
      body: JSON.stringify(mentorshipData)
    }),
    
  getMentorshipRequests: () => 
    apiRequest(API_ENDPOINTS.MENTORSHIPS_AS_MENTOR, {
      method: 'GET'
    }),
  
  getMyMentorshipRequests: () => 
    apiRequest(API_ENDPOINTS.MENTORSHIPS_MY_REQUESTS, {
      method: 'GET'
    }),
    
  getAvailableMentors: () => 
    apiRequest(API_ENDPOINTS.MENTORSHIPS_AVAILABLE_MENTORS, {
      method: 'GET'
    }),
  
  updateMentorshipStatus: (mentorshipId, statusData) =>
    apiRequest(API_ENDPOINTS.MENTORSHIPS_STATUS(mentorshipId), {
      method: 'PATCH',
      body: JSON.stringify(statusData)
    })
};

export default api;
