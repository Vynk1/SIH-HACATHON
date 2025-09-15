const express = require("express");

const alumniController = require("../controller/alumni.controller")
const auth = require("../middleware/auth.middleware");

const alumniRouter = express.Router();


//  * GET /alumni/me  => to show on frontend part
//  * Get my alumni profile (requires role alumni)
alumniRouter.get("/me", auth(["alumni"]), alumniController.getAlumniProfile);


//  * POST /alumni/me => from updation the saved data in db
//  * Create or update my alumni profile (upsert)
//  * body: { batch_year, degree, department?, current_position?, company?, linkedin_url?, location?, skills? }
alumniRouter.post("/me", auth(["alumni"]), alumniController.postAlumniProfile);

//  * GET /alumni/all
//  * Get all alumni (for admin)
alumniRouter.get("/all", auth(["admin"]), alumniController.getAllAlumni);

module.exports = alumniRouter;
