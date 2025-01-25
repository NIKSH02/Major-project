const mongoose = require("mongoose") ;
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_DB = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => console.log( "connected to mangodb"))
      .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(MONGO_DB);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:'67912b686eea0e47285016ad'}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();