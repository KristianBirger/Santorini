const pg = require("pg");

const dbURI = "postgres://zobaiucetmzsxq:6366801118e3ce48534db24f94ebd974ae276ed26ff7e818617b16cd2de188e8@ec2-52-213-119-221.eu-west-1.compute.amazonaws.com:5432/d1deqogq380er5";
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

dbMethods.deleteUsers = function(id) {
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);
}

dbMethods.getGameArray = function(id) {

    let sql = "SELECT * FROM mapinfo WHERE userid = $1";

    let values = ["jon"];

    return pool.query(sql, values);

}

module.exports = dbMethods;