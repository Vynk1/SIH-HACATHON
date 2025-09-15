import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ title = "Dashboard" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-[#1a2236] p-4 flex justify-between items-center text-white">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-300">
            Welcome, {user.full_name || user.name || 'User'}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navigation;
