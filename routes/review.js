const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const { validateReview } = require("../middleware.js");


  // Review post req to save 
router.post("/",validateReview,wrapAsync(async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review (req.body.review);
    
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
    // console.log(" review saved "); 
    req.flash("success","Thankyou for your Review")
    res.redirect(`/listing/${listing.id}`)
  }));
  
  // Review for deleting the reviews 
  router.delete("/:reviewId", wrapAsync(async(req,res) => {
  
    let {id , reviewId} = req.params;
    console.log(id,reviewId);
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id , {$pull : {reviews:reviewId}});
    req.flash("update","opps your review is now deleted 😔")
    res.redirect(`/listing/${id}`);
  
  }));

  module.exports = router; 