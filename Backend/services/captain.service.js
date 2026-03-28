const captainModel = require('../models/captain.model')

module.exports.createCaptain = async ({ 
    firstname,lastname,email,password,color,plate,capacity,vehicleType
}) =>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All fields must be required!!!");
    }
    const captain = captainModel.create({ //captain created 
        fullname:{
            firstname,lastname
        },
        email,
        password,
        vehicle :{
            color,plate,capacity,vehicleType
        }
    })

    return captain;
}