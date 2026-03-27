const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const { validationResult } = require('express-validator');




module.exports.registerUser = async(req,res,next) =>{ //user register
    const errors = validationResult(req);
    if(!errors.isEmpty()){  // If any errors occured in body of express-validator then show the result here as an error
        return res.status(400).json({
            success : false,
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

    const token = user.generateAuthToken(); //token generated at register page
    user.password = undefined;
    res.status(201).json({
        success : true,
        token,
        user
    })//responded to the user with token

}
module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success : false,
            errors : errors.array()
        })
    }
    const { email, password } = req.body

    const user = await userModel.findOne({email}).select('+password') 
    console.log("LOGIN DEBUG:");
    console.log("Entered password:", password);
    console.log("DB password:", user?.password);//find email and check the password..is it matched or not
    if(!user){
        return res.status(401).json({
            success : false,
            message : "Invalid email or password"
        })//if user enterd wrong password
    }
     if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

    const isMatch = await user.comparePassword(password) //password comparing
    if(!isMatch){
        return res.status(401).json({
            success : false,
            message : "Invalid email aor password"
        }) //if password does not match with original
    }
    const token = user.generateAuthToken();//once again token generated at login page
    user.password = undefined;
    res.status(200).json({
        success : true,
        token,user
    })//responded to the user with token
}