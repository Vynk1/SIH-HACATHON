const Mentorship = require("../model/mentorship.model");

//by student to alumni
exports.postMentoring = async (req, res) => {
  try {
    const { mentor_id, notes } = req.body;
    const mentorship = await Mentorship.create({
      mentor_id,
      mentee_id: req.user._id,
      notes,
    });
    res.status(201).json(mentorship);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// the no. of request assign to a alumni can only be access by almuni
exports.getDetOfMentee = async (req, res) => {
  try {
    const items = await Mentorship.find({ mentor_id: req.user._id })
      .populate("mentee_id", "full_name email")
      .lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//requenst updating by the alumni send by students
exports.patchRequest = async (req, res) => {
  try {
    const { status } = req.body;
    const mentorship = await Mentorship.findOneAndUpdate(
      { _id: req.params.id, mentor_id: req.user._id },
      { status },
      { new: true }
    );
    if (!mentorship) return res.status(404).json({ message: "Not found" });
    res.json(mentorship);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
