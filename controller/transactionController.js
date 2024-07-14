const transferModel = require ("../model/transferModel.js")
const depositModel = require ("../model/depositModel.js")
const userModel = require ("../model/userModel.js")
const pinModel = require ("../model/pinModel.js")


exports.deposit = async(req,res)=>{
    try {
        const {id} = req.params
        const {amount} = req.body

        const user = await userModel.findById(id)

        const credit = user.accountBalance += amount

        user.accountBalance = credit

        const deposit = await depositModel.create({
            userId:id,
            amount
        })

        await user.save()

        return res.status(200).json({
            message: ` ${deposit.amount} has deposited in your account `,
            data:user
        })
         
    } catch (error) {
        res.status(500).json({
            message:`${error.message}`
        })
    }
}

exports.createPin = async(req,res)=>{
    try {
        const {id} = req.params
        const {pin} = req.body

        const user = await userModel.findById(id)

        const newPin = user.pin += pin

        user.pin = newPin

        const deposit = await pinModel.create({
            userId:id,
            pin
        })

        await user.save()

        return res.status(200).json({
            message: `pin created successfully `, deposit,
            data:user
        })
        
    } catch (error) {
        res.status(500).json({
            message:`${error.message}`
        })
    }
}


exports.transfer = async(req,res)=>{
    try {
        const id = req.params.id
        const {fullname,amount,description,pin} = req.body

        const receiver = await userModel.findOne({fullname})
        if(!receiver){
            return res.status(400).json({
                message:'No user with this name'
            })
        }

        const sender = await userModel.findById(id)

        if(!sender){
            return res.status(400).json({
                message:`user not found`
            })
        }
        if(pin !== sender.pin){
            return res.status(400).json({
                message:`pin is incorrect`
            })
        }

        if(sender.accountBalance < amount){
            return res.status(400).json({
                message:"insufficient funds"
            })
        }

        const debit = sender.accountBalance -= amount

        sender.accountBalance = debit
       
        const newReceive = receiver.accountBalance += amount
        receiver.accountBalance = newReceive

        const transfer = await transferModel.create({
            accountName:sender.fullname,
            receiverName:receiver.fullname,
            amount,
            description,
            pin
        })

        await sender.save()
        await receiver.save()

        return res.status(200).json({
            message: ` ${transfer.amount} has transferred to ${receiver.fullname}'s account `,
            data:transfer
        })
        
    } catch (error) {
        res.status(500).json({
            message:`${error.message}`
        })
    }
}