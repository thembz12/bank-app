const transferModel = require ("../model/transferModel.js")
const depositModel = require ("../model/depositModel.js")


exports.comingIn = async (req,res) =>{
    try {
        const id = req.params.id 



        const deposit = await depositModel.find({userId:id}).lean()

        const history = [...deposit]
        
        history.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) 

        res.status(200).json({
            message:`money coming in`,
            data: history
        })

    } catch (error) {
        res.status(500).json(error.message)
        
    }
}

exports.comingOut = async (req,res) =>{
    try {
        const id = req.params.id



        const transfers = await transferModel.find({userId:id}).lean()

        const history = [...transfers]
        
        history.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) 

        res.status(200).json({
            message:`money coming in`,
            data: history
        })

    } catch (error) {
        res.status(500).json(error.message)
        
    }
}