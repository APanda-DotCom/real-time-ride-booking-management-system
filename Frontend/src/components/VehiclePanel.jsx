import React from 'react'
import { FiChevronDown } from "react-icons/fi";

import UberXL from '../assets/UberXL_Black_v2.png';
import UberMotorCycle from '../assets/motorcycle.png';
import UberCar from '../assets/car.png';
import UberAuto from '../assets/auto.png';
import { FaUser } from "react-icons/fa";

const VehiclePanel = (props) => {
  return (
   <div>
  <h5 
    onClick={() => { 
      props.setVehiclePanel(false)
    }}
    className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
  >
    <FiChevronDown />
  </h5>

  <h3 className='text-2xl font-semibold mb-4 mt-4'>Choose a vehicle</h3>
  
  <div 
    onClick={() => {
      props.setConfirmRidePanel(true)
    }}
    className='flex border-2 border-gray-200 hover:border-gray-300 active:border-black rounded-xl w-full p-2.5 mb-2 items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md'
  >
    <img className='h-14 w-14 object-contain' src={UberCar} alt="UberGo Car"/>
    <div className='ml-2 flex-1'>
      <h4 className='font-medium text-base flex gap-2 items-center'>
        UberGo 
        <span className='flex gap-1 items-center text-sm text-gray-600'>
          <FaUser className="text-xs"/>4
        </span>
      </h4>
      <h5 className='font-medium text-sm text-gray-500'>2 mins away</h5>
      <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
    </div>
    <h2 className='text-lg font-semibold'>₹193</h2>
  </div>
 
  <div 
    onClick={() => {
      props.setConfirmRidePanel(true)
    }}
    className='flex border-2 border-gray-200 hover:border-gray-300 active:border-black rounded-xl w-full p-2.5 mb-2 items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md'
  >
    <img className='h-14 w-14 object-contain' src={UberMotorCycle} alt="Moto"/>
    <div className='ml-2 flex-1'>
      <h4 className='font-medium text-base flex gap-2 items-center'>
        Moto 
        <span className='flex gap-1 items-center text-sm text-gray-600'>
          <FaUser className="text-xs"/>1
        </span>
      </h4>
      <h5 className='font-medium text-sm text-gray-500'>3 mins away</h5>
      <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
    </div>
    <h2 className='text-lg font-semibold'>₹65</h2>
  </div>

  <div 
    onClick={() => {
      props.setConfirmRidePanel(true)
    }}
    className='flex border-2 border-gray-200 hover:border-gray-300 active:border-black rounded-xl w-full p-2.5 mb-2 items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md'
  >
    <img className='h-14 w-14 object-contain' src={UberAuto} alt="Auto"/>
    <div className='ml-2 flex-1'>
      <h4 className='font-medium text-base flex gap-2 items-center'>
        Auto 
        <span className='flex gap-1 items-center text-sm text-gray-600'>
          <FaUser className="text-xs"/>3
        </span>
      </h4>
      <h5 className='font-medium text-sm text-gray-500'>2 mins away</h5>
      <p className='font-normal text-xs text-gray-600'>Affordable auto rides</p>
    </div>
    <h2 className='text-lg font-semibold'>₹110</h2>
  </div>

  <div 
    onClick={() => {
      props.setConfirmRidePanel(true)
    }}
    className='flex border-2 border-gray-200 hover:border-gray-300 active:border-black rounded-xl w-full p-2.5 mb-2 items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md'
  >
    <img className='h-16 w-16 object-contain' src={UberXL} alt="UberXL"/>
    <div className='ml-2 flex-1'>
      <h4 className='font-medium text-base flex gap-2 items-center'>
        UberXL 
        <span className='flex gap-1 items-center text-sm text-gray-600'>
          <FaUser className="text-xs"/>6
        </span>
      </h4>
      <h5 className='font-medium text-sm text-gray-500'>2 mins away</h5>
      <p className='font-normal text-xs text-gray-600'>Premium</p>
    </div>
    <h2 className='text-lg font-semibold'>₹293</h2>
  </div>
</div>
  )
}

export default VehiclePanel