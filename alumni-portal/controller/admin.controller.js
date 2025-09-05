const AdminProfile = require("../model/adminProfile.model");

exports.getAdminProfile = async (req, res) => {
  try {
    const profile = await AdminProfile.findOne({
      user_id: req.user._id,
    }).lean();
    res.json(profile || null);
  } catch (e) {
    console.error("ADMIN_ME_GET", e);
    res.status(500).json({ message: "Server error" });
  }
};

exports.postAdminProfile = async (req, res) => {
  try {
    const { position, department, responsibilities, permissions } = req.body;

    if (!position) {
      return res.status(400).json({ message: "position is required" });
    }

    const update = {
      position,
      department,
      responsibilities,
      permissions,
      updated_at: new Date(),
    };

    const profile = await AdminProfile.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { user_id: req.user._id, ...update } }, //update and if not present than create a new one document in db
      { new: true, upsert: true }
    ).lean();

    res.json(profile);
  } catch (e) {
    console.error("ADMIN_ME_POST", e);
    res.status(500).json({ message: "Server error" });
  }
};
