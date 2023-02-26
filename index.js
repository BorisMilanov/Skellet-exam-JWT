const express = require('express');
const expressConfig= require('./config/expressConfig')
const databaseConf = require('./config/databaseConfig')
const routes =require('./config/routes')

start()
async function start() {
    const app = express();
    expressConfig(app)
    await databaseConf(app)
    routes(app)
    app.listen(3000,()=>{console.log('Database works');})
}
