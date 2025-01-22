const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");


const validateListing = (req,res,next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  
  //   let result = listingSchema.validate(req.body);
  //   if (result.error) {
  //     throw new ExpressError(400 , result.error);
  //   }
  
  }

// index route
router.get(
    "/",
    wrapAsync(async (req, res) => {
      const allListing = await Listing.find({});
      res.render("listing/index.ejs", { allListing });
    })
  );
  
  // new route
  router.get("/new",isLoggedIn, (req, res) => {
    res.render("listing/new.ejs");
  });
  
  // create route
  router.post(
    "/",isLoggedIn,
    wrapAsync(async (req, res, next) => {
      const newlisting = new Listing(req.body.listing);
      await newlisting.save();
      req.flash("success","Wow your Home is now Airbnb 🎉")
      // console.log(newlisting);
      res.redirect("/listing");
    })
  );
  
  // edit route
  router.get(
    "/:id/edit",isLoggedIn, 
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let listing = await Listing.findById(id);
      if (!listing) {
        req.flash("error","The Airbnb you requested does not exist 🙃");
        res.redirect("/listing");
      }
      res.render("listing/edit.ejs", { listing });
    })
  );
  
  // show route
  router.get(
    "/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id).populate("reviews");
      if (!listing) {
        req.flash("error","The Airbnb you requested does not exist 🥲");
        res.redirect("/listing");
      }
      res.render("listing/show.ejs", { listing });
    })
  );
  
  //update Route
  router.put(
    "/:id",isLoggedIn,validateListing,
    wrapAsync(async (req, res) => {
      if (!req.body.listing) {
        throw new ExpressError(400, "send valid data please");
      }
      let { id } = req.params;
      await Listing.findByIdAndUpdate(id, { ...req.body.listing });
      req.flash("update","Wow your Airbnb is Updated 🪅");
      res.redirect(`/listing/${id}`);
    })
  );
  
  //delete route
  router.delete(
    "/:id",isLoggedIn,
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let deletedlisting = await Listing.findByIdAndDelete(id);
      console.log(deletedlisting);
      req.flash("fail","oops your Home is no more Airbnb 🪅");
      res.redirect("/listing");
    })
  );


  module.exports = router;






