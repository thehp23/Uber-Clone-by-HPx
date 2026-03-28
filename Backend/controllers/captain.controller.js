const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service')
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model')


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


//login module
module.exports.loginCaptain = async (req,res,next)=>{ //captain login
    const errors = validationResult(req);// If any errors occured in body of express-validator then show the result here as an error
    if(!errors.isEmpty()){
        return res.status(400).json({
            success : false,
            errors : errors.array()
        })
    }
    const { email, password } = req.body

    const captain = await captainModel.findOne({email}).select('+password') //find email and check the password..is it matched or not
    if(!captain){
        return res.status(401).json({
            success : false,
            message : "Invalid email or password"
        })//if user enterd wrong password
    }
     if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            }); //if user enterd wrong password
        }

    const isMatch = await captain.comparePassword(password) //password comparing
    if(!isMatch){
        return res.status(401).json({
            success : false,
            message : "Invalid email aor password"
        }) //if password does not match with original
    }


    const token = captain.generateAuthToken();//once again token generated at login page
    res.cookie("token", token)//after all authentication we work with cookie and send as response from server to browser and store in browser cookie

    captain.password = undefined;

    res.status(200).json({
        success : true,
        token,
        captain
    })//responded to the captain with token
}


//Profile module
module.exports.getCaptainProfile = async (req,res,next) =>{ //captain profile
    return res.status(200).json(req.captain)
}


//Logout module
module.exports.logoutCaptain = async (req,res,next) =>{ //captain logout
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token})
    res.clearCookie(token);
    res.status(200).json({ message : 'Logged Out' })
}
