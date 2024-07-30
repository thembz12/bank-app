const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
fullname:{
    type:String, 
    required:true,
    trim:true,
    lowercase:true},

email:{
    type:String, 
    unique:true, 
    required:true,
    trim:true,
    lowercase:true},

address:{type:String, 
    required:true
},

dob:{type:String,
    required:true,
    },

password:{
    type:String, 
    required:true
},

phoneNumber:{
    type:String, 
    required:true,
    trim:true
},

    accountBalance:{
        type:Number,
        default:0
    },

gender:{
    type:String, 
    required:true, enum: ["male", "female"], lowercase:true},

pin:{
    type:Number,
    default:0
},
accountNumber:{
    type:Number,
    default:0
},
isAdmin:{
    type:String,
    default:false
},
cardNumber:{type:Number,
    default:0
},

cvv:{type:Number,
    default:0

},

methodOfSavings:{
    type:String,
    required:true,
    enum:["savings", "current"], default:"savings"
},


blackList:[],

    },{timestamps:true})

    const userModel = mongoose.model("users", userSchema)
    module.exports = userModel