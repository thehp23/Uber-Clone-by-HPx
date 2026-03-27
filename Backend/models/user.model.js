const mongoose = require('mongoose'); //mongoose required
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({ //userschema created
    fullname : {
        firstname :{
            type : String,
            required : true,
            minlength : [3,'FirstName must be atleast 3 characters']
        },
        lastname :{
            type : String,
            minlength : [3,'LastName must be atleast 3 characters']
        }
    },
    email : {
            type : String,
            required : true,
            unique : true,
            minlength : [3,'Email must be atleast 3 characters']
    },
    password : {
            type : String,
            required : true,
            select : false
    },
    socketId :{
            type : String
    }
})

userSchema.methods.generateAuthToken = () =>{ //jwt Authentication
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET);
    return token;//token generated
}

userSchema.methods.comparePassword = async(password) =>{ //compare password with the help of bcrypt
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async(password) =>{ //hash password
    return await bcrypt.hash(password,10)
}

module.exports = mongoose.model("user",userSchema) //usermodel created