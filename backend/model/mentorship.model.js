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
  request_date: { type: Date, default: Date.now },
  notes: { type: String },
});

module.exports = mongoose.model("Mentorship", mentorshipSchema);
