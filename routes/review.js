const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewOwner } = require("../middleware.js");
const { destroyReview, createReview } = require("../controllers/review.js");


  // Review post req to save 
router.post("/",
  isLoggedIn,
  validateReview,
  wrapAsync(createReview));
  
  // Review for deleting the reviews 
  router.delete("/:reviewId",
    isLoggedIn,
    isReviewOwner,
     wrapAsync(destroyReview));

  module.exports = router; 