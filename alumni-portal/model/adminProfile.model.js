const mongoose = require("mongoose");

const adminProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  position: { type: String, required: true }, 

  department: { type: String }, 
  responsibilities: { type: String }, // free text
  permissions: [{ type: String }], // e.g., ["manage_events", "approve_donations"]
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminProfile", adminProfileSchema);
