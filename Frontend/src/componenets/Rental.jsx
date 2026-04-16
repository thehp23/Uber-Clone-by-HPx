import React, { useRef, useEffect, useState } from "react";
import LocationPanel from "./LocationPanel";
import { useNavigate } from "react-router-dom";
import { useRental } from "../context/RentalContext";

import { FaCircle, FaMapMarkerAlt, FaClock, FaUser } from "react-icons/fa";

const Rental = () => {

  const navigate = useNavigate();

  const {
    pickup, setPickup,
    drop, setDrop,
    time, setTime,
    riderType, setRiderType
  } = useRental();

  const [showRiderModal, setShowRiderModal] = useState(false);
  const [showPickupPanel, setShowPickupPanel] = useState(false);
  const [showDropPanel, setShowDropPanel] = useState(false);

  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickupRef.current && !pickupRef.current.contains(e.target)) {
        setShowPickupPanel(false);
      }
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setShowDropPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-64px)] ">

      {/* LEFT PANEL */}
      <div className="w-98 bg-white mx-5 mb-22 px-7 py-8 shadow-2xl rounded overflow-y-auto border">

        <h2 className="text-2xl font-bold mb-5">Book Rentals</h2>

        {/* PICKUP */}
        <div className="relative mb-4" ref={pickupRef}>
          <div className="flex items-center bg-gray-100 rounded px-3 py-4 hover:bg-gray-200 focus-within:ring-2 ring-black transition">
            <FaCircle className="text-black text-xs mr-2" />
            <input
              type="text"
              placeholder="Pickup location"
              value={pickup}
              onFocus={() => setShowPickupPanel(true)}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          {showPickupPanel && (
            <LocationPanel
              setValue={setPickup}
              closePanel={() => setShowPickupPanel(false)}
            />
          )}
        </div>

        {/* DROP */}
        <div className="relative mb-4" ref={dropRef}>
          <div className="flex items-center bg-gray-100 rounded px-3 py-4 hover:bg-gray-200 focus-within:ring-2 ring-black transition">
            <FaMapMarkerAlt className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Dropoff location"
              value={drop}
              onFocus={() => setShowDropPanel(true)}
              onChange={(e) => setDrop(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
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
        <div className="mb-4">
          <div className="flex items-center bg-gray-100 rounded px-3 py-4 hover:bg-gray-200 focus-within:ring-2 ring-black transition">
            <FaClock className="text-gray-500 mr-2" />
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            >
              <option>Pickup now</option>
              <option>Schedule for later</option>
            </select>
          </div>
        </div>

        {/* RIDER */}
        <div
          onClick={() => setShowRiderModal(true)}
          className="mb-5 flex items-center justify-between bg-gray-100 rounded px-3 py-2.5 cursor-pointer hover:bg-gray-200 transition"
        >
          <div className="flex items-center">
            <FaUser className="text-gray-500 mr-2" />
            <span className="text-sm">
              {riderType === "me" ? "For me" : "For someone else"}
            </span>
          </div>
          <span className="text-gray-400 text-3xl">›</span>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/rental/hours")}
          className="w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-800 active:scale-95 transition"
        >
          Search
        </button>

      </div>

      {/* RIGHT MAP */}
      <div className="flex-1 px-1 mr-4">
        <div className="w-full h-[86.5%] rounded overflow-hidden shadow-2xl border">
          <iframe
            src="https://www.google.com/maps?q=Ahmedabad&output=embed"
            className="w-full h-full border-0"
          />
        </div>
      </div>

      {/* MODAL */}
      {showRiderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-2xl shadow-2xl">

            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-lg">Choose a rider</h2>
              <button onClick={() => setShowRiderModal(false)}>✕</button>
            </div>

            <div className="p-4 space-y-3">
              <div
                onClick={() => setRiderType("me")}
                className={`p-3 rounded-lg cursor-pointer border ${riderType === "me"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                  }`}
              >
                Me
              </div>

              <div
                onClick={() => setRiderType("other")}
                className={`p-3 rounded-lg cursor-pointer border ${riderType === "other"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                  }`}
              >
                For someone else
              </div>
            </div>

            <div className="p-4">
              <button
                onClick={() => setShowRiderModal(false)}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Rental;