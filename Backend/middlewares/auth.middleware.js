const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')




module.exports.authUser = async (req,res,next)=>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  //for finding token we can requst to the cookies 
// [1] -> it is indicate the token part in header
if(!token){
    res.status(401).json({message : 'Unauthorized'})
}

const isBlacklisted = await userModel.findOne({ token : token})
if(isBlacklisted){
    res.status(401).json({message : 'UnauthorizedToken'})
}

try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET) //After assigned jwt verify 
    const user = await userModel.findById(decoded._id) //where you assigned the user data in jwt assigned(jwt.sign) phase, so we enter that data with decoded
    
    req.user = user; //whatever req.user we can set then that go as a respond to the profile page

    return next();

}catch(err) {
    return res.status(401).json({message : 'Unauthorized123'})

}
}