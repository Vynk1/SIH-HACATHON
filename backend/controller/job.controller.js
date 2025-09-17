const Job = require("../model/job.model");
const User = require("../model/user.model");

// Create a new job posting (Alumni only)
const createJob = async (req, res) => {
  try {
    const { title, company, location, applyLink, description, jobType, experience, salary } = req.body;
    const userId = req.user._id;

    // Verify user is alumni
    const user = await User.findById(userId);
    if (!user || user.role !== 'alumni') {
      return res.status(403).json({
        success: false,
        message: "Only alumni can post jobs"
      });
    }

    // Validate required fields
    if (!title || !company || !location || !applyLink) {
      return res.status(400).json({
        success: false,
        message: "Title, company, location, and apply link are required"
      });
    }

    // Create new job
    const newJob = new Job({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      applyLink: applyLink.trim(),
      description: description?.trim(),
      jobType: jobType || 'full-time',
      experience: experience?.trim(),
      salary: salary?.trim(),
      postedBy: userId
    });

    await newJob.save();

    // Populate the postedBy field for response
    await newJob.populate('postedBy', 'full_name email');

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: newJob
    });

  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create job posting",
      error: error.message
    });
  }
};

// Get all active job listings
const getAllJobs = async (req, res) => {
  try {
    const { jobType, location, company, search, page = 1, limit = 20 } = req.query;
    
    // Build filter object
    const filter = { isActive: true };
    
    if (jobType) {
      filter.jobType = jobType;
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (company) {
      filter.company = { $regex: company, $options: 'i' };
    }
    
    // Add search functionality - search across title, company, description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get jobs with pagination
    const jobs = await Job.find(filter)
      .populate('postedBy', 'full_name email')
      .populate('applications.applicant', 'full_name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalJobs = await Job.countDocuments(filter);
    const totalPages = Math.ceil(totalJobs / parseInt(limit));

    res.status(200).json({
      success: true,
      jobs,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalJobs,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: error.message
    });
  }
};

// Get jobs posted by current user (Alumni only)
const getMyJobs = async (req, res) => {
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

    const jobs = await Job.find({ postedBy: userId })
      .populate('applications.applicant', 'full_name email phone_number')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });

  } catch (error) {
    console.error("Error fetching user jobs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your jobs",
      error: error.message
    });
  }
};

// Apply for a job (Students and Alumni)
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (!job.isActive) {
      return res.status(400).json({
        success: false,
        message: "This job posting is no longer active"
      });
    }

    // Check if user already applied
    const existingApplication = job.applications.find(
      app => app.applicant.toString() === userId
    );

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job"
      });
    }

    // Add application
    job.applications.push({
      applicant: userId,
      appliedAt: new Date()
    });

    await job.save();

    // Return the apply link for external application
    res.status(200).json({
      success: true,
      message: "Application recorded successfully",
      applyLink: job.applyLink,
      jobTitle: job.title,
      company: job.company
    });

  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({
      success: false,
      message: "Failed to apply for job",
      error: error.message
    });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const job = await Job.findById(jobId)
      .populate('postedBy', 'full_name email')
      .populate('applications.applicant', 'full_name email');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      job
    });

  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job details",
      error: error.message
    });
  }
};

// Update job (Alumni who posted it)
const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Check if user is the one who posted the job
    if (job.postedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update jobs you posted"
      });
    }

    // Update job
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined && key !== 'postedBy' && key !== 'applications') {
        job[key] = updates[key];
      }
    });

    await job.save();
    await job.populate('postedBy', 'full_name email');

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job
    });

  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update job",
      error: error.message
    });
  }
};

// Delete/Deactivate job (Alumni who posted it)
const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Check if user is the one who posted the job
    if (job.postedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete jobs you posted"
      });
    }

    // Soft delete by setting isActive to false
    job.isActive = false;
    await job.save();

    res.status(200).json({
      success: true,
      message: "Job posting deactivated successfully"
    });

  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete job",
      error: error.message
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getMyJobs,
  applyForJob,
  getJobById,
  updateJob,
  deleteJob
};
