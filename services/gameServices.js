const Game = require('../models/Game')

async function create(game) {
    return await Game.create(game)
}

module.exports = {create};