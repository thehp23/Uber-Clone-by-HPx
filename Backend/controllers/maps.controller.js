const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service.js");

//  GET COORDINATES
module.exports.getCoordinates = async (req, res) => {
  // ✅ VALIDATION CHECK
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinate(address);

    return res.status(200).json({
      success: true,
      data: coordinates,
    });
  } catch (error) {
    console.error("❌ Controller Error (Coordinates):", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch coordinates",
    });
  }
};

//  GET DISTANCE & TIME
module.exports.getDistanceTime = async (req, res) => {
  // ✅ VALIDATION CHECK
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { origin, destination } = req.query;

  try {
    const distanceTime = await mapService.getDistanceTime(origin, destination);

    return res.status(200).json({
      success: true,
      data: distanceTime,
    });
  } catch (error) {
    console.error("❌ Controller Error (DistanceTime):", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch distance and time",
    });
  }
};


//Get Auto Suggestions

module.exports.getAutoCompleteSuggestions = async (req,res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      success : false,
      errors : errors.array()
    })
  }

  const { input } = req.query;

  try {
    const autoCompleteSuggestions = await mapService.getAutoCompleteSuggestions(input);

    return res.status(200).json({
      success: true,
      data: autoCompleteSuggestions,
    });
  } catch (error) {
    console.error("❌ Controller Error (autoCompleteSuggestions):", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch auto suggestions",
    });
  }
}
