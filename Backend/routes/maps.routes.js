const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const mapController = require("../controllers/maps.controller");
const { query } = require("express-validator");

//  GET Coordinates
router.get(
  "/get-coordinates",

  // ✅ AUTH FIRST
  authMiddleware.authUser,

  // ✅ VALIDATION WITH MESSAGE
  [
  query("address")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be at least 3 characters long")],

  // ✅ CONTROLLER
  mapController.getCoordinates,
);

//  GET Distance & Time
router.get(
  "/get-distance-time",

  authMiddleware.authUser,
[
  query("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Origin must be at least 3 characters long"),

  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination must be at least 3 characters long")],

  mapController.getDistanceTime,
);

 // GET Suggestions
router.get(
  "/get-suggestions",
  // authMiddleware.authUser,
  [
  query("input")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Input must be at least 3 characters long")],
  mapController.getAutoCompleteSuggestions
);

module.exports = router;
