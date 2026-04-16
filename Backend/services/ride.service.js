const crypto = require('crypto')
const rideModel = require('../models/ride.model')
const mapService = require('../services/maps.service')


// get prices
const getFare = async (pickup,destination) =>{
    if(!pickup || !destination){
        throw new Error('Pickup and Destination are required')
    }

    const distanceTime = await mapService.getDistanceTime(pickup,destination);

    const baseFare = {
        auto : 25,
        car : 40,
        motorcycle : 15
    };
    const perKmRate = {
        auto : 10,
        car : 15,
        motorcycle : 8
    };
    const perMinuuteRate = {
        auto : 2,
        car : 3,
        motorcycle : 1.5
    };

    const fare = {
        auto: baseFare.auto + ((distanceTime.distance.value /1000)*perKmRate.auto) + ((distanceTime.duration.value/60)*perMinuuteRate.auto),
        car: baseFare.car + ((distanceTime.distance.value /1000)*perKmRate.car) + ((distanceTime.duration.value/60)*perMinuuteRate.car),
        motorcycle: baseFare.motorcycle + ((distanceTime.distance.value /1000)*perKmRate.motorcycle) + ((distanceTime.duration.value/60)*perMinuuteRate.motorcycle)
    };

    return fare;
}

module.exports.getFare = getFare;

// generate otp and passed in ride.service.js
const getOtp = (num) =>{


const generateOtp = (num) =>{
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
}
return generateOtp(num)
}

//creation of rides
module.exports.createRide = async ({user,pickup,destination,vehicleType}) =>{
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required')
    }

    const fare = await getFare(pickup,destination)
    
    const ride =  rideModel.create({
        user,
        pickup,
        destination,
        fare : Math.round(fare[vehicleType]),
        otp : getOtp(4)
    })
    return ride;
}

// module.exports.confirmRide = async (req, res) => {
//   try {
//     const { rideId, captainId } = req.body;

//     const ride = await rideModel.findByIdAndUpdate(
//       rideId,
//       {
//         status: "accepted",
//         captain: captainId,
//       },
//       { new: true }
//     );

//     res.json({ success: true, ride });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// module.exports.startRide = async (req, res) => {
//   try {
//     const { rideId } = req.body;

//     const ride = await rideModel.findByIdAndUpdate(
//       rideId,
//       { status: "confirmed" },
//       { new: true }
//     );

//     res.json({ success: true, ride });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// module.exports.finishRide = async (req, res) => {
//   try {
//     const { rideId } = req.body;

//     const ride = await rideModel.findByIdAndUpdate(
//       rideId,
//       { status: "completed" },
//       { new: true }
//     );

//     res.json({ success: true, ride });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

