const mongoose = require('mongoose')

const transferSchema = new mongoose.Schema({
    accountName:{
        type:String,
        ref:'users'
    },
    receiverName:{
        type:String
    },
    amount:{
        type:Number,
        require:true
    },
    description:{
        type:String
    }

}, {timestamps:true})

const transferModel = mongoose.model('tranfers', transferSchema)

module.exports = transferModel