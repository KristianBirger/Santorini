const express = require("express");
const router = express.Router();
const db = require("../modules/db");

router.post("/games/createNewGame", async function(req, res, next){
    
    let input = req.body;

    try {
        
        let response = await db.createGameDB(input.gameName, input.player1id, input.player2id);

        if (response.rowCount > 0){
            res.status(200).json({msg: "The game was successfully created!"}).end();
        }
        else{
            throw "Something went wrong!"
        }

    } catch (error) {
        res.status(401).json({error: error});
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

module.exports = router; 