import React, { useContext, useState, useEffect } from "react";
import { FaCar, FaStar, FaPowerOff, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from '../context/CaptainCont'
import { useSocket } from "../context/SocketContext";
import { useLocation } from "react-router-dom";

const CaptainHome = () => {
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useSocket();
  const [rideRequests, setRideRequests] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);

  // ✅ NEW STATE (ONLY ADDED)
  const [onlineSeconds, setOnlineSeconds] = useState(0);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.completedRide) {
      setCompletedRides((prev) => [
        location.state.completedRide,
        ...prev,
      ]);
    }
  }, [location.state]);

  useEffect(() => {
    if (captain?.socketId) {
      console.log("Captain Socket ID:", captain.socketId);
    }
  }, [captain?.socketId]);

  const [online, setOnline] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (captain?.socketId) {
      console.log("Captain Socket ID:", captain.socketId);
    }
  }, [captain?.socketId]);

  useEffect(() => {
    if (!online || !socket || !captain?._id) return;

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        socket.emit("update-location-captain", {
          userId: captain._id,
          location: {
            ltd: latitude,
            lng: longitude,
          },
        });
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [online, socket, captain?._id]);

  useEffect(() => {
  if (!socket) return;

  // const handleNewRide = (data) => {
  //   console.log("📩 New Ride Request Received:", data);

  //   // ✅ store multiple requests
  //   setRideRequests((prev) => [data, ...prev]);

  //   // ❌ DON'T navigate here
  // };
  const handleNewRide = (data) => {
  setRideRequests((prev) => {
    // ❌ prevent duplicate ride
    const exists = prev.some((ride) => ride._id === data._id);
    if (exists) return prev;

    return [data, ...prev];
  });
};

  socket.on("new-ride", handleNewRide);

  return () => {
    socket.off("new-ride", handleNewRide);
  };
}, [socket]);

  // ✅ ONLINE TIMER (ONLY ADDED)
  useEffect(() => {
    let interval;

    if (online) {
      interval = setInterval(() => {
        setOnlineSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [online]);

  // ✅ CALCULATIONS (ONLY ADDED)
  const totalEarnings = completedRides.reduce(
    (sum, ride) => sum + (ride.fare || 0),
    0
  );

  const totalRides = completedRides.length;

  const onlineHours = (onlineSeconds / 3600).toFixed(1);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* 🔝 HEADER */}
      <div className="p-2 mb-3 flex justify-between items-center backdrop-blur-lg bg-white/10 border-b border-white/20">

        {/* 🖼️ LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            alt="logo"
            className="w-32 object-contain hover:scale-105 transition duration-300"
          />
          <h1 className="text-2xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Captain Dashboard
          </h1>
        </div>

        {/* 🔘 ONLINE BUTTON */}
        <button
          onClick={() => setOnline(!online)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${
            online
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-gray-600"
          }`}
        >
          <FaPowerOff />
          {online ? "Online" : "Offline"}
        </button>
      </div>

      {/* 👤 PROFILE */}
      <div className="mx-4 my-2 px-3 py-1 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl flex items-center gap-4 hover:scale-[1.02] transition duration-300">
        <img
          src="https://i.pravatar.cc/100"
          alt="captain"
          className="w-16 h-16 rounded-full border-2 border-white"
        />
        <div>
          <p className="text-lg font-bold">
           {captain?.fullname?.firstname || "captain"} {captain?.fullname?.lastname || ""}
          </p>
          <p className="text-sm opacity-70">Driver ID: CAP12345</p>
          <p className="text-yellow-400 flex items-center gap-1 text-sm mt-1">
            <FaStar /> 4.8 Rating
          </p>
        </div>
      </div>

      {/* 🚗 VEHICLE (UPDATED) */}
      <div className="mx-4  px-3 py-1 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl flex justify-between items-center hover:scale-[1.02] transition duration-300">
        <div>
          <p className="text-sm opacity-70">Vehicle</p>
          <p className="font-semibold">
            {captain?.vehicle?.vehicleType || "N/A"} • {captain?.vehicle?.plate || "N/A"}
          </p>
          <p className="text-xs opacity-60">
            Color: {captain?.vehicle?.color || "N/A"} | Capacity: {captain?.vehicle?.capacity || "N/A"}
          </p>
        </div>
        <FaCar className="text-2xl" />
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-3 gap-3 px-4 py-2 ">
        {[
          { title: "Earnings", value: `₹${totalEarnings}` },
          { title: "Rides", value: totalRides },
          { title: "Online", value: `${onlineHours} hr` },
        ].map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-lg text-center hover:scale-105 hover:shadow-2xl transition duration-300"
          >
            <p className="text-sm opacity-70">{item.title}</p>
            <p className="text-xl font-bold mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* 📍 LOCATION */}
      <div className="mx-4 p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl flex items-center gap-3 hover:scale-[1.02] transition duration-300">
        <FaMapMarkerAlt className="text-red-400 text-xl" />
        <div>
          <p className="text-sm opacity-70">Current Location</p>
          <p className="font-semibold">Ahmedabad</p>
        </div>
      </div>

      {/* 🚗 RECENT RIDES */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          Recent Rides
        </h2>

        {completedRides.map((ride, index) => (
          <div
            key={index}
            className="px-4 py-1 rounded-xl bg-white/10 mb-3 flex justify-between"
          >
            <div>
              <p className="font-medium">
                {ride.pickup} ➝ {ride.destination}
              </p>
              <p className="text-sm opacity-70">
                Completed Ride
              </p>
            </div>

            <p className="font-semibold">₹{ride.fare}</p>
          </div>
        ))}
      </div>

      {/* 🚨 NEW REQUEST ALERT */}
{rideRequests.length > 0 && (
  <div className="mx-4 p-3 my-5 rounded-xl bg-yellow-400 text-black shadow-lg animate-pulse">
    <p className="font-semibold">
      🚨 New Ride Request ({rideRequests.length})
    </p>
    <p className="text-sm">
      {rideRequests[0].pickup} ➝ {rideRequests[0].destination}
    </p>
  </div>
)}

      {/* 🎯 BUTTON */}
      <button
  onClick={() =>
    navigate("/captain/requests", {
      state: { rides: rideRequests }
    })
  }
  className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-yellow-400 to-orange-500 text-black shadow-lg hover:scale-95 hover:shadow-2xl transition duration-300"
>
  Go to Requests 🚀
</button>

    </div>
  );
};

export default CaptainHome;