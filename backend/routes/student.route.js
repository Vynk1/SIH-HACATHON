const express = require("express");
const studentController = require("../controller/student.controller");
const auth = require("../middleware/auth.middleware");

const studentRouter = express.Router();

// GET /student/me - Get current student's profile
studentRouter.get(
  "/me",
  auth(["student"]),
  studentController.getStudentProfile
);

// POST /student/me - Update current student's profile
studentRouter.post(
  "/me",
  auth(["student"]),
  studentController.updateStudentProfile
);

module.exports = studentRouter;
