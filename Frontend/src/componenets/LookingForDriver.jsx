import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCircle, FaSquare, FaCar, FaMotorcycle } from "react-icons/fa";
import { useSocket } from "../context/SocketContext";

const LookingForDriver = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useSocket();

  // ✅ GET DATA FROM ChooseRide
  const { pickup, drop, price, vehicleType } = location.state || {};

  // ✅ DRIVER STATE
  const [showDriver, setShowDriver] = useState(false);
  const [captainData, setCaptainData] = useState(null);
  const [rideData, setRideData] = useState(null); // 🔥 ADD THIS

  // ✅ OTP STATE (ADDED)
  const [otp, setOtp] = useState("");

  const [progress, setProgress] = useState(30); // start at 30%

  // ✅ VEHICLE UI DATA
  const rideDetails = {
    auto: {
      name: "Auto",
      icon: "🛺",
    },
    car: {
      name: "Car",
      icon: <FaCar />,
    },
    motorcycle: {
      name: "Motorcycle",
      icon: <FaMotorcycle />,
    },
  };

  const selectedRide = rideDetails[vehicleType] || {};

  // ✅ SOCKET LISTENER (REAL DATA FROM BACKEND)
  useEffect(() => {
    if (!socket) return;

    socket.on("ride-confirmed", (data) => {
  console.log("🚗 Driver Received:", data);

  setCaptainData(data.captain);
  setShowDriver(true);

  setOtp(data.ride?.otp);

  setProgress(100);

  // 🔥 ADD THIS (STORE RIDE DATA)
  setRideData(data.ride);


});

    return () => {
      socket.off("ride-confirmed");
    };
  }, [socket]);

  // ✅ FALLBACK TIMER (if socket delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDriver(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showDriver) return; // stop when driver found

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // don't go full
        return prev + 10;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [showDriver]);

  // ✅ DRIVER DATA
  const captainName = captainData?.name || "Searching...";
  const captainVehicle = captainData?.vehicle || "";
  const vehicleNumber = captainData?.vehicleNumber || "";
  const captainRating = captainData?.rating || "";
  const captainAvatar =
    captainData?.avatar || "https://i.pravatar.cc/100";

  return (
    <div className="flex min-h-[calc(100vh-64px)] ">

      {/* LEFT PANEL */}
      <div className="w-96 bg-white mx-5 mb-20 px-7 py-3 rounded border shadow-2xl flex flex-col">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Ride Requested
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          Finding Drivers Nearby
        </p>

        {/* VEHICLE */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-xl">
            {selectedRide.icon}
          </div>
          <p className="font-semibold text-gray-800">
            {selectedRide.name || "Ride"}
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-1 bg-gray-200 rounded mb-6">
          <div
            className={`h-1 rounded transition-all duration-500 ${
              showDriver ? "bg-green-500" : "bg-blue-500 animate-pulse"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* ROUTE */}
        <div className="flex gap-3 mb-3">

          <div className="flex flex-col items-center mt-2">
            <FaCircle className="text-black text-xs" />
            <div className="w-0.5 h-10 bg-gray-300"></div>
            <FaSquare className="text-black text-xs" />
          </div>

          <div className="flex flex-col gap-2 ">

            <div className="leading-tight">
              <p className="text-gray-800 font-light">
                Meet at the pickup point for
              </p>
              <p className="text-gray-800 font-semibold mb-1.5">
                {pickup || ""}
              </p>
            </div>

            <div>
              <p className="text-gray-800 font-semibold">
                {drop || ""}
              </p>
            </div>

          </div>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl font-bold">
            ₹{price ? Math.round(price) : "33"}
          </div>
          <span className="text-gray-500 text-sm"></span>
        </div>

        {/* ✅ DRIVER INFO */}
        {showDriver && (
          <div className="mb-3 p-4 rounded-xl bg-linear-to-r from-gray-50 to-gray-100 shadow-lg border flex items-center gap-4">

            {/* IMAGE */}
            <div className="relative">
              <img
                src={captainAvatar}
                alt="driver"
                className="w-16 h-16 rounded-full border-2 border-green-500"
              />
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* DETAILS */}
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-lg">
                {captainName}
              </p>

              <p className="text-sm text-gray-500">
                🚗 {captainVehicle}
              </p>
              <p className="text-sm text-gray-500">
                {vehicleNumber}
              </p>

              <p className="text-yellow-500 font-semibold text-sm">
                ⭐ {captainRating}
              </p>
            </div>

            {/* STATUS */}
            <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Arriving
            </div>

          </div>
        )}

        {/* 🔐 OTP DISPLAY (ADDED) */}
        {showDriver && otp && (
          <div className="mb-1 p-1 rounded-xl bg-green-50 border border-green-400 shadow text-center">

            <p className="text-sm text-gray-600 mb-2">
              Share this OTP with Driver
            </p>

            <div className="text-3xl font-bold tracking-widest text-green-600">
              {otp}
            </div>

          </div>
        )}

{/* 💳 PAYMENT BUTTON */}
{showDriver && rideData && (
  <button
    onClick={() =>
      navigate("/payment", {
        state: {
          rideId: rideData?._id,
          amount: rideData?.fare || price,
        },
      })
    }
    className="w-full mt-2 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
  >
    Proceed to Payment 💳
  </button>
)}

        {/* CANCEL BUTTON */}
        <button
          onClick={() => navigate("/ride/choose-ride")}
          className="mt-2 bg-gray-100 text-red-500 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Cancel ride
        </button>

      </div>

      {/* MAP */}
      <div className="flex-1 px-1 mr-6">
        <div className="w-full h-[88.5%] rounded overflow-hidden shadow-2xl border">
          <iframe
            src="https://www.google.com/maps?q=Ahmedabad&output=embed"
            className="w-full h-full border-0"
          />
        </div>
      </div>

    </div>
  );
};

export default LookingForDriver;