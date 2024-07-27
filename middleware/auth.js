const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.authenticate = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if(!auth) {
            return res.status(401).json({
                message: 'Authorization required'
            })
        }
        const token = auth.split(' ')[1];

        if(!token){
            return res.status(401).json({
                message: 'invalid token'
            })
        }
   
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        
        const user = await userModel.findById(decodedToken.userId); 
        if(!user){
            return res.status(401).json({
                message: 'Authentication failed:  User not found'
            })
        }
        
        if(user.blackList.includes(token)){
            return res.status(401).json({
                message: 'Session expired: Please login to continue'
            })
        }

        // // Check if the user is an admin
        // if(!user.isAdmin){
        //     return res.status(403).json({
        //         message: 'Authentication failed:  User not an admin'
        //     })
        // }

        req.user = decodedToken
        next();

    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            return res.json({message: 'Session expired: Please login to continue'})
        }
        res.status(500).json({
            message: error.message
        })
    }
}