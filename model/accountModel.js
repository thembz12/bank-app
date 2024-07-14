const mongoose = require ('mongoose')

const accountSchema = new mongoose.Schema({
    accountBalance:{
        type:Number
    },
    
 methodOfSavings:{
    type:String, 
    require:true,
    enum: ["savings", "current"],
    lowercase:true},

      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
      }

})

const accountModel = mongoose.model ('accounts',accountSchema )

module.exports = accountModel