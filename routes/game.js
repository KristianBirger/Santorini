const express = require('express');
const router = express.Router()

const gameController = require('../controllers/game')

router.post("/", gameController.create);
router.post("/:gameId/join", gameController.join);
router.post("/:gameId/update", gameController.update);
router.get("/:gameId/poll", gameController.poll);

module.exports = router