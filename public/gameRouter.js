const express = require("express");
const router = express.Router();


router.use(express.static('public'));

router.get("/game/:url", function(req,res,next) {
    
    urldb = req.params.url
    console.log(urldb);
    
    res.sendFile(__dirname + "/game.html");


});


module.exports = router; 