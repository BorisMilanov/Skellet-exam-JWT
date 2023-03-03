const {Schema, model, Types} = require('mongoose');

const hotelSchema = new Schema({
    name:{type:String,require:true, unique:true},
    city:{type:String,require:true},
    rooms:{type:Number,require:true},
    imageUrl:{type:String,require:true},
    bookings: {type: [Types.ObjectId], ref: 'User', default: []},
    owner: {type: Types.ObjectId, ref: 'User' ,require:true}
})

hotelSchema.index({name:1}, {
    collation:{
        locale: 'en',
        strength: 2
    }
})

const Hotel = model('Hotel',hotelSchema);

module.exports = Hotel;