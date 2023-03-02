const mongoose = require('mongoose');
const DB_NAME = 'RandomTests'
const connectionString = "mongodb://localhost:27017/Battleground"

module.exports = async (app) => {
    try{
         mongoose.set('strictQuery', false)
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}
