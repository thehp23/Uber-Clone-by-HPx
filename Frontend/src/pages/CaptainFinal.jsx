import React, { useState, useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSocket } from "../context/SocketContext"; // ✅ ADD

const CaptainFinal = () => {
  const [online, setOnline] = useState(true);
  const navigate = useNavigate();
  const { socket } = useSocket(); // ✅ ADD

  const location = useLocation();
  const storedRide = localStorage.getItem("currentRide");

  const ride =
    location.state?.ride ||
    (storedRide ? JSON.parse(storedRide) : null);

  console.log("🔥 FINAL PAGE RIDE:", ride);

  // ✅ PAYMENT STATE
  const [paymentStatus, setPaymentStatus] = useState(
    ride?.paymentStatus || "pending"
  );

  // ✅ SOCKET LISTENER
  useEffect(() => {
    if (!socket) return;

    socket.on("payment-success", () => {
      console.log("💰 Payment received");

      setPaymentStatus("paid");

      toast.success("Payment received ✅");
    });

    return () => socket.off("payment-success");
  }, [socket]);

  // ✅ SAFETY CHECK
  if (!ride) {
    return <div className="text-white p-5">No ride data found</div>;
  }

  console.log("🔥 FINAL RIDE DATA:", ride);

  const handleFinishRide = async () => {
    const token = localStorage.getItem("captainToken");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/finish`,
        { rideId: ride._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("🔥 FULL RESPONSE:", res.data);

      const updatedRide = res.data.ride;

      localStorage.setItem("currentRide", JSON.stringify(updatedRide));

      navigate("/captain-home", {
  state: { completedRide: updatedRide },
});

      // ✅ CORRECT MESSAGE
     toast.success("Ride Completed Successfully ✅");

    } catch (err) {
      console.log("❌ Finish Ride Error:", err);
    }
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
            Ongoing Ride
          </h1>
        </div>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-4 px-4">

        {/* 🚗 LEFT SIDE */}
        <div className="lg:col-span-2 min-h-100 ">

          <div className="bg-white/10 p-6 mt-5 rounded shadow min-h-150">

            {/* 👤 CUSTOMER */}
            <div className="mb-4">
              <p className="text-sm opacity-70 font-bold">Customer</p>
              <p className="font-semibold">
                👤 {
                  ride?.user?.fullname
                    ? ride.user.fullname.firstname + " " + ride.user.fullname.lastname
                    : ride?.customer || "Customer"
                }
              </p>
            </div>

            {/* 📍 PICKUP */}
            <div className="mb-4">
              <p className="text-sm opacity-70 font-bold">Pickup</p>
              <p className="font-semibold">📍 {ride?.pickup || "N/A"}</p>
            </div>

            {/* 📍 DROP */}
            <div className="mb-4">
              <p className="text-sm opacity-70 font-bold">Drop</p>
              <p className="font-semibold">➝ {ride?.destination || "N/A"}</p>
            </div>

            {/* 🚗 DISTANCE LEFT */}
            <div className="mb-5">
              <div className="bg-blue-500/20 border border-blue-400 p-4 rounded flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-70">Distance Left</p>
                  <p className="text-xl font-bold">
                    {ride?.distanceLeft || "Calculating..."}
                  </p>
                </div>
                <div className="text-2xl">📍</div>
              </div>
            </div>

            {/* 💰 PRICE */}
            <div className="mb-5">
              <div className="bg-linear-to-r from-yellow-400 to-orange-500 text-black rounded px-3 py-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">Fare</p>
                  <p className="text-2xl font-bold">
                    ₹{ride?.fare || ride?.price || 0}
                  </p>
                </div>
                <div className="text-3xl font-bold">₹</div>
              </div>
            </div>

            {/* 💳 PAYMENT STATUS (NEW LOGIC, UI SAFE) */}
            <div className="mb-5">
              {paymentStatus === "pending" && (
                <div className="bg-yellow-500/20 border border-yellow-400 p-3 rounded text-center">
                  Waiting for user payment...
                </div>
              )}

              {paymentStatus === "paid" && (
                <div className="bg-green-500/20 border border-green-400 p-3 rounded text-center">
                  Payment received ✅
                </div>
              )}
            </div>

            {/* ✅ FINISH BUTTON */}
            <button
  onClick={handleFinishRide}
  disabled={paymentStatus !== "paid"}
  className={`w-full py-3 rounded font-semibold transition
    ${
      paymentStatus !== "paid"
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600"
    }
  `}
>
  {paymentStatus !== "paid"
    ? "Waiting for Payment..."
    : "Finish Ride ✅"}
</button>

          </div>

        </div>

        {/* 🗺️ RIGHT SIDE */}
        <div className="flex-1 px-1 mr-4 mt-5">
          <div className="w-full h-full rounded overflow-hidden shadow-2xl border">
            <iframe
              src="https://www.google.com/maps?q=Ahmedabad&output=embed"
              className="w-full h-full border-0 min-h-150"
            />
          </div>
        </div>

      </div>

    </div>
  );
};

export default CaptainFinal;