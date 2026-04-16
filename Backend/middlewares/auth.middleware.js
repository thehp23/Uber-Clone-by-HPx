const userModel = require('../models/user.model')
const captainModel = require('../models/captain.model')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklistToken.model')



//user middleware
module.exports.authUser = async (req,res,next)=>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  //for finding token we can requst to the cookies 
// [1] -> it is indicate the token part in header
console.log("👉 TOKEN RECEIVED:", token);
if(!token){
   return res.status(401).json({message : 'Unauthorized'})
}

const isBlacklisted = await blacklistTokenModel.findOne({ token : token})
if(isBlacklisted){
   return res.status(401).json({message : 'UnauthorizedToken'})
}

try{
    console.log("🔐 VERIFY SECRET:", process.env.JWT_SECRET);
console.log("👉 TOKEN RECEIVED:", token);
    const decoded = jwt.verify(token,process.env.JWT_SECRET) //After assigned jwt verify 
    const user = await userModel.findById(decoded._id) //where you assigned the user data in jwt assigned(jwt.sign) phase, so we enter that data with decoded
    
    req.user = user; //whatever req.user we can set then that go as a respond to the profile page

    return next();

}catch(err) {
    return res.status(401).json({message : 'Unauthorized verification'})

}
}


//captain middleware
module.exports.authCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]//for finding token we can requst to the cookies 
// [1] -> it is indicate the token part in header
console.log("👉 TOKEN RECEIVED:", token);

    if(!token){
        return res.status(401).json({message : 'Unauthorized'})
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token : token})
    if(isBlacklisted){
     return res.status(401).json({message : 'UnauthorizedToken'})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET) //After assigned jwt verify 
        const captain = await captainModel.findById(decoded._id) //where you assigned the user data in jwt assigned(jwt.sign) phase, so we enter that data with decoded
        
        req.captain = captain; //whatever req.user we can set then that go as a respond to the profile page

        return next();
    }catch(err){
        return res.status(401).json({message : 'Unauthorized verfication'})
    }
  }