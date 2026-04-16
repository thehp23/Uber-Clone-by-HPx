import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationPanel from "./LocationPanel";
import { FaCircle, FaMapMarkerAlt, FaClock, FaUser } from "react-icons/fa";
import axios from "axios";
import { useSocket } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserCont";

const Ride = () => {
  const navigate = useNavigate();

  const [showRiderModal, setShowRiderModal] = useState(false);
  const [riderType, setRiderType] = useState("me");

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [time, setTime] = useState("Pickup now");

  const [showPickupPanel, setShowPickupPanel] = useState(false);
  const [showDropPanel, setShowDropPanel] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);

  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDrop, setLoadingDrop] = useState(false);

  const debounceRef = useRef(null);

  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  const { socket } = useSocket();
  const token = localStorage.getItem("userToken");
  const { user, isLoading } = useContext(UserDataContext);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading]);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSuggestions = (input, type) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (!input || input.length < 3) return;

      try {
        if (type === "pickup") setLoadingPickup(true);
        else setLoadingDrop(true);

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${input}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (type === "pickup") {
          setPickupSuggestions(res.data.data || []);
        } else {
          setDropSuggestions(res.data.data || []);
        }
      } catch (err) {
        console.log("❌ ERROR:", err.response?.data || err.message);
      } finally {
        if (type === "pickup") setLoadingPickup(false);
        else setLoadingDrop(false);
      }
    }, 500);
  };

  // ✅ ONLY NAVIGATION
  const handleSubmit = (e) => {
    e.preventDefault();

    const rideData = {
      pickup,
      destination: drop,
      time,
      riderType, // 🔥 ADDED
      userId: user?._id || "",
      userName: user?.fullname?.firstname
        ? user.fullname.firstname + " " + user.fullname.lastname
        : "Guest",
    };

    console.log("🚀 NAVIGATE ONLY:", rideData);

    navigate("/ride/choose-ride", {
      state: rideData,
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <div className="w-98 bg-white mx-5 mb-22 px-7 py-8 shadow-2xl rounded overflow-y-auto border">
        <h2 className="text-2xl font-bold mb-5">Get a ride</h2>

        <form onSubmit={handleSubmit}>
          {/* PICKUP */}
          <div className="relative mb-4" ref={pickupRef}>
            <div className="flex items-center bg-gray-100 rounded px-3 py-4">
              <FaCircle className="text-black text-xs mr-2" />
              <input
                type="text"
                placeholder="Pickup location"
                value={pickup}
                onFocus={() => setShowPickupPanel(true)}
                onChange={(e) => {
                  setPickup(e.target.value);
                  fetchSuggestions(e.target.value, "pickup");
                }}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            {loadingPickup && <div className="absolute right-3 top-3">⏳</div>}

            {showPickupPanel && (
              <LocationPanel
                suggestions={pickupSuggestions}
                setValue={setPickup}
                closePanel={() => setShowPickupPanel(false)}
              />
            )}
          </div>

          {/* DROP */}
          <div className="relative mb-4" ref={dropRef}>
            <div className="flex items-center bg-gray-100 rounded px-3 py-4">
              <FaMapMarkerAlt className="text-gray-600 mr-2" />
              <input
                type="text"
                placeholder="Dropoff location"
                value={drop}
                onFocus={() => setShowDropPanel(true)}
                onChange={(e) => {
                  setDrop(e.target.value);
                  fetchSuggestions(e.target.value, "drop");
                }}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            {loadingDrop && <div className="absolute right-3 top-3">⏳</div>}

            {showDropPanel && (
              <LocationPanel
                suggestions={dropSuggestions}
                setValue={setDrop}
                closePanel={() => setShowDropPanel(false)}
              />
            )}
          </div>

          {/* TIME */}
          <div className="mb-4">
            <div className="flex items-center bg-gray-100 rounded px-3 py-4">
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

          {/* 🔥 RIDER (RESTORED) */}
          <div
            onClick={() => setShowRiderModal(true)}
            className="mb-5 flex items-center justify-between bg-gray-100 rounded px-3 py-3 cursor-pointer hover:bg-gray-200 transition"
          >
            <div className="flex items-center">
              <FaUser className="text-gray-500 mr-2" />
              <span className="text-sm">
                {riderType === "me" ? "For me" : "For someone else"}
              </span>
            </div>
            <span className="text-gray-400 text-2xl">›</span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded font-semibold"
          >
            Search
          </button>
        </form>
      </div>
       {/* RIGHT MAP */}
      <div className="flex-1 px-1 mr-4">
        <div className="w-full h-[87.5%] rounded overflow-hidden shadow-2xl border">
          <iframe
            src="https://www.google.com/maps?q=Ahmedabad&output=embed"
            className="w-full h-full border-0"
          />
        </div>
      </div>

      {/* 🔥 MODAL (RESTORED) */}
      {showRiderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-xl shadow-2xl">

            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-lg">Choose a rider</h2>
              <button onClick={() => setShowRiderModal(false)}>✕</button>
            </div>

            <div className="p-4 space-y-3">
              <div
                onClick={() => setRiderType("me")}
                className={`p-3 rounded cursor-pointer border ${
                  riderType === "me"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                Me
              </div>

              <div
                onClick={() => setRiderType("other")}
                className={`p-3 rounded cursor-pointer border ${
                  riderType === "other"
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
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
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

export default Ride;