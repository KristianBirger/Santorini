const Game = require("../models/game")


class GameController {

    static games = [];


    static create(req, res, next) {
        const game = new Game();
        game.players.push(req.body.player);
        game.state = req.body.state;
        GameController.games.push(game);
        res.status(200).json(game);
        next();
    }

    static join(req, res, next) {
        let game = GameController.games.find(g => g.gameId == req.params.gameId);
        let player = game.players.find(p => p == req.body.player);
        if (!player) {
            game.players.push(req.body.player);
            res.status(200).json(game);
        } else {
            res.status(409).json(game);
        }
        next();
    }

    static update(req, res, next) {
        let game = GameController.games.find(g => g.gameId == req.params.gameId);
        if (game) {
            game.state = req.body.state;
            res.status(200).json(game);
        } else {
            res.status(404);
        }
        next();
    }

    static poll(req, res, next) {
        let game = GameController.games.find(g => g.gameId == req.params.gameId);
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404);
        }
        next();
    }

}

module.exports = GameController