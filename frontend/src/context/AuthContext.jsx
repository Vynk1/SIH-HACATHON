import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if there's a token in localStorage or cookie
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token with backend
          const userData = await api.verifyToken();
          if (userData.success && userData.user) {
            setUser(userData.user);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('token');
          }
        } catch (verifyError) {
          console.error('Token verification failed:', verifyError);
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      console.log('🔑 AuthContext: Starting login API call...');
      const response = await api.login(credentials);
      console.log('🔑 AuthContext: API response received:', response);
      
      if (response.success && response.token) {
        console.log('🔑 AuthContext: Valid response, storing token and setting user state');
        console.log('🔑 AuthContext: User role from response:', response.user.role);
        
        // Store token
        localStorage.setItem('token', response.token);
        
        // Set user state
        setUser(response.user);
        setIsAuthenticated(true);
        
        console.log('🔑 AuthContext: Login complete, returning success');
        return { success: true, user: response.user };
      } else {
        console.log('🔑 AuthContext: Invalid response, throwing error');
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('🔑 AuthContext: Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await api.register(userData);
      
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with client-side logout even if backend call fails
    } finally {
      // Always clear client-side state
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
