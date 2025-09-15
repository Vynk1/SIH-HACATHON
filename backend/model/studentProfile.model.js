const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  batch_year: {
    type: String,
  },
  degree: {
    type: String,
  },
  department: {
    type: String,
  },
  current_semester: {
    type: String,
  },
  interests: {
    type: String,
  },
  career_goals: {
    type: String,
  },
  gpa: {
    type: String,
  },
  skills: {
    type: [String],
    default: [],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Update the updated_at field before saving
studentProfileSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
