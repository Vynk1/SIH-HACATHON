const express = require("express");

const mentorController = require("../controller/mentorship.controller");
const auth = require("../middleware/auth.middleware");
const mentorRouter = express.Router();

//  * POST /mentorships/request
//  * Students request mentorship
mentorRouter.post(
  "/request",
  auth(["student"]),
  mentorController.postMentoring
);

//  * GET /mentorships/as-mentor
//  * Alumni see mentorship requests assigned to them
mentorRouter.get(
  "/as-mentor",
  auth(["alumni"]),
  mentorController.getDetOfMentee
);

//  * PATCH /mentorships/:id/status
//  * Alumni update request status
mentorRouter.patch(
  "/:id/status",
  auth(["alumni"]),
  mentorController.patchRequest
);

//  * GET /mentorships/my-requests
//  * Students see their own mentorship requests
mentorRouter.get(
  "/my-requests",
  auth(["student"]),
  mentorController.getMyMentorshipRequests
);

//  * GET /mentorships/available-mentors
//  * Students see available mentors
mentorRouter.get(
  "/available-mentors",
  auth(["student"]),
  mentorController.getAvailableMentors
);

//  * GET /mentorships/all
//  * Admin see all mentorship requests
mentorRouter.get(
  "/all",
  auth(["admin"]),
  mentorController.getAllMentorshipRequests
);

module.exports = mentorRouter;
