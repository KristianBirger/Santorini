class Game {
    constructor() {
        this.players = [];
        this.gameId = (Math.random() + 1).toString(36).substring(7);
        this.state = {};
    }
}

module.exports = Game

// NIM
// Tre på rad
// Othello 
// 