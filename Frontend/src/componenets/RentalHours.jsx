import React from "react";
import { useNavigate } from "react-router-dom";
import { useRental } from "../context/RentalContext";
import { FaArrowLeft } from "react-icons/fa";

const RentalHours = () => {

  const navigate = useNavigate();
  const { hours, setHours } = useRental();

  const pricePerHour = 442.05;
  const totalPrice = (hours * pricePerHour).toFixed(2);

  return (
    <div className="flex min-h-[calc(100vh-64px)]">

      {/* LEFT PANEL */}
      <div className="w-98 bg-white mx-5 mb-22 px-7 py-8 shadow-2xl rounded border">

        {/* 🔙 BACK BUTTON */}
        <button
          onClick={() => navigate("/rental")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition mb-4"
        >
          <FaArrowLeft />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          How much time do you need?
        </h2>

        {/* HOURS SELECTOR */}
        <div className="flex justify-center items-center gap-6 mb-3">
          <button
            onClick={() => setHours(h => Math.max(1, h - 1))}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-xl"
          >
            -
          </button>

          <div className="text-3xl font-semibold">
            {hours} hr
          </div>

          <button
            onClick={() => setHours(h => h + 1)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-xl"
          >
            +
          </button>
        </div>

        {/* INCLUDED KM */}
        <p className="text-center text-gray-500 mb-5 text-sm">
          {hours * 15} km included
        </p>

        {/* SLIDER */}
        <input
          type="range"
          min="1"
          max="12"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full mb-6 accent-blue-500 cursor-pointer"
        />

        {/* PRICE CARD */}
        <div className="bg-gray-100 rounded-xl p-4 mb-5">
          <p className="text-gray-500 text-sm">Starting at</p>
          <p className="text-2xl font-bold">₹{totalPrice}</p>
          <p className="text-gray-400 text-sm">₹{pricePerHour}/hour</p>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/rental/choose-rental")}
          className="w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-800 active:scale-95 transition"
        >
          Choose a ride
        </button>

      </div>

      {/* RIGHT MAP */}
      <div className="flex-1 px-1 mr-4">
        <div className="w-full h-[86.5%] rounded overflow-hidden shadow-xl border">
          <iframe
            src="https://www.google.com/maps?q=Ahmedabad&output=embed"
            className="w-full h-full border-0"
          />
        </div>
      </div>

    </div>
  );
};

export default RentalHours;