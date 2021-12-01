const express = require("express");

const db = require("../modules/db");
const authUtils = require("../modules/auth_utils");
const utils = require("../modules/auth_utils");
const protect = require("../modules/authToken");
const { response } = require("express");
const router = express.Router();


router.post("/users/login", async function(req, res, next){
    const rowN = 0;
    let userLoginInfo = req.body;

    let userInputPassword = userLoginInfo.password;
    let userInputName = userLoginInfo.username;

    try {
        
        let UserInfoFromDB = await db.getUser(userInputName);
        
        if (UserInfoFromDB.rowCount === 0){
            res.status(401).json({error: "Wrong username!"}).end();
                return;
        }

        if(UserInfoFromDB.rows[rowN].username === userInputName){

            let verifyPass = utils.verifyPassword(userInputPassword, 
                                                UserInfoFromDB.rows[rowN].password, 
                                                UserInfoFromDB.rows[rowN].salt);
            if(verifyPass){

                
               let tok = authUtils.createToken(UserInfoFromDB.rows[rowN].username, UserInfoFromDB.rows[rowN].id)
            
                console.log(UserInfoFromDB.rows[rowN].userid);

                res.status(200).json({
                                    msg: "Matching passwords!",
                                    verified: verifyPass,
                                    token: tok,
                                    username: userInputName,
                                    id: UserInfoFromDB.rows[rowN].id
                                }).end();

            }
            else{
                res.status(401).json({error: "Wrong password! This machine will now selfdestruct!"}).end();
                return;
            }    
        
        }

    } catch (error) {   
        console.log(error);
    }
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

        console.log("Logging data: " + data);

        if (data.rows.length > 0) {
            res.status(200).json({msg: "The user was created successfully"}).end();
        }
        else {
            throw "The user couldn't be created";
        }
    }
    catch(error){

            if (error.code = "23505"){
                res.status(401).json({error: "Error - That username already exists!"}).end();
            }
            else
            
        console.log(error.code);
        
    }
});

router.put("/users/updateName", protect, async function(req, res, next){

let update = req.body;
console.log(update);

try {
    let data = await db.updateUser(update.newUsername, update.id);
   
    if (data.rowCount > 0) {

        res.status(200).json({msg: `New username set to ${update.username}`,
                              newUsername: update.newUsername}).end();

        console.log("PUT request was created!");
    }

}
catch(error) {

    if (error.code = "23505"){
        res.status(401).json({error: "Error - That username already exists!"}).end();
    }

    console.log("something went wrong at PUT " + error);
   // res.status(500).json({error: error}).end();
}


});

router.put("/users/updatePassword"), protect, async function(req,res,next){
    const rowN = 0;
    let update = req.body;
    
    try {
        
    let UserInfoFromDB = await db.getUser(update.username);

    let verifyPass = utils.verifyPassword(update.oldPassword, 
        UserInfoFromDB.rows[rowN].password, 
        UserInfoFromDB.rows[rowN].salt);
        
        
        if(verifyPass){

            //create new password
            let hash = authUtils.createHash(update.newPassword);


        }

    } catch (error) {
        
    }

}

router.get("/users", async function(req, res, next){

    try {
        
        let data = await db.getAllUsers();

        res.status(200).send(data.rows).end();

    } catch (error) {
        next(error)
    }
});

router.delete("/user", protect, async function(req, res, next) {

    myid = res.locals.userid;

    try {
        
        let data = await db.deleteUsers(myid);
        console.log(data);
        if(data.rows.length > 0){
            res.status(200).json({msg: "The user was deleted"}).end();
        }
        else {

            throw "The user couldn't be deleted";
        }
        

    } catch (error) {
        console.log(error);
        res.send(error);
    }

});

router.get("/activeGames", protect, async function(req, res, next) {

   // console.log(res.locals.username);
    //console.log(res.locals.userid);



    try {

        let data = await db.getAllUsers();
        res.status(200).json(data.rows).end();

        

        
    } catch (error) {
        next(error);
    }

});

router.post("/verify", protect ,async function(req,res,next) {

    res.status(200).end();

    

});

module.exports = router;