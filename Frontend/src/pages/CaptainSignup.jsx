import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainCont'
import axios from 'axios'

const CaptainSignup = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //  Vehicle states
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')


  const { captain, setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)
    if (response.status === 201) {
      const data = response.data
      setCaptain(data.newCaptain);
      localStorage.setItem('captainToken', data.token);
      navigate('/captain-login')
    }


    // reset form
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="px-8 pb-4 bg-white rounded-xl w-120 shadow-xl 
                      transition transform hover:-translate-y-2 hover:shadow-2xl">

        <img
          className='w-15 py-5'
          src='https://www.svgrepo.com/show/505031/uber-driver.svg'
          alt='uberLogo'
        />

        <form onSubmit={submitHandler} autoComplete="off">

          {/* fullname */}
          <h3 className="text-base font-bold mb-2">What's our Captain's Name?</h3>
          <div className='flex gap-3 mb-2'>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-1/2 text-base placeholder:text-sm bg-[#f3f3f3] mb-2 px-4 py-1 border rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your firstname"
              required
              autoComplete="off"
            />

            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-1/2 text-base placeholder:text-sm bg-[#f3f3f3] mb-2 px-4 py-1 border rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your lastname"
              autoComplete="off"
            />
          </div>

          {/* Email */}
          <h3 className="text-base font-bold mb-2">What's our Captain's Email?</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-base placeholder:text-sm bg-[#f3f3f3] mb-4 px-4 py-1 border rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your email"
            required
            autoComplete="off"
          />

          {/* Password */}
          <h3 className="text-base font-bold mb-2">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-base placeholder:text-sm bg-[#f3f3f3] mb-4 px-4 py-1 border rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
            required
            autoComplete="new-password"
          />

          {/* Vehicle Details */}
          <h3 className="text-base font-bold mb-2">Vehicle Information</h3>

          <div className="grid grid-cols-2 gap-3 mb-13">

            <input
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="w-full text-base placeholder:text-sm bg-[#f3f3f3] px-4 py-1 border rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Vehicle Color"
              required
            />

            <input
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="w-full text-base placeholder:text-sm bg-[#f3f3f3] px-4 py-1 border rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Vehicle Plate"
              required
            />

            <input
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="w-full text-base placeholder:text-sm bg-[#f3f3f3] px-4 py-1 border rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Capacity (e.g. 4)"
              required
            />

            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full text-base bg-[#f3f3f3] px-4 py-1 border rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>

          </div>

          <button
            className="w-full text-lg bg-black text-white mb-4 px-8 py-1 rounded 
                       shadow-md transition active:scale-95 active:shadow-sm hover:bg-gray-800">
            Create Account
          </button>

          <p className='text-center mb-5'>
            Already have an account?
            <Link to={'/captain-login'} className='text-blue-600'> Login Here</Link>
          </p>

        </form>

        <p className='font-light  text-xs leading-tight mb-1'>
          By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber and its affiliates.
        </p>

        <p className="text-xs font-light">
          By continuing, you agree to our
          <span className="text-blue-600 underline cursor-pointer">
            <Link to={'/terms'}> Terms of Service</Link>
          </span>
          {' '}and{' '}
          <span className="text-blue-600 underline cursor-pointer">
            <Link to={'/privacypolicy'}> Privacy Policy</Link>
          </span>.
        </p>

      </div>

    </div>
  )
}

export default CaptainSignup