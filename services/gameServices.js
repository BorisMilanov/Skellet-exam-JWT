const Game = require('../models/Game')

async function create(game) {
    return await Game.create(game)
}
async function getAll() {
    return Game.find({}).lean()
}

module.exports = {create,getAll};