const cardAndCvvModel = require ("../model/cardAndCvvModel")
const userModel = require ("../model/userModel")

exports.cardAndCvv = async (req,res)=>{
    try{
        const id = req.params.id

        const createdCardNumber = function (){
            return Math.floor(Math.random()*10000000000000000)
        }
        const createdCvvNumber = function(){
            return Math.floor(Math.random()*1000)
        }
           
        const user = await userModel.findById(id)
        if(!user){
            return res.status(400).json({
                message:"user ID is incorrect"
            })
        } 

        const number = new cardAndCvvModel({
            CardNumber:createdCardNumber(),
            cvv:createdCvvNumber(),
            userID:id
    })
        

        await number.save()
        res.status(200).json({
            message:"card and cvv number created successfully", 
            data:number
        })
    }catch(error){
        res.status(500).json(error.message)
    }
}