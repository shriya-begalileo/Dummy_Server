const mongoose = require('mongoose')
require('dotenv').config()

const connection = ()=>{
    return mongoose.connect(process.env.MongoUrl)
}


module.exports = connection
