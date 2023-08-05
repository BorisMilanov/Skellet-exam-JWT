const { Schema, model } = require('mongoose');
//TODO email if it have it
const userSchema = new Schema({
    username: { type: String, required: true, minlength: [3, 'Username must be 3 characters'] },
    email: { type: String, require: true, minlength: [3, 'Username must be 3 characters'] }, //add to test validation
    hashedPassword: { type: String }
})


const User = model('User', userSchema);

module.exports = User;