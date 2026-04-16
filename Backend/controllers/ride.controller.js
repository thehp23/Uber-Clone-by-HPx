const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require('../socket'); 
const rideModel = require("../models/ride.model");
const userModel = require("../models/user.model");


module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json({
      success: true,
      ride,
    });
    
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log("Pickup Coordinates:", pickupCoordinates);
    const captainsNearby = await mapService.getCaptainsNearby(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      50,
    ); // 50 km radius

    // ride.otp = ""

    console.log("Nearby Captains:", captainsNearby);

    const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

    captainsNearby.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event : 'new-ride',
        data : rideWithUser
      })
    })

   
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(201).json({
      success: true,
      fare,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.confirmRide = async (req, res) => {
  try {
    const { rideId } = req.body;

    console.log("👉 RideId:", rideId);
    console.log("👉 Captain from token:", req.captain);

    // ✅ Check auth
    if (!req.captain) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized captain",
      });
    }

    const captainId = req.captain._id;

    // ✅ Get ride + user
    const ride = await rideModel.findById(rideId).populate("user").select("+otp");

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    // ✅ Get captain
    const captain = await require("../models/captain.model").findById(captainId);

    if (!captain) {
      return res.status(404).json({
        success: false,
        message: "Captain not found",
      });
    }

    // ✅ Update ride
    ride.status = "accepted";
    ride.captain = captainId;
    await ride.save();

    const captainData = {
      name:
        captain.fullname.firstname +
        " " +
        captain.fullname.lastname,
      vehicle: captain.vehicle.color,
      vehicleNumber: captain.vehicle.plate,
      rating: 4.8,
      avatar: "https://i.pravatar.cc/100",
    };

    // ✅ Send socket
    if (ride.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {//change
  event: "ride-confirmed",
  data: {
    captain: captainData,
    ride: {
      _id: ride._id,
      otp: ride.otp // ✅ SEND OTP HERE
    }
  },
});
    }

    return res.status(200).json({
      success: true,
      message: "Ride accepted",
      captain: captainData,
      ride
    });

  } catch (error) {
    console.log("❌ Confirm Ride Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.startRide = async (req, res) => {
  try {
    const { rideId,otp } = req.body;

    const ride = await rideModel
      .findById(rideId)
      .populate("user")
      .populate("captain");

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

     // ✅ VERIFY OTP
    if (ride.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Update status
    ride.status = "ongoing";
    await ride.save();

    res.status(200).json({
      message: "Ride started",
      ride: ride
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error starting ride" });
  }
};

module.exports.finishRide = async (req, res) => {
  try {
    const { rideId } = req.body;

    const ride = await rideModel
    .findById(rideId)
    .populate("user");;

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    ride.status = "completed";
    ride.endedAt = new Date(); // optional

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride completed",
      ride,
    });

  } catch (error) {
    console.log("Finish Ride Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
