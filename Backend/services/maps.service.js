const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
        },
        headers: {
          "User-Agent": "uber-clone-app",
        },
      },
    );

    if (response.data.length > 0) {
      return {
        ltd: parseFloat(response.data[0].lat),
        lng: parseFloat(response.data[0].lon),
      };
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error("❌ getAddressCoordinate Error:", error.message);
    throw new Error("Unable to fetch coordinates");
  }
};

//  GET DISTANCE & TIME
module.exports.getDistanceTime = async (origin, destination) => {
  try {
    // Convert both to coordinates first
    const start = await module.exports.getAddressCoordinate(origin);
    const end = await module.exports.getAddressCoordinate(destination);

    const url = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.ltd};${end.lng},${end.ltd}?overview=false`;

    const response = await axios.get(url);

    const route = response.data.routes[0];
    if (!response.data.routes || response.data.routes.length === 0) {
      throw new Error("No route found");
    }

    return {
      distance: {
        text: (route.distance / 1000).toFixed(2) + " km",
        value: route.distance,
      },
      duration: {
        text: Math.round(route.duration / 60) + " mins",
        value: route.duration,
      },
    };
  } catch (error) {
    console.error("❌ OSRM Error:", error.message);
    throw new Error("Unable to fetch distance and time");
  }
};


//  GET AUTO COMPLETE SUGGESTIONS
module.exports.getAutoCompleteSuggestions = async (input) => {
  try {

     await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: input,            // 🔥 search text
          format: "json",
          addressdetails: 1,   // optional (gives more info)
          limit: 5,            // 🔥 only 5 suggestions (Uber-like)
        },
        headers: {
  "User-Agent": "uber-clone-app (harshp6768@example.com)",
},
      }
    );

    if (!response.data || response.data.length === 0) {
  console.log("⚠️ No suggestions found");
  return [];
}

    //  FORMAT RESPONSE (IMPORTANT)
    const suggestions = response.data.map((place) => ({
      name: place.display_name,   // full readable address
      ltd: parseFloat(place.ltd),
      lng: parseFloat(place.lng),
    }));

    return suggestions;

  } catch (error) {
  console.error("❌ FULL NOMINATIM ERROR:", error.response?.data || error.message);
  throw new Error("Unable to fetch auto suggestions");
}
};

// GET CAPTAINS NEARBY
module.exports.getCaptainsNearby = async (ltd, lng, radius) => {
  //radius in km
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd,lng], radius / 6371], // radius in radians (Earth's radius in kms)
      }
    }
  });

  return captains;
};