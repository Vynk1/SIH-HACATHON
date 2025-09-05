// routes/admin.routes.js
const express = require("express");

const adminController = require("../controller/admin.controller")
const auth = require("../middleware/auth");

const adminRouter = express.Router();

//  * GET /admin/me
//  * Get my admin profile
adminRouter.get("/me", auth(["admin"]), adminController.getAdminProfile);


//  * POST /admin/me
//  * Create or update admin profile
adminRouter.post("/me", auth(["admin"]), adminController.postAdminProfile);

module.exports = adminRouter;
