const User = require("../models/user");

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs")
}

module.exports.signupUser = async(req,res) => {
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
}

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs")
}

module.exports.loginUser = async (req,res) =>{
        let { username } = req.body; 
        req.flash("success",`Welcome back ${username} 😄`)
        redirectUrl = res.locals.redirectUrl || "/listing";
        console.log("user",req.user._id);
        // console.log(redirectUrl,res.locals.redirectUrl)    for debugging and my better understanding 
        res.redirect(redirectUrl);
}

module.exports.logoutUser = (req,res,next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success","you are logged out now ✌🏻")
        res.redirect("/listing");
    })
}