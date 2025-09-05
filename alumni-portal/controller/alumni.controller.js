const AlumniProfile = require("../model/alumniProfile.model");

exports.getAlumniProfile = async (req, res) => {
  try {
    const profile = await AlumniProfile.findOne({
      user_id: req.user._id,
    }).lean(); // .lean() => use to only read data like foreign apis
    res.json(profile || null);
  } catch (e) {
    console.error("ALUMNI_ME_GET", e);
    res.status(500).json({ message: "Server error" });
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

    res.json(profile);
  } catch (e) {
    console.error("ALUMNI_ME_POST", e);
    res.status(500).json({ message: "Server error" });
  }
};
