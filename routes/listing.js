const express = require("express");
const router = express.Router();
exports.router = router;
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn , isowner , validateListing  } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudconfig.js")
const upload = multer({ storage })


// new route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/")
.get(//index route 
  wrapAsync(listingController.index)
)
.post(  // create route
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
);



router.route ("/:id")
.get( //show route
  wrapAsync(listingController.showListing)
)
.put(// updatelisting route
  isLoggedIn,
  isowner,
  validateListing,
  wrapAsync(listingController.updateListing)
)  //delete route
.delete(
  isLoggedIn,
  isowner,
  wrapAsync(listingController.deleteListing)
);
  
  // renereditform route
  router.get(
    "/:id/edit",
    isLoggedIn, 
    isowner,
    wrapAsync(listingController.renderEditForm)
  );


  module.exports = router;






