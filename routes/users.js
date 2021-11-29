const express = require("express");

const db = require("../modules/db");
const authUtils = require("../modules/auth_utils");
const utils = require("../modules/auth_utils");
const router = express.Router();


router.post("/users/login", async function(req, res, next){

    let userLoginInfo = req.body;

    let userInputPassword = userLoginInfo.password;
    let userInputName = userLoginInfo.username;

    console.log(userInputName);

    try {
        
        let usernameFromDB = await db.getUser(userInputName);
        
        if(usernameFromDB.rows[0].username === userInputName){

            let verifyPass = utils.verifyPassword(userInputPassword, usernameFromDB.rows[0].password, usernameFromDB.rows[0].salt);
            
            console.log(verifyPass);

        }
        
    

    } catch (error) {   
        console.log(error);
    }

 //   let verifyPass = utils.verifyPassword(userInputPassword,  )


})

//Create User -----------

router.post("/users", async function(req, res, next){

    let credString = req.headers.authorization;
    
    let cred = authUtils.decodeCred(credString);

    if (cred.username == "" || cred.password == ""){
        res.status(401).json({error: "Missing or invalid username or password"}).end();
        return;
    }

    let hash = authUtils.createHash(cred.password);

    try {

        let data = await db.createUsers(cred.username, hash.value, hash.salt);

        if (data.rows.length > 0) {
            res.status(200).json({msg: "The user was created successfully"}).end();
        }
        else {
            throw "The user couldn't be created";
        }
    }
    catch(error){
        console.log(error);
    }
});

router.get("/users", async function(req, res, next){

    try {
        
        let data = await db.getAllUsers();

        res.status(200).send(data.rows).end();

    } catch (error) {
        next(error)
    }

    

});

module.exports = router;