//const crypto = require("crypto");

const secret = "TheFreshPrinceofBelAir";

let utils = {};

utils.decodeCred = function(credString) {

    let cred = {};

    let b64String = credString.replace("basic ", "");

    let asciiString = Buffer.from(b64String, "base64").toString("ascii");

    cred.username = asciiString.replace(/:.*/, "");

    cred.password = asciiString.replace(cred.username + ":", "");

    return cred;

};  

console.log(utils.decodeCred("basic c3RpYW46cGFzc29yZA=="));

