import React from 'react'
import { FiChevronDown } from "react-icons/fi";
import UberXL from '../assets/UberXL_Black_v2.png';
import UberMotorCycle from '../assets/motorcycle.png';
import UberCar from '../assets/car.png';
import UberAuto from '../assets/auto.png';
import { FaUser } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5 
        onClick={() => {
          props.setLookingDriver(false)
        }}
        className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
      >
        <FiChevronDown />
      </h5>

      <h3 className="text-2xl font-semibold mb-4 mt-5">Looking For a Driver</h3>

      <div className="flex justify-between flex-col items-center">
        <img className='h-20 mb-2' src={UberCar} alt="uber-car-logo" />
        
        <div className='w-full'>
          <div className='flex items-center gap-4 p-3 mb-2 border-b-2 border-gray-200'>
            <RiUserLocationLine className="text-xl text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-base font-medium">562/11-A</h3>
              <p className="text-xs mt-0.5 text-gray-600">5th Main Rd, Marathahalli, Kasavanahalli, Bengaluru</p>
            </div>
          </div>

          <div className='flex items-center gap-4 p-3 mb-2 border-b-2 border-gray-200'>
            <MdOutlineLocationOn className="text-xl text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-base font-medium">562/11-A</h3>
              <p className="text-xs mt-0.5 text-gray-600">5th Main Rd, Marathahalli, Kasavanahalli, Bengaluru</p>
            </div>
          </div>

          <div className='flex items-center gap-4 p-3 mb-2'>
            <GiCash className="text-xl text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-base font-medium">₹193</h3>
              <p className="text-xs mt-0.5 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver