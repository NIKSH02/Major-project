const express = require("express")
const router = express.Router();

//[post]

//index
router.get("/" , (req,res) => {
    res.send("get post")
})

//show
router.get("/:id" , (req,res) => {
    res.send("show posts")
})

//post
router.post("/" , (req,res) => {
    res.send("post post")
})

//delete
router.delete("/:id", (req,res) => [
    res.send("delete post man in the end")
])

module.exports = router;