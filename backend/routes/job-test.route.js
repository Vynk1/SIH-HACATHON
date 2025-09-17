const express = require("express");
const router = express.Router();

// Simple test route that doesn't require database or authentication
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Job routes are working!",
    jobs: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalJobs: 0
    }
  });
});

// Test route for job posting
router.post("/", (req, res) => {
  res.json({
    success: true,
    message: "Job posting endpoint is working!",
    job: {
      _id: "test123",
      title: req.body.title || "Test Job",
      company: req.body.company || "Test Company",
      location: req.body.location || "Test Location",
      applyLink: req.body.applyLink || "https://example.com",
      createdAt: new Date().toISOString()
    }
  });
});

// Test route for my jobs
router.get("/my/jobs", (req, res) => {
  res.json({
    success: true,
    message: "My jobs endpoint is working!",
    jobs: []
  });
});

module.exports = router;
