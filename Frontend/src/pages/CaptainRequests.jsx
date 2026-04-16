import React, { useState, useEffect } from "react";
import { FaPowerOff, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSocket } from "../context/SocketContext";

const CaptainRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const rides = location.state?.rides || [];

  // 🔥 FORMAT RIDES SAFELY
  useEffect(() => {
    if (rides.length > 0) {
      const formatted = rides.map((ride) => ({
        id: ride._id,

        // ✅ SAFE CUSTOMER NAME
        customer: ride.user
          ? ride.user.fullname.firstname + " " + ride.user.fullname.lastname
          : "Guest",

        pickup: ride.pickup,
        drop: ride.destination,
        price: ride.fare,
        distance: ride.distance,

        // ✅ FIX TIME ISSUE
        time: ride.duration || ride.time || "N/A",
      }));

      setRequests(formatted);
    }
  }, [rides]);

  // ✅ ACCEPT RIDE
  const handleAccept = async (id) => {
    const token = localStorage.getItem("captainToken");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Ride Accepted:", res.data);

      toast.success("Ride Accepted 🚗");

      // const selectedRide = requests.find((r) => r.id === id);
      // const selectedRide = rides.find((r) => r._id === id);
      const selectedRide = rides.find((r) => r._id === id);

      setRequests([]);

      setTimeout(() => {
        navigate("/captain/confirm", {
          state: { ride: selectedRide },
        });
      }, 1500);
    } catch (err) {
      console.log("❌ Confirm Ride Error:", err);

      toast.error("Failed to accept ride ❌");
    }
  };

  // ❌ REJECT
  const handleReject = (id) => {
    toast.custom((t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"
          } max-w-sm w-full bg-red-500/10 border border-red-400 text-white px-5 py-4 rounded-xl shadow-lg flex items-center gap-3`}
      >
        <div className="text-xl">❌</div>
        <div>
          <p className="font-semibold">Ride Ignored</p>
          <p className="text-sm opacity-70">Looking for new requests...</p>
        </div>
      </div>
    ));

    setRequests([]);

    setTimeout(() => {
      navigate("/captain-home");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* 🔝 HEADER */}
      <div className="p-2 mb-3 flex justify-between items-center backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="flex items-center gap-3">
          <img
            src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            alt="logo"
            className="w-32 object-contain"
          />
          <h1 className="text-2xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Customer Requests
          </h1>
        </div>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-4 px-4">

        {/* 🚗 LEFT SIDE */}
        <div className="lg:col-span-2">

          

          {/* 🚗 REQUEST */}
          <h2 className="text-lg font-semibold mb-3 mt-3">
            Incoming Ride Request
          </h2>

          {requests.length === 0 ? (
            <div className="bg-white/10 px-6 py-2 rounded text-center opacity-70">
              Looking for ride requests...
            </div>
          ) : (
            requests.map((req) => (
              <div
                // key={req.id}
                key={req.id + Math.random()}
                className="bg-white/10 px-6 py-6 rounded shadow mt-3"
              >

                {/* 👤 CUSTOMER */}
                <div className="mb-4">
                  <p className="text-sm opacity-70 font-bold">Customer</p>
                  <p className="font-semibold">👤 {req.customer}</p>
                </div>

                {/* 📍 PICKUP */}
                <div className="mb-4">
                  <p className="text-sm opacity-70 font-bold">Pickup</p>
                  <p className="font-semibold">📍 {req.pickup}</p>
                </div>

                {/* 📍 DROP */}
                <div className="mb-4">
                  <p className="text-sm opacity-70 font-bold">Drop</p>
                  <p className="pl-1 font-semibold">➝ {req.drop}</p>
                </div>

                {/* 📊 INFO */}
                <div className="mb-4">
                  <p className="text-sm opacity-70 font-bold">Distance</p>
                  <span>🚗 {req.distance}</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm opacity-70 font-bold">Time</p>
                  <span>⏱ {req.time}</span>
                </div>

                {/* 💰 PRICE */}
                <div className="mb-5">
                  <div className="bg-linear-to-r from-yellow-400 to-orange-500 text-black rounded px-3 py-3 shadow-xl flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold opacity-80">
                        Ride Fare
                      </p>
                      <p className="text-2xl font-bold">
                        ₹{req.price}
                      </p>
                    </div>
                    <div className="text-3xl">₹</div>
                  </div>
                </div>

                {/* 🎯 ACTIONS */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="flex-1 bg-green-500 py-2 rounded font-semibold hover:bg-green-600"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(req.id)}
                    className="flex-1 bg-red-500 py-2 rounded font-semibold hover:bg-red-600"
                  >
                    Ignore
                  </button>
                </div>

              </div>
            ))
          )}

        </div>

        {/* 🗺️ RIGHT SIDE */}
        <div className="flex-1 px-1 mr-4">
          <div className="w-full h-full rounded overflow-hidden shadow-2xl border">
            <iframe
              src="https://www.google.com/maps?q=Ahmedabad&output=embed"
              className="w-full h-full border-0"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CaptainRequests;