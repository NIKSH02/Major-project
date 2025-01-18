const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_DB = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const method = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const review = require("./routes/review.js");
const listing = require("./routes/listing.js")
const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(method("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized : true,
}

app.use(session(sessionOptions));

main()
  .then(() => console.log("connected to mangodb"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_DB);
}

//All Routes 
app.use("/listing", listing);
app.use("/listing/:id/reviews",review)


// FALTU KA ROOT API
app.get("/", (req, res) => {
  res.send("root api working ");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!!"));
});

app.use((err, req, res, next) => {
  let { statuscode = 500, message = "internal server error" } = err;
  console.log(err);
  res.status(statuscode).render("listing/error.ejs", { message });
  next();
});


app.listen("8080", () => {
  console.log("app listening at port 8080");
});
