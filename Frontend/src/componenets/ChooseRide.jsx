import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LocationPanel from "./LocationPanel";
import {
  FaCircle,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaArrowLeft,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const ChooseRide = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    pickup: initialPickup,
    destination: initialDrop,
    time: initialTime,
  } = location.state || {};

  const [pickup, setPickup] = useState(initialPickup || "");
  const [drop, setDrop] = useState(initialDrop || "");
  const [time, setTime] = useState(initialTime || "Pickup now");

  const [selectedRide, setSelectedRide] = useState("");
  const [fare, setFare] = useState(null);

  const [showPickupPanel, setShowPickupPanel] = useState(false);
  const [showDropPanel, setShowDropPanel] = useState(false);

  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  // ✅ FETCH FARE
  useEffect(() => {
    const fetchFare = async () => {
      try {
        const token = localStorage.getItem("userToken");

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
          {
            params: {
              pickup,
              destination: drop,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFare(res.data.fare);
        console.log("✅ FULL RESPONSE:", res.data);
      } catch (err) {
        console.log("❌ Fare error:", err.response?.data || err.message);
      }
    };

    if (pickup && drop) fetchFare();
  }, [pickup, drop]);

  // CLOSE PANELS
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target)) {
        setShowPickupPanel(false);
      }
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setShowDropPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ 🔥 MAIN FIX (REQUEST RIDE HERE)
  const handleRequestRide = async () => {
    if (!selectedRide) {
      alert("Please select a ride first");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination: drop,
          vehicleType: selectedRide,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Ride Created:", res.data);

      // ✅ Navigate AFTER creating ride
      navigate("/ride/searching", {
        state: {
          rideId: res.data.ride._id, // 🔥 important
          pickup,
          drop,
          vehicleType: selectedRide,
          price: fare?.[selectedRide],
        },
      });

    } catch (error) {
      console.log("❌ Ride Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">

      {/* LEFT PANEL */}
      <div className="w-96 bg-white p-5 shadow-2xl rounded flex flex-col mx-4 mb-20 gap-4">

        <button
          onClick={() => navigate("/ride")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition mb-4"
        >
          <FaArrowLeft />
        </button>

        <h2 className="text-2xl font-bold text-gray-800">Edit Ride</h2>

        {/* PICKUP */}
        <div className="relative" ref={pickupRef}>
          <div className="flex items-center bg-gray-100 rounded px-3">
            <FaCircle className="text-black text-xs mr-2" />
            <input
              type="text"
              value={pickup}
              placeholder="Pickup location"
              onFocus={() => setShowPickupPanel(true)}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full p-3 bg-transparent outline-none"
            />
          </div>

          {showPickupPanel && (
            <LocationPanel
              setValue={setPickup}
              closePanel={() => setShowPickupPanel(false)}
            />
          )}
        </div>

        {/* DROPOFF */}
        <div className="relative" ref={dropRef}>
          <div className="flex items-center bg-gray-100 rounded px-3">
            <FaMapMarkerAlt className="text-gray-600 mr-2" />
            <input
              type="text"
              value={drop}
              placeholder="Dropoff location"
              onFocus={() => setShowDropPanel(true)}
              onChange={(e) => setDrop(e.target.value)}
              className="w-full p-3 bg-transparent outline-none"
            />
          </div>

          {showDropPanel && (
            <LocationPanel
              setValue={setDrop}
              closePanel={() => setShowDropPanel(false)}
            />
          )}
        </div>

        {/* TIME */}
        <div className="flex items-center bg-gray-100 rounded px-3">
          <FaClock className="text-gray-500 mr-2" />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 bg-transparent outline-none"
          >
            <option>Pickup now</option>
            <option>Schedule for later</option>
          </select>
        </div>

        {/* RIDER */}
        <div className="flex items-center bg-gray-100 rounded px-3 py-3 text-gray-700">
          <FaUser className="mr-2" />
          For me
        </div>
      </div>

      {/* MIDDLE PANEL */}
      <div className="w-96 bg-white px-6 py-6 ml-1 mr-4 mb-20 border rounded shadow-2xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose A Ride</h2>

        {/* AUTO */}
        <div
          onClick={() => setSelectedRide("auto")}
          className={`flex items-center justify-between p-4 mb-4 rounded-xl cursor-pointer ${
            selectedRide === "auto"
              ? "border-2 border-green-600 bg-green-50"
              : "border border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYZNGPspo5yDiYR9DP05wsjLh1skE79Jfng&s" className="w-12" />
            <div>
              <p className="font-semibold">Auto</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <FaUsers /> 3
              </p>
              <p className="text-xs text-gray-400">4 mins away</p>
            </div>
          </div>
          <span>₹{fare?.auto ? Math.round(fare.auto) : "--"}</span>
        </div>

        {/* MOTORCYCLE */}
        <div
          onClick={() => setSelectedRide("motorcycle")}
          className={`flex items-center justify-between p-4 mb-4 rounded-xl cursor-pointer ${
            selectedRide === "motorcycle"
              ? "border-2 border-yellow-500 bg-yellow-50"
              : "border border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" className="w-12" />
            <div>
              <p className="font-semibold">Motorcycle</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <FaUsers /> 1
              </p>
              <p className="text-xs text-gray-400">5 mins away</p>
            </div>
          </div>
          <span>₹{fare?.motorcycle ? Math.round(fare.motorcycle) : "--"}</span>
        </div>

        {/* CAR */}
        <div
          onClick={() => setSelectedRide("car")}
          className={`flex items-center justify-between p-4 mb-4 rounded-xl cursor-pointer ${
            selectedRide === "car"
              ? "border-2 border-blue-600 bg-blue-50"
              : "border border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mNzI4MTEyMC1jYzFhLTRmZDQtODRkMS1mNWRmMmIzZjUxOGYuanBn" className="w-12" />
            <div>
              <p className="font-semibold">Car</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <FaUsers /> 4
              </p>
              <p className="text-xs text-gray-400">3 mins away</p>
            </div>
          </div>
          <span>₹{fare?.car ? Math.round(fare.car) : "--"}</span>
        </div>

        {/* BUTTON */}
        <div className="mt-auto bg-gray-100 p-3 rounded-lg flex justify-between items-center">
          <button
            onClick={() => alert("Cash selected")}
            className="flex items-center gap-2 text-gray-800 font-medium"
          >
            💳 Cash
          </button>

          <button
            onClick={handleRequestRide}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Request {selectedRide || "Ride"}
          </button>
        </div>
      </div>

      {/* MAP */}
       <div className="flex-1 px-1 mr-2">
        <div className="w-full h-[88.5%] rounded mb-4 overflow-hidden shadow-2xl border">
          <iframe
            src="https://www.google.com/maps?q=Ahmedabad&output=embed"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseRide;