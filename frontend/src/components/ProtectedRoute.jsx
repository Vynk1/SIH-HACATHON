import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  console.log('🛑 ProtectedRoute check:', {
    path: location.pathname,
    isAuthenticated,
    userRole: user?.role,
    requiredRoles,
    loading
  });

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0F2027] via-[#357E9E] to-[#478093]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role (if specified)
  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0F2027] via-[#357E9E] to-[#478093]">
        <div className="text-white text-xl">
          Access Denied. You don't have permission to view this page.
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
