import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRental } from "../context/RentalContext";
import { FaUser, FaArrowLeft } from "react-icons/fa";

const RentalChooseRide = () => {

  const navigate = useNavigate();
  const { hours } = useRental();

  const [selectedRide, setSelectedRide] = useState("");

  return (
    <div className="flex min-h-[calc(100vh-64px)] ">

      {/* ✅ LEFT PANEL (IMPROVED UI) */}
      <div className="w-96 bg-white p-5 shadow-2xl rounded flex flex-col mx-4 mb-20 gap-4">

        {/* BACK */}
        <button
          onClick={() => navigate("/rental/hours")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <FaArrowLeft />
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-800">Trip Details</h2>

        {/* INFO CARDS */}
        <div className="flex flex-col gap-3">

          {/* Duration */}
          <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center border">
            <span className="text-gray-500 text-sm">⏱ Duration</span>
            <span className="font-semibold text-gray-800">{hours} hr</span>
          </div>

          {/* Distance */}
          <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center border">
            <span className="text-gray-500 text-sm">📍 Distance</span>
            <span className="font-semibold text-gray-800">{hours * 15} km</span>
          </div>

          {/* Ride Type */}
          <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center border">
            <span className="text-gray-500 text-sm">🚗 Ride</span>
            <span className="font-semibold text-gray-800 capitalize">
              {selectedRide || "Not selected"}
            </span>
          </div>

        </div>

        {/* TOTAL SECTION */}
        <div className="bg-black text-white p-4 rounded-xl mt-2 shadow-lg">
          <p className="text-sm opacity-80">Estimated Total</p>
          <p className="text-2xl font-bold mt-1">
            ₹
            {selectedRide === "sedan"
              ? (454.65 * hours).toFixed(2)
              : selectedRide === "go"
                ? (442.05 * hours).toFixed(2)
                : selectedRide === "xl"
                  ? (649.95 * hours).toFixed(2)
                  : "0.00"}
          </p>
        </div>

      </div>

      {/* ✅ MIDDLE PANEL (SAME DESIGN AS YOUR RIDE PAGE) */}
      <div className="w-96 bg-white px-6 py-6 ml-1 mr-4 mb-20 border rounded border-black shadow-2xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose A Ride</h2>

        {/* 🚗 SEDAN */}
        <div
          onClick={() => setSelectedRide("sedan")}
          className={`flex items-center justify-between p-4 mb-4 rounded-xl cursor-pointer transition-all
          ${selectedRide === "sedan"
              ? "border-3 border-blue-600 bg-blue-50 scale-[1.02]"
              : "border border-gray-200 hover:border-blue-500"}`}
        >
          <div className="flex items-center gap-4">
            <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" className="w-20" />
            <div>
              <p className="font-bold text-gray-800">Sedan Rentals</p>
              <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                <FaUser className="text-[10px]" /> 4 • 3 min away
              </p>
              <p className="text-xs text-blue-600 mt-1 font-medium">
                Comfortable ride 🚗
              </p>
            </div>
          </div>
          <span className="font-semibold text-gray-800">
            ₹{(454.65 * hours).toFixed(2)}
          </span>
        </div>

        {/* 🚗 GO */}
        <div
          onClick={() => setSelectedRide("go")}
          className={`flex items-center justify-between p-4 mb-4 rounded-xl cursor-pointer transition-all
          ${selectedRide === "go"
              ? "border-3 border-green-600 bg-green-50 scale-[1.02]"
              : "border border-gray-200 hover:border-green-500"}`}
        >
          <div className="flex items-center gap-4">
            <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9lOTJlZWI4Zi0zNzY0LTRlMjYtOGIxNy01OTA1YTc1ZTdlODUucG5n" className="w-20" />
            <div>
              <p className="font-bold text-gray-800">Go Rentals</p>
              <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                <FaUser className="text-[10px]" /> 4 • 3 min away
              </p>
              <p className="text-xs text-green-600 mt-1 font-medium">
                Budget option 💸
              </p>
            </div>
          </div>
          <span className="font-semibold text-gray-800">
            ₹{(442.05 * hours).toFixed(2)}
          </span>
        </div>

        {/* 🚗 XL */}
        <div
          onClick={() => setSelectedRide("xl")}
          className={`flex items-center justify-between p-4 mb-4 rounded-xl cursor-pointer transition-all
          ${selectedRide === "xl"
              ? "border-3 border-purple-600 bg-purple-50 scale-[1.02]"
              : "border border-gray-200 hover:border-purple-500"}`}
        >
          <div className="flex items-center gap-4">
            <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iYWRmYjFkNi02YzJiLTQ1NTMtYjkyOS05ZmYzMmYwMmE1NWUucG5n" className="w-20" />
            <div>
              <p className="font-bold text-gray-800">XL Rentals</p>
              <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                <FaUser className="text-[10px]" /> 6 • 4 min away
              </p>
              <p className="text-xs text-purple-600 mt-1 font-medium">
                Family ride 👨‍👩‍👧‍👦
              </p>
            </div>
          </div>
          <span className="font-semibold text-gray-800">
            ₹{(649.95 * hours).toFixed(2)}
          </span>
        </div>

        {/* BUTTON */}
        <div className="mt-auto bg-gray-100 p-3 rounded-lg flex justify-between items-center">

          {/* 💳 CASH BUTTON */}
          <button
            onClick={() => alert("Cash selected")}
            className="flex items-center gap-2 text-gray-800 font-medium hover:text-black"
          >
            💳 Cash
          </button>

          {/* 🚗 REQUEST BUTTON */}
          <button
            onClick={() => {
              if (!selectedRide) {
                alert("Please select a ride first");
                return;
              }

              navigate("/rental/rental-searching", {
                state: {
                  pickup: "Current Location",
                  duration: hours,
                  rideType: selectedRide,
                  price:
                    selectedRide === "sedan"
                      ? (454.65 * hours).toFixed(2)
                      : selectedRide === "go"
                        ? (442.05 * hours).toFixed(2)
                        : (649.95 * hours).toFixed(2)
                }
              });
            }}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Request {selectedRide || "Ride"}
          </button>

        </div>

      </div>

      {/* ✅ RIGHT PANEL (MATCHED MAP STYLE) */}
      <div className="flex-1 px-1 mr-2">
        <div className="w-full h-[87.5%] rounded mb-4 overflow-hidden shadow-2xl border">
          <iframe
            src="https://www.google.com/maps?q=Ahmedabad&output=embed"
            className="w-full h-full border-0"
          />
        </div>
      </div>

    </div>
  );
};

export default RentalChooseRide;