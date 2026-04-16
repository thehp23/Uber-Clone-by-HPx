const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklistToken.model')


//register module
module.exports.registerUser = async(req,res,next) =>{ //user register
    const errors = validationResult(req);
    if(!errors.isEmpty()){  // If any errors occured in body of express-validator then show the result here as an error
        return res.status(400).json({
            success : false,
            errors: errors.array()
        })
    }

    const {fullname,email,password} = req.body;

     const isUserAlreadyExist = await userModel.findOne({ email })
        if(isUserAlreadyExist){
            return res.status(400).json({
                success : false,
                message : 'User already exist'
            })
        }
    

    const hashedPass = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hashedPass
    })//hash password successfull
console.log("🔐 SIGN SECRET:", process.env.JWT_SECRET);


    const token = user.generateAuthToken(); //token generated at register page
    user.password = undefined;
    res.status(201).json({
        success : true,
        token,
        user
    })//responded to the user with token
}


//login module
module.exports.loginUser = async(req,res,next)=>{ //user login
    const errors = validationResult(req);// If any errors occured in body of express-validator then show the result here as an error
    if(!errors.isEmpty()){
        return res.status(400).json({
            success : false,
            errors : errors.array()
        })
    }
    const { email, password } = req.body

    const user = await userModel.findOne({email}).select('+password') //find email and check the password..is it matched or not
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
console.log("🔐 SIGN SECRET:", process.env.JWT_SECRET);

    const token = user.generateAuthToken();//once again token generated at login page
    res.cookie("token", token)//after all authentication we work with cookie and send as response from server to browser and store in browser cookie

    user.password = undefined;
    res.status(200).json({
        success : true,
        token,user
    })//responded to the user with token
}


//profile module
module.exports.getUserProfile = async (req, res, next) => {
    if (!req.user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    // send user safely without _doc
    const { _id, firstname, lastname, email } = req.user;
    res.status(200).json({ success: true, user: { _id, firstname, lastname, email } });
};


//logout module
module.exports.logoutUser = async(req,res,next) =>{ //user logout
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token})
    res.clearCookie('token')
    res.status(200).json({ message : 'Logged Out' })
}
