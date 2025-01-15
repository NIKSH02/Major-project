const express = require("express");
const app = express();
const post = require("./routes/post.js");
const user = require("./routes/user.js");

app.get("/" , (req,res) => {
    res.send("hii i am root ")
})
//users
app.use("/users",user)
//posts
app.use("/post" ,post);


app.listen(3000, (req,res) => {
    console.log("server is listening to port 3000 ");
})
