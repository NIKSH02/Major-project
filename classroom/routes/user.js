const express = require("express");
const router = express.Router();

//index 

router.get("/" , (req,res) => {
    res.send("user get method ");
})

//show route
router.get("/:id" ,(req,res) => {
    res.send("user show get method ");
})

//post 
router.post("/" , (req,res) => {
    res.send("user post route")
})

router.delete("/:id/delete"  , (req,res) => {
    res.send("delete for user")
})

module.exports = router;