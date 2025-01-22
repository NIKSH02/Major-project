module.exports.isLoggedIn = (req,res, next) => {
    if (!req.isAuthenticated()) {
      // console.log(req.originalUrl)          for my understanding actually for debugging
      req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must Login first");
        return res.redirect("/login");
      }
      next();
}

module.exports.saveRedirectUrl = (req,res,next) => {
  if (req.session.redirectUrl ) {
    // console.log(req.session.redirectUrl)     for my understanding actually for debugging
    // console.log(req.originalUrl)             for my understanding actually for debugging
    res.locals.redirectUrl = req.session.redirectUrl;
    // console.log(res.locals.redirectUrl)      for my understanding actually for debugging
  }
  next();
}
