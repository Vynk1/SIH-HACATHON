import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import AchievementCard from '../components/AchievementCard';
import { 
  FaTrophy, 
  FaAward, 
  FaBookOpen, 
  FaRocket, 
  FaCertificate,
  FaSearch,
  FaFilter,
  FaStar
} from 'react-icons/fa';

const HallOfFame = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtering and search
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Categories and stats
  const [categoryCounts, setCategoryCounts] = useState([]);
  
  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalAchievements: 0
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchAchievements();
  }, [isAuthenticated, navigate, selectedCategory, selectedYear, searchTerm]);

  const fetchAchievements = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      
      const params = { page, limit: 12 };
      if (selectedCategory) params.category = selectedCategory;
      if (selectedYear) params.year = selectedYear;
      
      const response = await api.getAchievements(params);
      
      if (response.success) {
        let filteredAchievements = response.achievements || [];
        
        // Apply search filter on frontend (since backend doesn't have search yet)
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          filteredAchievements = filteredAchievements.filter(achievement =>
            achievement.title?.toLowerCase().includes(searchLower) ||
            achievement.description?.toLowerCase().includes(searchLower) ||
            achievement.organization?.toLowerCase().includes(searchLower) ||
            achievement.userId?.full_name?.toLowerCase().includes(searchLower)
          );
        }
        
        setAchievements(filteredAchievements);
        setPagination(response.pagination || { currentPage: 1, totalPages: 1, totalAchievements: 0 });
        setCategoryCounts(response.categoryCounts || []);
      } else {
        setError('Failed to fetch achievements');
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setError('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: '', label: 'All Categories', icon: FaStar },
    { value: 'award', label: 'Awards', icon: FaTrophy },
    { value: 'publication', label: 'Publications', icon: FaBookOpen },
    { value: 'startup', label: 'Startups', icon: FaRocket },
    { value: 'recognition', label: 'Recognition', icon: FaAward },
    { value: 'certification', label: 'Certifications', icon: FaCertificate }
  ];

  // Generate year options (current year down to 10 years ago)
  const currentYear = new Date().getFullYear();
  const years = [
    { value: '', label: 'All Years' },
    ...Array.from({ length: 11 }, (_, i) => ({
      value: (currentYear - i).toString(),
      label: (currentYear - i).toString()
    }))
  ];

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(cat => cat.value === category);
    const IconComponent = categoryObj ? categoryObj.icon : FaStar;
    return <IconComponent className="w-5 h-5" />;
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-[#0f1626] text-white font-[Poppins]">
      {/* Header */}
      <div className="bg-[#1a2236] py-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FaTrophy className="w-16 h-16 text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Hall of Fame</h1>
            <p className="text-xl text-gray-400">
              Celebrating the outstanding achievements of our alumni
            </p>
          </div>

          {/* Stats Overview */}
          {categoryCounts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-[#2a324d] rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {formatNumber(pagination.totalAchievements)}
                </div>
                <div className="text-sm text-gray-400">Total Achievements</div>
              </div>
              {categoryCounts.slice(0, 5).map((category) => (
                <div key={category._id} className="bg-[#2a324d] rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-1">
                    {getCategoryIcon(category._id)}
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {formatNumber(category.count)}
                  </div>
                  <div className="text-sm text-gray-400 capitalize">
                    {category._id}s
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search achievements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#2a324d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-[#2a324d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 bg-[#2a324d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map(year => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Achievements Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-12">
            <FaTrophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No achievements found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory || selectedYear
                ? 'Try adjusting your search filters'
                : 'No achievements have been added yet.'
              }
            </p>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-6 text-center text-gray-400">
              Showing {achievements.length} achievement{achievements.length !== 1 ? 's' : ''}
              {(searchTerm || selectedCategory || selectedYear) && (
                <span>
                  {' '}matching your filters
                </span>
              )}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement._id}
                  achievement={achievement}
                  showActions={false}
                  isOwner={false}
                />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => fetchAchievements(pagination.currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 bg-[#1f2740] hover:bg-[#2a324d] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-gray-400">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => fetchAchievements(pagination.currentPage + 1)}
              disabled={!pagination.hasNext}
              className="px-4 py-2 bg-[#1f2740] hover:bg-[#2a324d] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            >
              Next
            </button>
          </div>
        )}

        {/* Featured Achievers Section */}
        {!loading && achievements.length > 0 && (
          <div className="mt-16 bg-[#1a2236] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Featured Achievers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements
                .filter(a => a.userId && a.userId.full_name)
                .slice(0, 3)
                .map((achievement, index) => (
                  <div key={achievement._id} className="text-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                    }`}>
                      <span className="text-2xl font-bold text-white">
                        {achievement.userId.full_name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      {achievement.userId.full_name}
                    </h3>
                    {achievement.userId.alumniProfile && (
                      <p className="text-sm text-gray-400 mb-2">
                        Class of {achievement.userId.alumniProfile.batch_year}
                      </p>
                    )}
                    <p className="text-sm text-gray-300">
                      {achievement.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HallOfFame;
