const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/signup" , (req,res) => {
    res.render("users/signup.ejs")
})

router.post("/signup", wrapAsync(async(req,res) => {
    try {
    let { username, email, password } = req.body;
    console.log(req.body);
    const newUser = new User({username,email});
    let reguser = await User.register(newUser,password);
    console.log(reguser);
    req.flash("success","Hurray you are on Air Now!!");
    res.redirect("/listing")
    } catch(e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}));

router.get("/login",(req,res) => {
    res.render("users/login.ejs")
})

module.exports = router; 