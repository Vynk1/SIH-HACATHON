const mongoose = require("mongoose");

const mentorshipSchema = new mongoose.Schema({
  mentor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mentee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
  message: {
    type: String,
    required: true,
  },
  preferred_meeting_type: {
    type: String,
    enum: ["virtual", "in-person", "phone", "flexible"],
    default: "virtual",
  },
  mentor_response: {
    type: String,
  },
  request_date: { type: Date, default: Date.now },
  notes: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mentorship", mentorshipSchema);
