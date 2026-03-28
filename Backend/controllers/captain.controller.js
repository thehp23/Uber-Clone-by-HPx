const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service')
const { validationResult } = require('express-validator');


//register module
module.exports.registerCaptain = async (req,res,next) =>{ //captain register
    const errors = validationResult(req);
    if(!errors.isEmpty()){ // If any errors occured in body of express-validator then show the result here as an error
        return res.status(400).json({
            success : false,
            errors : errors.array()
        })
    }

    const {fullname,email,password,vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email })
    if(isCaptainAlreadyExist){
        return res.status(400).json({
            success : false,
            message : 'Capatin already exist'
        })
    }

    const hashedPass = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
       
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hashedPass,
        color : vehicle.color,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType,

    })//hashed password successfully

    const token = captain.generateAuthToken(); //token generated at register page
    captain.password = undefined
    res.status(201).json({
        success : true,
        token,
        captain
    })//responded to the captain with token
}