import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axios from "axios"; // ✅ ADD

const CaptainConfirm = () => {
    const [online, setOnline] = useState(true);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate()
    const location = useLocation();
    const ride = location.state?.ride;

    // ✅ SAFETY CHECK (added)
    if (!ride) {
        return <div className="text-white p-5">No ride data found</div>;
    }

    const handleConfirm = async () => {
        console.log("API 👉", `${import.meta.env.VITE_BASE_URL}/rides/start`);
        console.log("🚀 BUTTON CLICKED");

        if (otp.trim().length !== 4) {
            toast.custom((t) => (
                <div
                    className={`${t.visible ? "animate-enter" : "animate-leave"
                        } max-w-sm w-full bg-red-500/10 border border-red-400 text-white px-5 py-4 rounded-xl shadow-lg flex items-center gap-3`}
                >
                    <div className="text-xl">❌</div>
                    <div>
                        <p className="font-semibold">Invalid OTP</p>
                        <p className="text-sm opacity-70">Please enter 4 digits</p>
                    </div>
                </div>
            ));
            return;
        }
        const token = localStorage.getItem("captainToken");

        try {

            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/start`,
                {
                    // rideId: ride._id,
                    rideId: ride._id || ride.id,
                    otp: otp
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
console.log("🔥 RESPONSE DATA:", res.data);
            // ✅ IMPORTANT: get updated ride
            // const updatedRide = res.data.ride;
            const updatedRide = res.data.ride || res.data;
            console.log("🔥 UPDATED RIDE:", updatedRide);
            localStorage.setItem("currentRide", JSON.stringify(updatedRide));
            navigate("/captain/final", {
                state: { ride: updatedRide }
            });
        } catch (err) {
            console.log("❌ Start Ride Error:", err);
        }

        toast.custom((t) => (
            <div
                className={`${t.visible ? "animate-enter" : "animate-leave"
                    } max-w-sm w-full bg-linear-to-r from-green-400 to-emerald-500 text-black px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3`}
            >
                <div className="text-2xl">🚗</div>
                <div>
                    <p className="font-bold">Ride Confirmed!</p>
                    <p className="text-sm">Starting your trip...</p>
                </div>
            </div>
        ));


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
                        Confirm Ride
                    </h1>
                </div>

            </div>

            {/* 🔥 MAIN GRID */}
            <div className="grid lg:grid-cols-3 gap-4 px-4">

                {/* 🚗 LEFT SIDE */}
                <div className="lg:col-span-2 min-h-100 ">

                    {/* 🚗 RIDE DETAILS */}
                    <div className="bg-white/10 p-6 mt-5 rounded shadow min-h-150">
                        {/* 👤 CUSTOMER */}
                        <div className="mb-4">
                            <p className="text-sm opacity-70 font-bold">Customer</p>
                            <p className="font-semibold">
                                {/* 👤 {ride?.customer || "Customer"} */}
                                👤 {ride?.user?.fullname
    ? ride.user.fullname.firstname + " " + ride.user.fullname.lastname
    : "Customer"}
                            </p>
                        </div>

                        {/* 📍 PICKUP */}
                        <div className="mb-4">
                            <p className="text-sm opacity-70 font-bold">Pickup</p>
                            <p className="font-semibold">📍 {ride?.pickup}</p>
                        </div>

                        {/* 📍 DROP */}
                        <div className="mb-4">
                            <p className="text-sm opacity-70 font-bold">Drop</p>
                            <p className="font-semibold">➝ {ride?.destination || ride?.drop || "N/A"}</p>
                        </div>

                        {/* 📊 INFO */}
                        <div className="mb-4">
                            <p className="text-sm opacity-70 font-bold">Distance</p>
                            <span>🚗 {ride?.distance || "N/A"}</span>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm opacity-70 font-bold">Time</p>
                            <span>⏱ {ride?.time || "N/A"}</span>
                        </div>

                        {/* 💰 PRICE */}
                        <div className="mb-5">
                            <div className="bg-linear-to-r from-yellow-400 to-orange-500 text-black rounded px-3 py-3 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-semibold">Ride Fare</p>
                                    <p className="text-2xl font-bold">
  ₹{ride?.fare || ride?.price || 0}
</p>
                                </div>
                                <div className="text-3xl font-bold">₹</div>
                            </div>
                        </div>

                        {/* 🔐 OTP INPUT */}
                        <div className="mb-5">
                            <p className="text-sm font-bold mb-2">Enter OTP</p>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    if (value.length <= 4) setOtp(value);
                                }}
                                placeholder="Enter OTP"
                                className="w-full px-4 py-3 rounded bg-black/30 border border-white/20 outline-none text-center text-lg tracking-widest"
                                required
                            />
                        </div>

                        {/* ✅ CONFIRM BUTTON */}
                        <button
                            onClick={handleConfirm}
                            className="w-full bg-green-500 py-3 rounded font-semibold hover:bg-green-600 transition"
                        >
                            Confirm Ride ✅
                        </button>

                    </div>
                </div>

                {/* 🗺️ RIGHT SIDE (MAP) */}
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

export default CaptainConfirm;