const Achievement = require("../model/achievement.model");
const User = require("../model/user.model");
const AlumniProfile = require("../model/alumniProfile.model");

// Create a new achievement (Alumni only)
const createAchievement = async (req, res) => {
  try {
    const { title, description, category, organization, date, link, imageUrl } = req.body;
    const userId = req.user._id;

    // Verify user is alumni
    const user = await User.findById(userId);
    if (!user || user.role !== 'alumni') {
      return res.status(403).json({
        success: false,
        message: "Only alumni can add achievements"
      });
    }

    // Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Achievement title is required"
      });
    }

    // Create new achievement
    const newAchievement = new Achievement({
      userId,
      title: title.trim(),
      description: description?.trim(),
      category: category || 'other',
      organization: organization?.trim(),
      date: date ? new Date(date) : null,
      link: link?.trim(),
      imageUrl: imageUrl?.trim()
    });

    await newAchievement.save();

    // Populate user details for response
    await newAchievement.populate('userId', 'full_name email');

    res.status(201).json({
      success: true,
      message: "Achievement added successfully",
      achievement: newAchievement
    });

  } catch (error) {
    console.error("Error creating achievement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create achievement",
      error: error.message
    });
  }
};

// Get all achievements (Hall of Fame)
const getAllAchievements = async (req, res) => {
  try {
    const { category, page = 1, limit = 20, year } = req.query;
    
    // Build filter object
    const filter = { isVisible: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get achievements with user and alumni profile details
    const achievements = await Achievement.find(filter)
      .populate({
        path: 'userId',
        select: 'full_name email',
        populate: {
          path: 'alumniProfile',
          model: 'AlumniProfile',
          select: 'batch_year degree department current_position company location'
        }
      })
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get alumni profile data separately if not populated
    const enrichedAchievements = await Promise.all(
      achievements.map(async (achievement) => {
        const achievementObj = achievement.toObject();
        if (!achievementObj.userId.alumniProfile) {
          const alumniProfile = await AlumniProfile.findOne({ user_id: achievement.userId._id });
          achievementObj.userId.alumniProfile = alumniProfile;
        }
        return achievementObj;
      })
    );

    // Get total count for pagination
    const totalAchievements = await Achievement.countDocuments(filter);
    const totalPages = Math.ceil(totalAchievements / parseInt(limit));

    // Get category counts for filtering
    const categoryCounts = await Achievement.aggregate([
      { $match: { isVisible: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      achievements: enrichedAchievements,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalAchievements,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      },
      categoryCounts
    });

  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch achievements",
      error: error.message
    });
  }
};

// Get achievements for current user (Alumni only)
const getMyAchievements = async (req, res) => {
  try {
    const userId = req.user._id;

    // Verify user is alumni
    const user = await User.findById(userId);
    if (!user || user.role !== 'alumni') {
      return res.status(403).json({
        success: false,
        message: "Only alumni can access this endpoint"
      });
    }

    const achievements = await Achievement.find({ userId })
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      achievements
    });

  } catch (error) {
    console.error("Error fetching user achievements:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your achievements",
      error: error.message
    });
  }
};

// Get achievements by user ID
const getAchievementsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify the user exists and is alumni
    const user = await User.findById(userId);
    if (!user || user.role !== 'alumni') {
      return res.status(404).json({
        success: false,
        message: "Alumni not found"
      });
    }

    const achievements = await Achievement.find({ 
      userId, 
      isVisible: true 
    })
    .populate('userId', 'full_name email')
    .sort({ date: -1, createdAt: -1 });

    // Get alumni profile
    const alumniProfile = await AlumniProfile.findOne({ user_id: userId });

    res.status(200).json({
      success: true,
      achievements,
      alumniProfile,
      alumniInfo: {
        name: user.full_name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error fetching user achievements:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch achievements",
      error: error.message
    });
  }
};

// Update achievement (Owner only)
const updateAchievement = async (req, res) => {
  try {
    const { achievementId } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found"
      });
    }

    // Check if user owns this achievement
    if (achievement.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own achievements"
      });
    }

    // Update achievement
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined && key !== 'userId') {
        if (key === 'date' && updates[key]) {
          achievement[key] = new Date(updates[key]);
        } else {
          achievement[key] = updates[key];
        }
      }
    });

    await achievement.save();
    await achievement.populate('userId', 'full_name email');

    res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      achievement
    });

  } catch (error) {
    console.error("Error updating achievement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update achievement",
      error: error.message
    });
  }
};

// Delete achievement (Owner only)
const deleteAchievement = async (req, res) => {
  try {
    const { achievementId } = req.params;
    const userId = req.user._id;

    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found"
      });
    }

    // Check if user owns this achievement
    if (achievement.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own achievements"
      });
    }

    await Achievement.findByIdAndDelete(achievementId);

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting achievement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete achievement",
      error: error.message
    });
  }
};

// Toggle achievement visibility (Owner only)
const toggleAchievementVisibility = async (req, res) => {
  try {
    const { achievementId } = req.params;
    const userId = req.user._id;

    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found"
      });
    }

    // Check if user owns this achievement
    if (achievement.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only modify your own achievements"
      });
    }

    achievement.isVisible = !achievement.isVisible;
    await achievement.save();

    res.status(200).json({
      success: true,
      message: `Achievement ${achievement.isVisible ? 'made public' : 'made private'}`,
      achievement
    });

  } catch (error) {
    console.error("Error toggling achievement visibility:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update achievement visibility",
      error: error.message
    });
  }
};

module.exports = {
  createAchievement,
  getAllAchievements,
  getMyAchievements,
  getAchievementsByUserId,
  updateAchievement,
  deleteAchievement,
  toggleAchievementVisibility
};
