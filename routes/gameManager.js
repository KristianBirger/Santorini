const express = require("express");
const router = express.Router();
const db = require("../modules/db");

router.post("/games/createNewGame", async function(req, res, next){
    
    let input = req.body;

    let gameUrl = createGameUrl();

    try {
        
        let response = await db.createGameDB(input.gameName, input.player1id, input.player2id, gameUrl);

        if (response.rowCount > 0){
            res.status(200).json({msg: "The game was successfully created!"}).end();
        }
        else{
            throw "Something went wrong!"
        }

        

    } catch (error) {
        console.log(error);
        res.status(401).json({error: error}).end();
    }


});

router.get("/games/showGames", async function(req, res, next) {

    try {
        
        let data = await db.getGamesDB();

        res.status(200).send(data.rows).end();

    } catch (error) {
        next(error)
    }

});

router.get("/games/:url", async function(req,res,next) {
    
    

});

router.get("/test/:jimmy", (req,res,next) =>{
   test = req.params.jimmy;
    console.log(test);
    


});

function createGameUrl(){

    gameId = Math.floor(Math.random() * 1000);

    url = `/games/${gameId}`;

    console.log(url);

    return url;
}

module.exports = router; 