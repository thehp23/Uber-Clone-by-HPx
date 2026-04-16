import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCar, FaClock, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="h-16 w-full flex items-center justify-between px-8 py-12 bg-white shadow-sm">

      {/* Logo */}
      <div>
        <img className='w-20 py-5 ' src='https://logodownload.org/wp-content/uploads/2015/05/uber-logo-7.png' alt='uberLogo'></img>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6">

        <Link
          to="/ride"
          className={`flex items-center gap-2 pb-1 font-medium ${location.pathname === "/ride"


              ? "border-b-3 border-green-500"
              : "text-gray-500"
            }`}
        >
          <FaCar />
          Ride
        </Link>

        <Link
          to="/rental"
          className={`flex items-center gap-2 pb-1 font-medium ${location.pathname === "/rental"

              ? "border-b-3 border-blue-500"
              : "text-gray-500"
            }`}
        >
          <FaClock />
          Rentals
        </Link>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-700">
          <FaClock />
          Activity
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-2xl" />
          <span>Profile</span>
        </div>
      </div>


    </div>
  );
};

export default Navbar;