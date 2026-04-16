import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

const RentalLookingDriver = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { pickup, duration, rideType, price } = location.state || {};

  return (
    <div className="flex min-h-[calc(100vh-64px)] ">

      {/* ✅ LEFT PANEL */}
      <div className="w-96 bg-white mx-5 mb-20 px-7 py-10 rounded border shadow-2xl flex flex-col">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Rental Requested
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          Finding drivers for your {rideType || "ride"}
        </p>

        {/* PROGRESS BAR */}
        <div className="w-full h-1 bg-gray-200 rounded mb-6">
          <div className="w-1/3 h-1 bg-green-500 rounded animate-pulse"></div>
        </div>

        {/* DETAILS */}
        <div className="flex gap-3 mb-6">

          {/* ICON */}
          <div className="flex flex-col items-center mt-2">
            <FaCircle className="text-black text-xs" />
          </div>

          {/* TEXT */}
          <div className="flex flex-col gap-2">

            <div>
              <p className="text-gray-500 text-sm">Starting from</p>
              <p className="text-gray-800 font-semibold">
                {pickup || "Ahmedabad"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Duration</p>
              <p className="text-gray-800 font-semibold">
                {duration} hr
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Ride Type</p>
              <p className="text-gray-800 font-semibold capitalize">
                {rideType}
              </p>
            </div>

          </div>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-3 mb-6">
          <div className="text-2xl font-bold">
            ₹{price || "0.00"}
          </div>
          <span className="text-gray-500 text-sm">Cash</span>
        </div>

        {/* CANCEL BUTTON */}
        <button
          onClick={() => navigate("/rental/choose-rental")}
          className="mt-auto bg-gray-100 text-red-500 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Cancel rental
        </button>

      </div>

      {/* ✅ RIGHT MAP */}
      <div className="flex-1 px-1 mr-4">
        <div className="w-full h-[87.5%] rounded overflow-hidden shadow-2xl border">
          <iframe
            src="https://www.google.com/maps?q=Ahmedabad&output=embed"
            className="w-full h-full border-0"
          />
        </div>
      </div>

    </div>
  );
};

export default RentalLookingDriver;