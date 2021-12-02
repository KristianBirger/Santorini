const crypto = require("crypto");

const secretDB = "TheFreshPrinceofBelAir"; // must be stored in an enviromental variable in the finished app

let utils = {};

utils.decodeCred = function(credString) {

    let cred = {};

    let b64String = credString.replace("basic ", "");

    let asciiString = Buffer.from(b64String, "base64").toString("ascii");

    cred.username = asciiString.replace(/:.*/, "");

    cred.password = asciiString.replace(cred.username + ":", "");

    return cred;

};  

utils.createHash = function(password){

    let hash = {}

   
    hash.salt = Math.random().toString();
    hash.value = crypto.scryptSync(password, hash.salt, 64).toString("hex");
    
    return hash;
};



utils.verifyPassword = function(passWFromUser, hashFromDB, saltFromDB) {

    hash = crypto.scryptSync(passWFromUser, saltFromDB, 64).toString("hex");

    if (hash == hashFromDB) {
        return true;
    }

    return false;

}

utils.createToken = function(username, userid){

    let part1 = JSON.stringify({"alg": "HS256", "typ": "JWT"});
    let part2 = JSON.stringify({"user": username, "userid": userid, "iat": Date.now()});

    let b64part1 = Buffer.from(part1).toString("base64");
    let b64part2 = Buffer.from(part2).toString("base64");

    let openPart = b64part1 + "." + b64part2;

    let secret = secretDB // must be stored in an enviromental variable in the finished app
    let sign = crypto.createHmac("SHA256", secret).update(openPart).digest("base64");
    
    return openPart + "." + sign;


}

utils.verifyToken = function(token){

    let tokenArr = token.split(".");
    let openPart = tokenArr[0] + "." + tokenArr[1];
    let signToCheck = tokenArr[2];

    let secret = secretDB; // must be stored in an enviromental variable in the finished app
    let sign = crypto.createHmac("SHA256", secret).update(openPart).digest("base64");

    if(signToCheck != sign){

        return false;
    }

    let payloadText = Buffer.from(tokenArr[1], "base64").toString("ascii");
    let payload = JSON.parse(payloadText);

    let expireTime = payload.iat + 24 * 60 * 60 * 1000; 
    if (expireTime < Date.now()) {
        
        return false;
    }

    return payload;

}

module.exports = utils