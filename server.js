const express = require("express");
const pg = require("pg");
const createCredentials = require("./modules/createCredString");
const dbURI = "postgres://pvmasarbwjcapq:b9ac1bd34cdfea58b154863227e304c846d5022315f78131578fff5316cc30d8@ec2-34-246-155-237.eu-west-1.compute.amazonaws.com:5432/d1d2ak6c1p140m";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: { rejectUnauthorized: false }
});

const users = require("./routes/users");

const server = express();
const PORT = process.env.PORT || 8080;

server.set("port", PORT);
server.use(express.json());


server.use(express.static("public"));
server.use(users);


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

server.post("/msgs", async function (req, res, next) {
    console.log(req.body.msg);

	let updata = req.body;
	let userid = "1"; 

	let sql = "INSERT INTO messages (id, date , heading, msgbody, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
	let values = [updata.id, updata.msg, userid];
	
	try {
		let result = await pool.query(sql, values);
		
		if (result.rows.length > 0) {
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
