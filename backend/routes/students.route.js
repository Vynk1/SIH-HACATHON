const express = require("express");
const studentController = require("../controller/student.controller");
const auth = require("../middleware/auth.middleware");

const studentsRouter = express.Router();

// GET /students/all - Get all students (for admin)
studentsRouter.get(
  "/all",
  auth(["admin"]),
  studentController.getAllStudents
);

module.exports = studentsRouter;
