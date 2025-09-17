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
  MENTORSHIPS_STATUS: (id) => `/mentorships/${id}/status`,
  
  // Job endpoints
  JOBS: '/jobs',
  JOBS_CREATE: '/jobs',
  JOBS_MY: '/jobs/my/jobs',
  JOBS_DETAIL: (id) => `/jobs/${id}`,
  JOBS_APPLY: (id) => `/jobs/${id}/apply`,
  JOBS_UPDATE: (id) => `/jobs/${id}`,
  JOBS_DELETE: (id) => `/jobs/${id}`,
  
  // Achievement endpoints
  ACHIEVEMENTS: '/achievements',
  ACHIEVEMENTS_CREATE: '/achievements',
  ACHIEVEMENTS_MY: '/achievements/my/achievements',
  ACHIEVEMENTS_USER: (userId) => `/achievements/user/${userId}`,
  ACHIEVEMENTS_UPDATE: (id) => `/achievements/${id}`,
  ACHIEVEMENTS_DELETE: (id) => `/achievements/${id}`,
  ACHIEVEMENTS_TOGGLE_VISIBILITY: (id) => `/achievements/${id}/visibility`
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
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } else {
      // Handle non-JSON responses (like HTML error pages)
      const text = await response.text();
      console.error('Non-JSON response:', text);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`API endpoint not found: ${url}`);
        } else if (response.status >= 500) {
          throw new Error('Server error - please check if the backend is running');
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }
      
      throw new Error('Server returned non-JSON response');
    }
  } catch (error) {
    console.error('API Request Error:', error);
    console.error('Request URL:', url);
    console.error('Request Config:', config);
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
    }),
    
  // Job methods
  getJobs: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_ENDPOINTS.JOBS}${queryString ? '?' + queryString : ''}`, {
      method: 'GET'
    });
  },
  
  getJobById: (jobId) =>
    apiRequest(API_ENDPOINTS.JOBS_DETAIL(jobId), {
      method: 'GET'
    }),
    
  createJob: (jobData) =>
    apiRequest(API_ENDPOINTS.JOBS_CREATE, {
      method: 'POST',
      body: JSON.stringify(jobData)
    }),
    
  getMyJobs: () =>
    apiRequest(API_ENDPOINTS.JOBS_MY, {
      method: 'GET'
    }),
    
  updateJob: (jobId, jobData) =>
    apiRequest(API_ENDPOINTS.JOBS_UPDATE(jobId), {
      method: 'PUT',
      body: JSON.stringify(jobData)
    }),
    
  deleteJob: (jobId) =>
    apiRequest(API_ENDPOINTS.JOBS_DELETE(jobId), {
      method: 'DELETE'
    }),
    
  applyForJob: (jobId) =>
    apiRequest(API_ENDPOINTS.JOBS_APPLY(jobId), {
      method: 'POST'
    }),
    
  // Achievement methods
  getAchievements: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_ENDPOINTS.ACHIEVEMENTS}${queryString ? '?' + queryString : ''}`, {
      method: 'GET'
    });
  },
  
  getAchievementsByUserId: (userId) =>
    apiRequest(API_ENDPOINTS.ACHIEVEMENTS_USER(userId), {
      method: 'GET'
    }),
    
  createAchievement: (achievementData) =>
    apiRequest(API_ENDPOINTS.ACHIEVEMENTS_CREATE, {
      method: 'POST',
      body: JSON.stringify(achievementData)
    }),
    
  getMyAchievements: () =>
    apiRequest(API_ENDPOINTS.ACHIEVEMENTS_MY, {
      method: 'GET'
    }),
    
  updateAchievement: (achievementId, achievementData) =>
    apiRequest(API_ENDPOINTS.ACHIEVEMENTS_UPDATE(achievementId), {
      method: 'PUT',
      body: JSON.stringify(achievementData)
    }),
    
  deleteAchievement: (achievementId) =>
    apiRequest(API_ENDPOINTS.ACHIEVEMENTS_DELETE(achievementId), {
      method: 'DELETE'
    }),
    
  toggleAchievementVisibility: (achievementId) =>
    apiRequest(API_ENDPOINTS.ACHIEVEMENTS_TOGGLE_VISIBILITY(achievementId), {
      method: 'PATCH'
    })
};

export default api;
