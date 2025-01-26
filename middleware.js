const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");

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

module.exports.isowner = async (req,res,next) => {
  let { id } = req.params ;
  let listing = await Listing.findById(id);
  console.log(listing.owner._id,res.locals.currUser._id);
  if (!res.locals.currUser._id.equals(listing.owner._id)) { 
    req.flash("error","you are not the owner/Authorized to edit ");
    return res.redirect(`/listing/${id}`);
  }
  next();
}

module.exports.validateListing = (req,res,next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

module.exports.validateReview =  (req,res,next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else {
    next();
  }
}