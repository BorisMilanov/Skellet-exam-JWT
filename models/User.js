const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: [3, 'Username must be 3 characters'] },
    hashedPassword: { type: String }
})


const User = model('User', userSchema);

module.exports = User;