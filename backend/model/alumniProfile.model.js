const mongoose = require("mongoose");

const alumniProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  batch_year: { type: Number, required: true },
  degree: { type: String, required: true },
  department: { type: String },
  current_position: { type: String },
  company: { type: String },
  linkedin_url: { type: String },
  location: { type: String },
  skills: [{ type: String }],
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AlumniProfile", alumniProfileSchema);
