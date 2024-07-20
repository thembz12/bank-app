const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
fullname:{
    type:String, 
    require:true,
    trim:true,lowercase:true},

email:{
    type:String, 
    require:true, 
    unique:true, 
    trim:true,lowercase:true},

address:{type:String,
    type:String, 
    require:true
},

dob:{type:String,
    require:true,
    },

password:{
    type:String, 
    require:true
},

phoneNumber:{
    type:String, 
    require:true,
    trim:true
},

    accountBalance:{
        type:Number,
        default:0
    },

gender:{
    type:String, 
    require:true, enum: ["male", "female"], lowercase:true},

pin:{
    type:Number,
    default:0
},


methodOfSavings:{
    type:String,
    require:true,
    enum:["savings", "current"], default:"savings"
},

blackList:[],

    },{timestamps:true})

    const userModel = mongoose.model("users", userSchema)
    module.exports = userModel