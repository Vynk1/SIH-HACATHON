import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaExternalLinkAlt, 
  FaClock,
  FaDollarSign,
  FaUser,
  FaEdit,
  FaTrash
} from 'react-icons/fa';

const JobCard = ({ job, onApply, onUpdate, onDelete, showActions = true, isOwner = false }) => {
  const { user } = useAuth();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(
    job.applications?.some(app => 
      (typeof app.applicant === 'object' ? app.applicant._id : app.applicant) === user?._id
    ) || false
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleApply = async () => {
    if (applied || applying) return;

    try {
      setApplying(true);
      const response = await api.applyForJob(job._id);
      
      if (response.success) {
        setApplied(true);
        // Open external link in new tab
        if (response.applyLink) {
          window.open(response.applyLink, '_blank');
        }
        if (onApply) {
          onApply(job._id, response);
        }
        // Also show a success message
        console.log('Applied successfully:', response.message);
      }
    } catch (error) {
      console.error('Error applying for job:', error);
    } finally {
      setApplying(false);
    }
  };

  const getJobTypeColor = (type) => {
    switch (type) {
      case 'full-time': return 'bg-blue-100 text-blue-800';
      case 'part-time': return 'bg-green-100 text-green-800';
      case 'internship': return 'bg-purple-100 text-purple-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-[#1f2740] rounded-lg p-6 hover:bg-[#2a324d] transition-colors border border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-2">
            <div className="flex items-center gap-1">
              <FaBuilding className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        
        {/* Job Type Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
          {job.jobType?.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      {/* Description */}
      {job.description && (
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>
      )}

      {/* Additional Info */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
        {job.experience && (
          <div className="flex items-center gap-1">
            <FaBriefcase className="w-3 h-3" />
            <span>{job.experience}</span>
          </div>
        )}
        {job.salary && (
          <div className="flex items-center gap-1">
            <FaDollarSign className="w-3 h-3" />
            <span>{job.salary}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <FaClock className="w-3 h-3" />
          <span>Posted {formatDate(job.createdAt)}</span>
        </div>
        {job.postedBy && (
          <div className="flex items-center gap-1">
            <FaUser className="w-3 h-3" />
            <span>by {job.postedBy.full_name}</span>
          </div>
        )}
      </div>

      {/* Application Count */}
      {job.applications && job.applications.length > 0 && (
        <div className="text-sm text-gray-400 mb-4">
          {job.applications.length} application{job.applications.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-600">
          <div className="flex gap-2">
            {isOwner ? (
              <>
                <button
                  onClick={() => onUpdate && onUpdate(job)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
                >
                  <FaEdit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete && onDelete(job._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition"
                >
                  <FaTrash className="w-4 h-4" />
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={handleApply}
                disabled={applied || applying}
                className={`flex items-center gap-2 px-6 py-2 text-sm rounded-lg transition ${
                  applied
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : applying
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {applying ? (
                  'Applying...'
                ) : applied ? (
                  'Applied'
                ) : (
                  <>
                    <FaExternalLinkAlt className="w-4 h-4" />
                    Apply Now
                  </>
                )}
              </button>
            )}
          </div>

          {/* External Link */}
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition"
          >
            <FaExternalLinkAlt className="w-3 h-3" />
            View Details
          </a>
        </div>
      )}
    </div>
  );
};

export default JobCard;
