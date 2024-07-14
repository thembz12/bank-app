const mongoose = require('mongoose')

const depositSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    amount:{
        type:Number,
        require:true
    }

}, {timestamps:true})

const depositModel = mongoose.model('deposits', depositSchema)

module.exports = depositModel