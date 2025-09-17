const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createJob,
  getAllJobs,
  getMyJobs,
  applyForJob,
  getJobById,
  updateJob,
  deleteJob
} = require("../controller/job.controller");

// Public routes
router.get("/", getAllJobs); // GET /jobs - Get all active jobs
router.get("/:jobId", getJobById); // GET /jobs/:jobId - Get specific job details

// Alumni only routes
router.post("/", auth(["alumni"]), createJob); // POST /jobs - Create new job posting (Alumni only)
router.get("/my/jobs", auth(["alumni"]), getMyJobs); // GET /jobs/my/jobs - Get jobs posted by current user (Alumni only)
router.put("/:jobId", auth(["alumni"]), updateJob); // PUT /jobs/:jobId - Update job posting (Owner only)
router.delete("/:jobId", auth(["alumni"]), deleteJob); // DELETE /jobs/:jobId - Delete/deactivate job posting (Owner only)

// Apply for job (Students and Alumni)
router.post("/:jobId/apply", auth(["student", "alumni"]), applyForJob); // POST /jobs/:jobId/apply - Apply for a specific job

module.exports = router;
