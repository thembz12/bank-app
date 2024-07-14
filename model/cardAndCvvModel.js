const mongoose = require ("mongoose")

const cardAndCvvSchema = new mongoose.Schema({
cardNumber:{type:String
},

cvv:{type:String

},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
},

},{timestamps:true})

const cardAndCvvModel = mongoose.model("cardAndCvv" ,cardAndCvvSchema)

module.exports = cardAndCvvModel