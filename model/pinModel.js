const mongoose = require ('mongoose')

const pinSchema = new mongoose.Schema({
    pin:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
})

const pinModel = mongoose.model('pin', pinSchema)

module.exports = pinModel