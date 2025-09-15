const StudentProfile = require("../model/studentProfile.model");
const User = require("../model/user.model");

// GET /student/me - Get current student's profile
exports.getStudentProfile = async (req, res) => {
  try {
    let profile = await StudentProfile.findOne({ user_id: req.user._id }).populate('user_id', 'full_name email');
    
    if (!profile) {
      // Create empty profile if doesn't exist
      profile = await StudentProfile.create({
        user_id: req.user._id
      });
      await profile.populate('user_id', 'full_name email');
    }
    
    res.json({ 
      success: true, 
      profile: {
        ...profile.toObject(),
        full_name: profile.user_id.full_name,
        email: profile.user_id.email
      }
    });
  } catch (err) {
    console.error('Error fetching student profile:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching profile" 
    });
  }
};

// POST /student/me - Update current student's profile
exports.updateStudentProfile = async (req, res) => {
  try {
    const {
      batch_year,
      degree,
      department,
      current_semester,
      interests,
      career_goals,
      gpa,
      skills
    } = req.body;

    let profile = await StudentProfile.findOne({ user_id: req.user._id });
    
    if (!profile) {
      // Create new profile
      profile = await StudentProfile.create({
        user_id: req.user._id,
        batch_year,
        degree,
        department,
        current_semester,
        interests,
        career_goals,
        gpa,
        skills: Array.isArray(skills) ? skills : []
      });
    } else {
      // Update existing profile
      profile.batch_year = batch_year || profile.batch_year;
      profile.degree = degree || profile.degree;
      profile.department = department || profile.department;
      profile.current_semester = current_semester || profile.current_semester;
      profile.interests = interests || profile.interests;
      profile.career_goals = career_goals || profile.career_goals;
      profile.gpa = gpa || profile.gpa;
      profile.skills = Array.isArray(skills) ? skills : profile.skills;
      profile.updated_at = Date.now();
      
      await profile.save();
    }

    await profile.populate('user_id', 'full_name email');

    res.json({ 
      success: true, 
      message: "Profile updated successfully",
      profile: {
        ...profile.toObject(),
        full_name: profile.user_id.full_name,
        email: profile.user_id.email
      }
    });
  } catch (err) {
    console.error('Error updating student profile:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while updating profile" 
    });
  }
};

// GET /students/all - Get all students (for admin)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('full_name email created_at')
      .lean();

    // Get student profiles
    const studentProfiles = await StudentProfile.find()
      .populate('user_id', 'full_name email')
      .lean();

    // Merge user data with profile data
    const studentsWithProfiles = students.map(student => {
      const profile = studentProfiles.find(p => p.user_id._id.toString() === student._id.toString());
      return {
        ...student,
        department: profile?.department,
        degree: profile?.degree,
        batch_year: profile?.batch_year,
        current_semester: profile?.current_semester
      };
    });

    res.json({ 
      success: true, 
      students: studentsWithProfiles 
    });
  } catch (err) {
    console.error('Error fetching all students:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching students" 
    });
  }
};
