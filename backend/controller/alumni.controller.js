const AlumniProfile = require("../model/alumniProfile.model");
const User = require("../model/user.model");

exports.getAlumniProfile = async (req, res) => {
  try {
    const profile = await AlumniProfile.findOne({
      user_id: req.user._id,
    }).lean(); // .lean() => use to only read data like foreign apis
    res.json({ 
      success: true, 
      profile: profile || null 
    });
  } catch (e) {
    console.error("ALUMNI_ME_GET", e);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

exports.postAlumniProfile = async (req, res) => {
  try {
    const {
      batch_year,
      degree,
      department,
      current_position,
      company,
      linkedin_url,
      location,
      skills,
    } = req.body;

    if (!batch_year || !degree) {
      return res
        .status(400)
        .json({ message: "batch_year and degree are required" });
    }

    const update = {
      batch_year,
      degree,
      department,
      current_position,
      company,
      linkedin_url,
      location,
      skills,
      updated_at: new Date(),
    };

    const profile = await AlumniProfile.findOneAndUpdate(
      { user_id: req.user._id },
      { $set: { user_id: req.user._id, ...update } },  //$set => set in db
      { new: true, upsert: true }    // "Update + Insert" = upsert.
    ).lean();

    res.json({ 
      success: true, 
      message: "Profile updated successfully",
      profile 
    });
  } catch (e) {
    console.error("ALUMNI_ME_POST", e);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// GET /alumni/all - Get all alumni (for admin)
exports.getAllAlumni = async (req, res) => {
  try {
    const alumni = await User.find({ role: 'alumni' })
      .select('full_name email created_at')
      .lean();

    // Get alumni profiles
    const alumniProfiles = await AlumniProfile.find()
      .populate('user_id', 'full_name email')
      .lean();

    // Merge user data with profile data
    const alumniWithProfiles = alumni.map(alum => {
      const profile = alumniProfiles.find(p => p.user_id._id.toString() === alum._id.toString());
      return {
        ...alum,
        department: profile?.department,
        current_position: profile?.current_position,
        company: profile?.company,
        batch_year: profile?.batch_year
      };
    });

    res.json({ 
      success: true, 
      alumni: alumniWithProfiles 
    });
  } catch (err) {
    console.error('Error fetching all alumni:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching alumni" 
    });
  }
};
