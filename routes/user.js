const express = require("express");
const router = express.Router();
exports.router = router;
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { createUser, renderSignupForm, renderLoginForm, loginUser, logoutUser, signupUser } = require("../controllers/user.js");


router.route("/signup")
.get( renderSignupForm)             //signup form route 
.post(wrapAsync(signupUser));       //signup post req route 

router.route("/login") 
.get(renderLoginForm)               // login form route 
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect: "/login", failureFlash: true, })
, loginUser);                       // // login post req route 

// logout route 
router.get("/logout" , logoutUser)

module.exports = router; 