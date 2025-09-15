const Mentorship = require("../model/mentorship.model");
const User = require("../model/user.model");
const AlumniProfile = require("../model/alumniProfile.model");

//by student to alumni
exports.postMentoring = async (req, res) => {
  try {
    const { mentor_id, message, preferred_meeting_type, notes } = req.body;
    
    // Check if request already exists
    const existingRequest = await Mentorship.findOne({
      mentor_id,
      mentee_id: req.user._id
    });
    
    if (existingRequest) {
      return res.status(400).json({ 
        success: false, 
        message: "You already have a request with this mentor" 
      });
    }
    
    const mentorship = await Mentorship.create({
      mentor_id,
      mentee_id: req.user._id,
      message,
      preferred_meeting_type: preferred_meeting_type || 'virtual',
      notes,
    });
    
    await mentorship.populate('mentor_id', 'full_name email');
    
    res.status(201).json({
      success: true,
      message: "Mentorship request sent successfully",
      request: mentorship
    });
  } catch (err) {
    console.error('Error creating mentorship request:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while creating request" 
    });
  }
};

// the no. of request assign to a alumni can only be access by alumni
exports.getDetOfMentee = async (req, res) => {
  try {
    const items = await Mentorship.find({ mentor_id: req.user._id })
      .populate("mentee_id", "full_name email")
      .sort({ created_at: -1 })
      .lean();
    res.json({ 
      success: true, 
      requests: items 
    });
  } catch (err) {
    console.error('Error fetching mentorship requests:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching requests" 
    });
  }
};

//request updating by the alumni sent by students
exports.patchRequest = async (req, res) => {
  try {
    const { status, mentor_response } = req.body;
    const mentorship = await Mentorship.findOneAndUpdate(
      { _id: req.params.id, mentor_id: req.user._id },
      { 
        status,
        mentor_response: mentor_response || null,
        updated_at: Date.now()
      },
      { new: true }
    );
    
    if (!mentorship) {
      return res.status(404).json({ 
        success: false, 
        message: "Mentorship request not found" 
      });
    }
    
    await mentorship.populate('mentee_id', 'full_name email');
    
    res.json({
      success: true,
      message: "Request status updated successfully",
      request: mentorship
    });
  } catch (err) {
    console.error('Error updating mentorship request:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while updating request" 
    });
  }
};

// GET /mentorships/my-requests - Get current student's mentorship requests
exports.getMyMentorshipRequests = async (req, res) => {
  try {
    const requests = await Mentorship.find({ mentee_id: req.user._id })
      .populate('mentor_id', 'full_name email')
      .sort({ created_at: -1 })
      .lean();
    
    res.json({ 
      success: true, 
      requests: requests.map(req => ({
        ...req,
        mentor: req.mentor_id
      }))
    });
  } catch (err) {
    console.error('Error fetching student mentorship requests:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching requests" 
    });
  }
};

// GET /mentorships/available-mentors - Get available alumni mentors
exports.getAvailableMentors = async (req, res) => {
  try {
    // Get all alumni users
    const alumni = await User.find({ role: 'alumni' })
      .select('full_name email')
      .lean();
    
    // Get alumni profiles
    const alumniProfiles = await AlumniProfile.find()
      .populate('user_id', 'full_name email')
      .lean();
    
    // Merge user data with profile data
    const availableMentors = alumni.map(alum => {
      const profile = alumniProfiles.find(p => p.user_id._id.toString() === alum._id.toString());
      return {
        _id: alum._id,
        full_name: alum.full_name,
        email: alum.email,
        current_position: profile?.current_position,
        company: profile?.company,
        location: profile?.location,
        department: profile?.department,
        skills: profile?.skills,
        linkedin_url: profile?.linkedin_url,
        batch_year: profile?.batch_year
      };
    });
    
    res.json({ 
      success: true, 
      mentors: availableMentors 
    });
  } catch (err) {
    console.error('Error fetching available mentors:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching mentors" 
    });
  }
};

// GET /mentorships/all - Get all mentorship requests (for admin)
exports.getAllMentorshipRequests = async (req, res) => {
  try {
    const requests = await Mentorship.find()
      .populate('mentor_id', 'full_name email')
      .populate('mentee_id', 'full_name email')
      .sort({ created_at: -1 })
      .lean();
    
    res.json({ 
      success: true, 
      requests 
    });
  } catch (err) {
    console.error('Error fetching all mentorship requests:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching requests" 
    });
  }
};
