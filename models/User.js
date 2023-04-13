const {Schema, model} = require('mongoose');

const userSchema = new Schema ({
    email:{type:String,require:true},
    username: { type:String,required: true},
    hashedPassword:{ type:String}
})


const User = model('User',userSchema);

module.exports = User;