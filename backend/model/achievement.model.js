const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ["award", "publication", "startup", "recognition", "certification", "other"],
    default: "other"
  },
  organization: {
    type: String,
    trim: true
  },
  date: {
    type: Date
  },
  link: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
achievementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient querying by user
achievementSchema.index({ userId: 1 });
achievementSchema.index({ category: 1 });
achievementSchema.index({ date: -1 });

module.exports = mongoose.model("Achievement", achievementSchema);
