const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// CREATE RIDE
router.post(
  "/create",
  authMiddleware.authUser,
  [
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup Address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid Destination Address"),
    body("vehicleType")
      .isString()
      .isIn(["auto", "car", "motorcycle"])
      .withMessage("Invalid Vehicle Type"),
  ],
  rideController.createRide
);

// GET FARE
router.get(
  "/get-fare",
  authMiddleware.authUser,
  [
    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup Address"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid Destination Address"),
  ],
  rideController.getFare
);

// CONFIRM RIDE
router.post(
  "/confirm",
  authMiddleware.authCaptain,
  [
    body("rideId").isMongoId().withMessage("Invalid Ride ID"),
    // body("otp").isString().isLength({ min: 4, max: 4 }).withMessage("Invalid OTP"),
  ],
  rideController.confirmRide
);

// router.post("/start", (req, res) => {
//   console.log("🔥 START ROUTE HIT ✅");
//   res.send("START WORKING");
// });
router.post(
  "/start",
  authMiddleware.authCaptain,
  [
    body("rideId").isMongoId().withMessage("Invalid Ride ID"),
    body("otp").isString().isLength({ min: 4, max: 4 }).withMessage("Invalid OTP"),
  ],
  rideController.startRide
);
router.post("/finish", rideController.finishRide);



module.exports = router;