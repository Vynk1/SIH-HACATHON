const express = require("express");

const donationController = require("../controller/donation.controller");
const auth = require("../middleware/auth");

const donationRouter = express.Router();

//  * POST /donations/donate
//  * Alumni donate
donationRouter.post("/donate", auth(["alumni"]), donationController.postDonation);

//  * GET /donations/my
//  * Alumni see their donations
donationRouter.get(
  "/my",
  auth(["alumni"]),
  donationController.getDonationDetails
);

//  * GET /donations/show-donations
//  * Admin view donations summary
donationRouter.get(
  "/show-donations",
  auth(["admin"]),
  donationController.getAllAlumniDonation
);

module.exports = donationRouter;
