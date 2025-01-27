const Listing = require("../models/listing");


module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
  }

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
  }

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename
  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = {url,filename }
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
    res.render("listing/edit.ejs", { listing });
}


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
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