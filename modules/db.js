const pg = require("pg");
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

module.exports = dbMethods;