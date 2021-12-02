const pg = require("pg");

const dbURI = "postgres://pvmasarbwjcapq:b9ac1bd34cdfea58b154863227e304c846d5022315f78131578fff5316cc30d8@ec2-34-246-155-237.eu-west-1.compute.amazonaws.com:5432/d1d2ak6c1p140m";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: { rejectUnauthorized: false }
});

let dbMethods = {}

dbMethods.getAllUsers = function(){

    let sql = "SELECT id, username FROM users";
    return pool.query(sql);
}

dbMethods.getUser = function(username) {
    let sql = "SELECT * FROM users WHERE username = $1"
    let values = [username];
    return pool.query(sql, values);
}

dbMethods.createUsers = function(username, password, salt){
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
    let values = [username, password, salt];
    return pool.query(sql, values);
}

dbMethods.updateUser = function(username, id){

    let sql = "UPDATE users SET username = $1 WHERE id = $2";
    let values = [username, id];
    return pool.query(sql, values);
        
}

dbMethods.updateUserPass = function(password, salt, id){

    let sql = "UPDATE users SET username = $1 WHERE id = $2";
    let values = [username, id];
    return pool.query(sql, values);
        
}

dbMethods.deleteUsers = function(id) {
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);
}

dbMethods.createGameDB = function(gameName, player1ID, player2ID, gameUrl){

    let sql = "INSERT INTO mapinfo (heading, playerarr, maparr, userid, id, time, url) VALUES($1, $2, $3, $4, DEFAULT, DEFAULT, $5) returning *";

    let mapArr = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]; 

    let playerArr = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]; 

    let values = [gameName, playerArr, mapArr, player1ID, gameUrl];
    return pool.query(sql, values);

}

dbMethods.getGamesDBlist = function(){

    let sql = "SELECT id, url, heading FROM mapinfo";
    return pool.query(sql);
}

dbMethods.getGamesDB = function(url){

    let sql = `SELECT playerarr, maparr FROM mapinfo WHERE url = $1`;
    values = [url];
    return pool.query(sql, values);
}

module.exports = dbMethods;