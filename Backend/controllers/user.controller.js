const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const { validationResult } = require('express-validator');




module.exports.registerUser = async(req,res,next) =>{ //user register
    const errors = validationResult(req);
    if(!errors.isEmpty()){  // If any errors occured in body of express-validator then show the result here as an error
        return res.status(400).json({
            errors: errors.array()
        })
    }
   

    const {fullname,email,password} = req.body;

    const hashedPass = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hashedPass
    })//hash password successfull

    const token = user.generateAuthToken();
    res.status(201).json({token,user})//responded to the user with token
}