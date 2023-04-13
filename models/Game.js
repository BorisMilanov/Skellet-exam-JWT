const { Schema, model,Types} = require('mongoose');

const gamesSchema = new Schema({
    gamename: { type: String, require: true},
    image: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    gerne: { type: String, require: true },
    platform: { type: String, require: true },
    owner: { type: Types.ObjectId, ref: 'User', require: true }
})
const Game = model('Game', gamesSchema);

module.exports = Game