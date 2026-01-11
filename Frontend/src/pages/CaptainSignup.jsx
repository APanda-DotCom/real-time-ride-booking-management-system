import React, { useState ,useContext} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import UberLogo from '../assets/uber-driver-svgrepo-com.svg'
import {CaptainDataContext} from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  //const [/*captainData*/, setCaptainData] = useState({})

  // eslint-disable-next-line no-unused-vars
  const {captain,setCaptain}=useContext(CaptainDataContext)

  const navigate=useNavigate()

  const handlerSubmit = async(e) => {
    e.preventDefault()

    const captainData = {
  fullname: {
    firstname: firstName,
    lastname: lastName,
  },
  email,
  password,
  vehicle: {
    color: vehicleColor,
    plate: vehiclePlate,
    capacity: vehicleCapacity,
    vehicleType: vehicleType, 
  }
};


    const response = await axios.post(
  `${import.meta.env.VITE_BASE_URL}/captains/register`,
  captainData
);

if (response.status === 201) {
  const data = response.data;

  localStorage.setItem("token", data.token);
  setCaptain(data.captain);
  navigate("/captain-home");
}


    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
     setVehicleType('')

  }
   return (
  <div className="min-h-screen bg-white flex flex-col justify-between">
    {/* Form Section */}
    <div className="px-7 pt-6">
      <img
        src={UberLogo}
        alt="Uber Logo"
        className="w-20 mb-3"
      />

      <form onSubmit={handlerSubmit} className="space-y-6">
        {/* Captain Name */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-800">
            What’s our Captain's name
          </h3>

          <div className="flex gap-2">
            <input
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="bg-gray-100 rounded-lg px-4 py-3 w-1/2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="bg-gray-100 rounded-lg px-4 py-3 w-1/2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-800">
            What’s our Captain's email
          </h3>

          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="bg-gray-100 rounded-lg px-4 py-3 w-full text-sm
                       focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-800">
            Create a password
          </h3>

          <div className="relative">
            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-gray-100 rounded-lg px-4 py-3 pr-14 w-full text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2
                         cursor-pointer text-gray-500 hover:text-black
                         p-1 rounded-full"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>
        </div>

        {/* Vehicle Information */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-800">
            Vehicle Information
          </h3>

          <div className="flex gap-3">
            <input
              required
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Vehicle Color"
              className="bg-gray-100 rounded-lg px-4 py-3 w-1/2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              required
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder="Vehicle Plate"
              className="bg-gray-100 rounded-lg px-4 py-3 w-1/2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex gap-3 mt-3">
            <input
              required
              type="number"
              min="1"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder="Vehicle Capacity"
              className="bg-gray-100 rounded-lg px-4 py-3 w-1/2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            />

            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-gray-100 rounded-lg px-4 py-3 w-1/2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Vehicle</option>
              <option value="car">Car</option>
              <option value="motorcycle">motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-black text-white py-3 rounded-lg
                     font-semibold text-base hover:bg-gray-900 transition"
        >
          Create account
        </button>
      </form>

      {/* Login Link (EXTRA SPACE ADDED BELOW) */}
      <p className="text-center text-sm text-gray-600 mt-5 mb-8">
        Already have an account?{' '}
        <Link
          to="/Captain-login"
          className="text-blue-600 font-medium hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>

    {/* Footer (SPACE ABOVE ADDED) */}
    <p className="text-[9px] text-gray-500 leading-snug text-center px-6 pb-6 mt-6">
      By continuing, you agree that Uber or its representatives may contact you by
      email, phone, or SMS (including automated means). You also agree to Uber’s
      <span className="text-blue-600 hover:underline cursor-pointer ml-1">
        Terms of Service
      </span>{' '}
      and
      <span className="text-blue-600 hover:underline cursor-pointer ml-1">
        Privacy Policy
      </span>.
    </p>
  </div>
);


 
}

export default CaptainSignup
