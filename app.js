const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const MONGO_DB = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const method = require("method-override");
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(method("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "public")));

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

const validateReview =  (req,res,next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else {
    next();
  }
}

main()
  .then(() => console.log("connected to mangodb"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_DB);
}


// index route
app.get(
  "/listing",validateListing,
  wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
  })
);

// new route
app.get("/listing/new", (req, res, next) => {
  res.render("listing/new.ejs");
});

// create route
app.post(
  "/listing",
  wrapAsync(async (req, res, next) => {
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    // console.log(newlisting);
    res.redirect("/listing");
  })
);

// edit route
app.get(
  "/listing/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/edit.ejs", { listing });
  })
);

// show route
app.get(
  "/listing/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/show.ejs", { listing });
  })
);

//update Route
app.put(
  "/listing/:id",validateListing,
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "send valid data please");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listing/${id}`);
  })
);

//delete route
app.delete(
  "/listing/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    // console.log(deletedlisting);
    res.redirect("/listing");
  })
);

// Review post req to save 
app.post("/listing/:id/reviews",validateReview,wrapAsync(async (req,res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review (req.body.review);
  
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  console.log(" review saved ");
  res.redirect(`/listing/${listing.id}`)
}));

app.get("/", (req, res) => {
  res.send("root api working ");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!!"));
});

app.use((err, req, res, next) => {
  let { statuscode = 500, message = "internal server error" } = err;
  res.status(statuscode).render("listing/error.ejs", { message });
  next();
});


app.listen("8080", () => {
  console.log("app listening at port 8080");
});
