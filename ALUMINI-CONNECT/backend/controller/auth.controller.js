//external modules
const bcrypt = require("bcrypt");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");

//internal modules
const User = require("../model/user.model");

exports.postRegister = [
  check("full_name")
    .isLength({ min: 3 })
    .withMessage("USER-NAME should be at least 3 characters long"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  async (req, res) => {
    try {
      const { full_name, email, password, role, phone_number } = req.body;
      // normalize role to lowercase to match schema enum
      const normalizedRole = role && typeof role === 'string' ? role.toLowerCase() : null;
      const allowedRoles = ['alumni','admin','student'];
      if (!normalizedRole || !allowedRoles.includes(normalizedRole)) {
        return res.status(400).json({ message: 'Invalid or missing role. Allowed: alumni, admin, student' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const exists = await User.findOne({ email });
      if (exists)
        return res.status(409).json({ message: "Email already registered" });

      const hash = await bcrypt.hash(password, 12);
      const user = await User.create({
        full_name,
        email,
        password: hash,
        role: normalizedRole,
        phone_number,
      });

      if (user) {
        res.status(201).json({
          msg: "user Registered successfully",
        });
      }
    } catch (err) {
      console.error("REGISTER_ERROR", err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { _id: user._id.toString(), role: user.role, full_name: user.full_name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          console.error("Error signing JWT:", err);
          return res.status(500).json({
            message: "Internal server error",
            error: err.message,
          });
        }
        res.cookie("token", token, { httpOnly: true });
        res.json({
          user: {
            _id: user._id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
          },
        });
      }
    );
  } catch (err) {
    console.error("LOGIN_ERROR", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const me = await User.findById(req.user._id).select(
      "_id full_name email role phone_number created_at"
    );
    res.json(me);
  } catch (err) {
    console.error("ME_ERROR", err);
    res.status(500).json({ message: "Server error" });
  }
};

// for the timing we will handle logout part from frontend -> not forcefull logout...
exports.postLogout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
