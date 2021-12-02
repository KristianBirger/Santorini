const authUtils = require("./auth_utils");

function protect(req,res,next){
    
    let token = req.headers.authorization;

    if(!token) {
        res.status(401).json({error: "No or bad token"}).end();

        return;
    }

    let payload = authUtils.verifyToken(token);

    if(!payload) {
        res.status(403).json({error: "Not a valid token"}).end();
        return;
    }

    res.locals.userid = payload.userid;
    res.locals.username = payload.user;

    next();
}
    module.exports = protect;