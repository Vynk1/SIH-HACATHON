const express = require("express");

const eventController = require("../controller/event.controller");
const auth = require("../middleware/auth.middleware");

const eventRouter = express.Router();

//  * POST /events/create-event
//  * Admins create event
eventRouter.post("/create-event", auth(["admin"]), eventController.postEvent);

//  * GET /events/show-events => showing events
//  * All users list events
eventRouter.get("/show-events", auth(), eventController.getEvent);

//  * POST /events/:id/register  => registering for events
//  * Alumni/Students register for event
eventRouter.post(
  "/:id/register",
  auth(["alumni", "student"]),
  eventController.postEventPart
);

module.exports = eventRouter;
