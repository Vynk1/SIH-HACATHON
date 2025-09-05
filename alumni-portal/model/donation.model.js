const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  alumni_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  purpose: { type: String },
  payment_status: { 
    type: String, 
    enum: ["success", "failed", "pending"], 
    default: "pending" 
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);
