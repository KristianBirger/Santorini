const express = require('express');
const server = express();
const cors = require("cors")
const gameRouter = require('./routes/game')
const port = (process.env.PORT || 8080);

const usageKeys = () => {
    let keys = process.env.usageKeys
    if (keys !== undefined) {
        keys = JSON.parse(keys)
    } else {
        keys = ["TestKey"]
    }
    return keys
}

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

server.set('port', port);
server.use(cors(corsOptions))
server.use(express.json())

server.get('/', (req, res, next) => { res.status(200).send('Ludo Hub').end(); });

server.use((req, res, next) => {
    let key = req.header("Game-Service-Key")
    if (usageKeys().includes(key)) {
        next();
    } else {
        res.status(406).end()
    }
})

server.use('/game', gameRouter)

server.listen(server.get('port'), function () {
    console.log('ludo hub running', server.get('port'));
});