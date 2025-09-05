const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true, //ensuring the uniquness
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["alumni, admin, student"],
    required: true,
  },
  phone_number: {
    type: String,
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
