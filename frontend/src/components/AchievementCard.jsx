import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import { 
  FaTrophy, 
  FaAward, 
  FaBookOpen, 
  FaRocket, 
  FaCertificate,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
  FaCalendar,
  FaBuilding,
  FaUser
} from 'react-icons/fa';

const AchievementCard = ({ 
  achievement, 
  onUpdate, 
  onDelete, 
  onToggleVisibility, 
  showActions = false, 
  isOwner = false 
}) => {
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'award': return <FaTrophy className="w-5 h-5 text-yellow-500" />;
      case 'publication': return <FaBookOpen className="w-5 h-5 text-blue-500" />;
      case 'startup': return <FaRocket className="w-5 h-5 text-green-500" />;
      case 'recognition': return <FaAward className="w-5 h-5 text-purple-500" />;
      case 'certification': return <FaCertificate className="w-5 h-5 text-orange-500" />;
      default: return <FaTrophy className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'award': return 'bg-yellow-100 text-yellow-800';
      case 'publication': return 'bg-blue-100 text-blue-800';
      case 'startup': return 'bg-green-100 text-green-800';
      case 'recognition': return 'bg-purple-100 text-purple-800';
      case 'certification': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToggleVisibility = async () => {
    if (processing) return;

    try {
      setProcessing(true);
      const response = await api.toggleAchievementVisibility(achievement._id);
      if (response.success && onToggleVisibility) {
        onToggleVisibility(achievement._id, !achievement.isVisible);
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) {
      return;
    }

    if (processing) return;

    try {
      setProcessing(true);
      const response = await api.deleteAchievement(achievement._id);
      if (response.success && onDelete) {
        onDelete(achievement._id);
      }
    } catch (error) {
      console.error('Error deleting achievement:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-[#1f2740] rounded-lg p-6 hover:bg-[#2a324d] transition-colors border border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          {getCategoryIcon(achievement.category)}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-1">{achievement.title}</h3>
            {achievement.organization && (
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <FaBuilding className="w-3 h-3" />
                <span>{achievement.organization}</span>
              </div>
            )}
          </div>
        </div>

        {/* Category Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement.category)}`}>
          {achievement.category?.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      {achievement.description && (
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {achievement.description}
        </p>
      )}

      {/* Achievement Info */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
        {achievement.date && (
          <div className="flex items-center gap-1">
            <FaCalendar className="w-3 h-3" />
            <span>{formatDate(achievement.date)}</span>
          </div>
        )}
        
        {/* User info for public view */}
        {achievement.userId && !isOwner && (
          <div className="flex items-center gap-1">
            <FaUser className="w-3 h-3" />
            <span>
              {achievement.userId.full_name}
              {achievement.userId.alumniProfile && (
                <span className="text-gray-500">
                  {' '}({achievement.userId.alumniProfile.batch_year})
                </span>
              )}
            </span>
          </div>
        )}

        {/* Visibility indicator for owner */}
        {isOwner && (
          <div className="flex items-center gap-1">
            {achievement.isVisible ? (
              <>
                <FaEye className="w-3 h-3 text-green-400" />
                <span className="text-green-400">Public</span>
              </>
            ) : (
              <>
                <FaEyeSlash className="w-3 h-3 text-gray-500" />
                <span className="text-gray-500">Private</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Image */}
      {achievement.imageUrl && (
        <div className="mb-4">
          <img
            src={achievement.imageUrl}
            alt={achievement.title}
            className="w-full h-48 object-cover rounded-lg border border-gray-600"
            loading="lazy"
          />
        </div>
      )}

      {/* Actions */}
      {showActions && (isOwner || user?.role === 'admin') && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-600">
          <div className="flex gap-2">
            {isOwner && (
              <>
                <button
                  onClick={() => onUpdate && onUpdate(achievement)}
                  disabled={processing}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm rounded-lg transition"
                >
                  <FaEdit className="w-3 h-3" />
                  Edit
                </button>
                
                <button
                  onClick={handleToggleVisibility}
                  disabled={processing}
                  className={`flex items-center gap-2 px-3 py-2 text-white text-sm rounded-lg transition ${
                    achievement.isVisible
                      ? 'bg-gray-600 hover:bg-gray-700'
                      : 'bg-green-600 hover:bg-green-700'
                  } disabled:opacity-50`}
                >
                  {achievement.isVisible ? (
                    <>
                      <FaEyeSlash className="w-3 h-3" />
                      Make Private
                    </>
                  ) : (
                    <>
                      <FaEye className="w-3 h-3" />
                      Make Public
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={processing}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm rounded-lg transition"
                >
                  <FaTrash className="w-3 h-3" />
                  Delete
                </button>
              </>
            )}
          </div>

          {/* External Link */}
          {achievement.link && (
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              View Details
            </a>
          )}
        </div>
      )}

      {/* External Link for non-owner view */}
      {!showActions && achievement.link && (
        <div className="pt-4 border-t border-gray-600">
          <a
            href={achievement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition"
          >
            <FaExternalLinkAlt className="w-3 h-3" />
            Learn More
          </a>
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
