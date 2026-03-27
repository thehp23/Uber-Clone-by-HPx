const userModel = require('../models/user.model')



module.exports.createUser = async ({ 
    firstname,lastname,email,password
}) =>{
    if(!firstname || !email || !password){
        throw new Error("All fields must be required!!!");
    }
    const user = userModel.create({ //user created 
        fullname:{
            firstname,lastname
        },
        email,
        password
    })

    return user;
}