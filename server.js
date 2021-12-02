const express = require("express");
const pg = require("pg");
const dbURI = "postgres://pvmasarbwjcapq:b9ac1bd34cdfea58b154863227e304c846d5022315f78131578fff5316cc30d8@ec2-34-246-155-237.eu-west-1.compute.amazonaws.com:5432/d1d2ak6c1p140m";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: { rejectUnauthorized: false }
});

const users = require("./routes/users");
const gameManager = require("./routes/gameManager");
const gameRouter = require("./public/gameRouter");

const server = express();
const PORT = process.env.PORT || 8080;

server.set("port", PORT);
server.use(express.json());


server.use(express.static("public"));
server.use(users);
server.use(gameManager);
server.use(gameRouter);


server.get("/msgs", async function(req, res, next){
	let data = req.headers;

	let sql = "SELECT * FROM messages WHERE gameid = $1";
	let values = [data.url]
	
	try {
		let result = await pool.query(sql, values);
		res.status(200).json(result.rows).end();
	} 
	catch(err) {
	res.status(500).json({error: err}).end();
	}
});

server.post("/msgs", async function (req, res, next) {

	let updata = req.body;

	let sql = "INSERT INTO messages (id, date, msgbody, userid, gameid) VALUES(DEFAULT, DEFAULT, $1, $2, $3)";
	let values = [updata.msgbody, updata.userid, updata.gameid];
	
	try {
		let result = await pool.query(sql, values);

		if (result.rowCount > 0) {
			res.status(200).json({msg: "Message was created"}).end();
		
		}
		else {
			throw("The message could not be sendt");
		}
	}
	catch(error) {
		console.log("something went wrong" + error);
		res.status(500).json({error: error}).end();
	}

	
});

server.get("/api/pArr", async function(req, res, next){

	let sql = "SELECT * FROM mapinfo";
	
	try {
		let result = await pool.query(sql);
		res.status(200).json(result.rows).end();
	} 
	catch(err) {
	res.status(500).json({error: err}).end();
	}
});



server.post("/api/pArr", async function(req, res, next) {
    let update= req.body;

	let userid = "jon";

    let sql = "INSERT INTO mapinfo (id, date , heading, playerarr, maparr, userid) VALUES(DEFAULT, DEFAULT, DEFAULT, $1, $2, $3) returning *";
   
    let values = [update.arr.player, update.arr.map, userid];

    try {
		let response = await pool.query(sql, values);
		
		if (response.rows.length > 0) {
			res.status(200).json({msg: "Message was created"}).end();
			
		}
		else {
			throw("The message could not be sendt");
		}
	}
	catch(error) {
		console.log("something went wrong " + error);
		res.status(500).json({error: error}).end();
	}
});


server.put("/api/pArr", async function(req, res, next) {
    let update= req.body;
    let sql = "UPDATE mapinfo SET playerarr = $1, maparr = $2 WHERE userid = $3";
	let userid = "jon";
    let values = [update.arr.player, update.arr.map, userid];
	
    try {
		let response = await pool.query(sql, values);
		
		
		if (response.rowCount > 0) {
			res.status(200).json({msg: "PUT request was created!"}).end();
				
		}
		else {
			throw("The PUT request could not be sendt!");
		}
	}
	catch(error) {
		res.status(500).json({error: error}).end();
	}
});


server.put("/", (req, res, next) => {
	res.status(200).end();
});

server.delete("/", (req, res, next) => {
	res.status(200).end();
});

server.listen(server.get("port"), function () {
	console.log("server running", server.get("port"));
});
