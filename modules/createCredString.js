
function createCredString(username, password){

    let combinedStr = username + ":" + password;
    let b64Str = Buffer.from(combinedStr).toString("base64"); 

    return `basic ${b64Str}`;
}

let cred = createCredString("stian", "passord"); //basic c3RpYW46cGFzc29yZA==
console.log(cred);


module.exports = createCredString;