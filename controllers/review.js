const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview = async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review (req.body.review);
    newReview.author = req.user._id;
    console.log("review sid e",req.user._id);
    console.log(newReview);
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
    // console.log(" review saved "); 
    req.flash("success","Thankyou for your Review")
    res.redirect(`/listing/${listing.id}`)
  }

  module.exports.destroyReview = async(req,res) => {
    let {id , reviewId} = req.params;
    console.log(id,reviewId);
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id , {$pull : {reviews:reviewId}});
    req.flash("update","opps your review is now deleted 😔")
    res.redirect(`/listing/${id}`);
  
  }