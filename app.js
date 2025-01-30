if (process.env.NODE_ENV !="production") {
  require('dotenv').config()
  // console.log(process.env.CLOUD_API_KEY) 
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const method = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

const reviewRouter = require("./routes/review.js");
const listingRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(method("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "public")));

const dburl = process.env.ATLASDB_URL;

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter:24,
})

store.on("error",()=> {
  console.log("ERROR IN MONGO SESSION STORE",err)
})

const sessionOptions = {
  store, //for mongostore 
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now()+7*24*60*60*1000,
    maxAge : 7*24*60*60*1000,
    httpOnly : true,
  }
}

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// const MONGO_DB = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(dburl);
}

main()
  .then(() => console.log("connected to mangodb"))
  .catch((err) => console.log(err));

app.use((req,res,next)=> {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.fail = req.flash("fail");
  res.locals.update = req.flash("update");
  res.locals.currUser = req.user;
  next()
}) 

//All Routes 
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews",reviewRouter);
app.use("/",userRouter);

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
