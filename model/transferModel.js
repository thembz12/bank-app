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
    },
    accountNumber:{
        type:String,
    required:true}

}, {timestamps:true})

const transferModel = mongoose.model('tranfers', transferSchema)

module.exports = transferModel