
function createCredString(username, password){

    let combinedStr = username + ":" + password;
    let b64Str = Buffer.from(combinedStr).toString("base64"); 

    return `basic ${b64Str}`;
}



module.exports = createCredString;