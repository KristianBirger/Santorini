//const playerArrImport= require("/public/Main.js");

const express = require("express");
const pg = require("pg");
const dbURI = "postgres://zobaiucetmzsxq:6366801118e3ce48534db24f94ebd974ae276ed26ff7e818617b16cd2de188e8@ec2-52-213-119-221.eu-west-1.compute.amazonaws.com:5432/d1deqogq380er5";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: { rejectUnauthorized: false }
});


const server = express();
const PORT = process.env.PORT || 8080;

server.set("port", PORT);
server.use(express.static("public"));
server.use(express.json());



server.get("/msgs", async function(req, res, next){
	let sql = "SELECT * FROM messages";
	try {
		let result = await pool.query(sql);
		res.status(200).json(result.rows).end();
	} 
	catch(err) {
	res.status(500).json({error: err}).end();
	}
});

server.get("/api/pArr", async function(req, res, next){
    console.log(" You got it! ");
	let sql = "SELECT * FROM mapinfo";
	
	try {
		let result = await pool.query(sql);
		res.status(200).json(result.rows).end();
	} 
	catch(err) {
	res.status(500).json({error: err}).end();
	}
});

// userid string/navn type charlson, mens id er random tall
server.put("/api/pArr", async function(req, res, next) {
    console.log(req.body.mar);

    //const playerArr =  req.body.arr;
   // const mapArr = req.body.mar;
	
    let update= req.body;

    let sql = "INSERT INTO mapinfo (id, date , heading, playerarr, maparr, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3, $4) returning *";
    let userid= "2";
    let values = [update.id , update.arr, update.mar, userid];

    try {
		let response = await pool.query(sql, values);
		
		if (response.rows.length > 0) {
			res.status(200).json({msg: "Message was created"}).end();
			console.log("Message created");	
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

server.post("/msgs", async function (req, res, next) {
    console.log(req.body.msg);

	let updata = req.body;
	let userid = "1"; 

	let sql = "INSERT INTO messages (id, date , heading, msgbodyp, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
	let values = [updata.id, updata.msg, userid];
	
	try {
		let response = await pool.query(sql, values);
		
		if (response.rows.length > 0) {
			res.status(200).json({msg: "Message was created"}).end();
			console.log("Message created");	
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

server.put("/", (req, res, next) => {
	res.status(200).end();
});

server.delete("/", (req, res, next) => {
	res.status(200).end();
});

server.listen(server.get("port"), function () {
	console.log("server running", server.get("port"));
});
