//external module
const express = require("express");
const authRouter = express.Router();

//internal module
const authController = require("../controller/auth.controller");
const auth = require("../middleware/auth.middleware");

//  * POST /auth/register
//  * body: { full_name, email, password, role, phone_number? }
//  * first validate the inputs than allow to store in db
authRouter.post("/register", authController.postRegister);

//  * POST /auth/login
//  * body: { email, password }
authRouter.post("/login", authController.postLogin);

//  * GET /auth/me => specially for students userType
//  * check first authenticated user than give profile details of user
authRouter.get("/me", auth(), authController.getUserProfile);

// * post /auth/logout => for logout to be done on frontend.
authRouter.post("/logout", authController.postLogout);


module.exports = authRouter;
