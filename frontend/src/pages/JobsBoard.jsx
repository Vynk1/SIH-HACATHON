import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import JobCard from '../components/JobCard';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaBriefcase,
  FaTimes,
  FaSave
} from 'react-icons/fa';

const JobsBoard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Filtering and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  // Modal states
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  
  // Job form
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    applyLink: '',
    description: '',
    jobType: 'full-time',
    experience: '',
    salary: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchJobs();
  }, [isAuthenticated, navigate, selectedJobType, selectedLocation, searchTerm]);

  const fetchJobs = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      
      const params = { page, limit: 12 };
      if (selectedJobType) params.jobType = selectedJobType;
      if (selectedLocation) params.location = selectedLocation;
      if (searchTerm) params.search = searchTerm;
      
      const response = await api.getJobs(params);
      
      if (response.success) {
        setJobs(response.jobs || []);
        setPagination(response.pagination || { currentPage: 1, totalPages: 1, totalJobs: 0 });
      } else {
        setError('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load job listings');
    } finally {
      setLoading(false);
    }
  };

  const handleJobFormChange = (field, value) => {
    setJobForm({ ...jobForm, [field]: value });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();
    
    if (!jobForm.title || !jobForm.company || !jobForm.location || !jobForm.applyLink) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      setSuccess('');
      
      const response = editingJob 
        ? await api.updateJob(editingJob._id, jobForm)
        : await api.createJob(jobForm);
      
      if (response.success) {
        setSuccess(editingJob ? 'Job updated successfully!' : 'Job posted successfully!');
        setJobForm({
          title: '',
          company: '',
          location: '',
          applyLink: '',
          description: '',
          jobType: 'full-time',
          experience: '',
          salary: ''
        });
        setShowPostJobModal(false);
        setShowEditJobModal(false);
        setEditingJob(null);
        fetchJobs();
      } else {
        setError(response.message || 'Failed to save job');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      setError(error.message || 'Failed to save job');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      applyLink: job.applyLink || '',
      description: job.description || '',
      jobType: job.jobType || 'full-time',
      experience: job.experience || '',
      salary: job.salary || ''
    });
    setShowEditJobModal(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) {
      return;
    }

    try {
      const response = await api.deleteJob(jobId);
      if (response.success) {
        setSuccess('Job deleted successfully!');
        fetchJobs();
      } else {
        setError('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Failed to delete job');
    }
  };

  const closeModals = () => {
    setShowPostJobModal(false);
    setShowEditJobModal(false);
    setEditingJob(null);
    setJobForm({
      title: '',
      company: '',
      location: '',
      applyLink: '',
      description: '',
      jobType: 'full-time',
      experience: '',
      salary: ''
    });
    setError('');
    setSuccess('');
  };

  const jobTypes = [
    { value: '', label: 'All Job Types' },
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' }
  ];

  const renderJobModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1f2740] rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {editingJob ? 'Edit Job Posting' : 'Post New Job'}
          </h3>
          <button
            onClick={closeModals}
            className="text-gray-400 hover:text-white p-1 rounded"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmitJob} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={jobForm.title}
                onChange={(e) => handleJobFormChange('title', e.target.value)}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Software Engineer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={jobForm.company}
                onChange={(e) => handleJobFormChange('company', e.target.value)}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Tech Corp"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={jobForm.location}
                onChange={(e) => handleJobFormChange('location', e.target.value)}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. New York, NY or Remote"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Type
              </label>
              <select
                value={jobForm.jobType}
                onChange={(e) => handleJobFormChange('jobType', e.target.value)}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jobTypes.slice(1).map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Experience Level
              </label>
              <input
                type="text"
                value={jobForm.experience}
                onChange={(e) => handleJobFormChange('experience', e.target.value)}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 2-3 years, Entry Level"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Salary Range
              </label>
              <input
                type="text"
                value={jobForm.salary}
                onChange={(e) => handleJobFormChange('salary', e.target.value)}
                className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. $80k-$120k, Competitive"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Application Link *
            </label>
            <input
              type="url"
              value={jobForm.applyLink}
              onChange={(e) => handleJobFormChange('applyLink', e.target.value)}
              className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://company.com/apply"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Description
            </label>
            <textarea
              value={jobForm.description}
              onChange={(e) => handleJobFormChange('description', e.target.value)}
              rows={4}
              className="w-full bg-[#2a324d] px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Brief description of the role and requirements..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition"
            >
              <FaSave className="w-4 h-4" />
              {submitting ? 'Saving...' : (editingJob ? 'Update Job' : 'Post Job')}
            </button>
            <button
              type="button"
              onClick={closeModals}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f1626] text-white font-[Poppins]">
      {/* Header */}
      <div className="bg-[#1a2236] py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Job & Internship Board</h1>
              <p className="text-gray-400">
                Discover opportunities posted by our alumni network
              </p>
            </div>
            
            {user?.role === 'alumni' && (
              <button
                onClick={() => setShowPostJobModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                <FaPlus className="w-4 h-4" />
                Post Job
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#2a324d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="px-4 py-2 bg-[#2a324d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {jobTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Filter by location..."
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 bg-[#2a324d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 text-green-200 rounded-lg">
            {success}
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <FaBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No jobs found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedJobType || selectedLocation 
                ? 'Try adjusting your search filters'
                : 'Be the first to post a job opportunity!'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onUpdate={handleEditJob}
                onDelete={handleDeleteJob}
                isOwner={job.postedBy?._id === user?._id}
                showActions={true}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => fetchJobs(pagination.currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 bg-[#1f2740] hover:bg-[#2a324d] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-gray-400">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => fetchJobs(pagination.currentPage + 1)}
              disabled={!pagination.hasNext}
              className="px-4 py-2 bg-[#1f2740] hover:bg-[#2a324d] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {(showPostJobModal || showEditJobModal) && renderJobModal()}
    </div>
  );
};

export default JobsBoard;
