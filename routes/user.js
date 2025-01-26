const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

//signup form route 
router.get("/signup" , (req,res) => {
    res.render("users/signup.ejs")
})

//signup post req route 
router.post("/signup", wrapAsync(async(req,res) => {
    try {
    let { username, email, password } = req.body;
    const newUser = new User({username,email});
    let reguser = await User.register(newUser,password);
    console.log(reguser);
    req.login(reguser,(err) => {
        if(err) {
            return next(err);
        }
        req.flash("success","Hurray you are on Air Now!!");
        res.redirect("/listing")
    })
    } catch(e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}));

// login form route 
router.get("/login",(req,res) => {
    res.render("users/login.ejs")
});

// login post req route 
router.post("/login"
    ,saveRedirectUrl
    ,passport.authenticate("local",{failureRedirect: "/login", failureFlash: true, })
    ,async (req,res) =>{
        let { username } = req.body; 
        req.flash("success",`Welcome back ${username} 😄`)
        redirectUrl = res.locals.redirectUrl || "/listing";
        console.log("user",req.user._id);
        // console.log(redirectUrl,res.locals.redirectUrl)    for debugging and my better understanding 
        res.redirect(redirectUrl);
})

// logout route 
router.get("/logout" , (req,res,next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success","you are logged out now ✌🏻")
        res.redirect("/listing");
    })
})

module.exports = router; 