const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
  }

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
  }

module.exports.createListing = async (req, res) => {

  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send();

  let url = req.file.path;
  let filename = req.file.filename
  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = {url,filename }
  newlisting.geometry = response.body.features[0].geometry;
  console.log(newlisting);
  await newlisting.save();
  req.flash("success","Wow your Home is now Airbnb 🎉")
  // console.log(newlisting);
  res.redirect("/listing");
    }

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error","The Airbnb you requested does not exist 🙃");
        res.redirect("/listing");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_220/")
    res.render("listing/edit.ejs", { listing , originalImageUrl });
}


module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  console.log(req.body.listing)
  console.log(typeof req.file);
  console.log(req.file);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename ;
    listing.image = { url , filename};
    await listing.save();
  }
  console.log(listing);
  req.flash("update","Wow your Airbnb is Updated 🪅");
  res.redirect(`/listing/${id}`);
}


module.exports.showListing = async (req, res) => {
let { id } = req.params;
const listing = await Listing.findById(id)
    .populate({
      path : "reviews" , 
      populate : {
        path : "author" 
     }})
    .populate("owner");
if (!listing) {
    req.flash("error","The Airbnb you requested does not exist 🥲");
    res.redirect("/listing");
}
res.render("listing/show.ejs", { listing } );
  }

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("fail","oops your Home is no more Airbnb 🪅");
    res.redirect("/listing");
}