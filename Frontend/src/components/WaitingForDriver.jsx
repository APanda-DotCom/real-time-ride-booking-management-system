import React from 'react'
import { useState } from 'react';
import { FaShieldAlt, FaPhone, FaStar, FaArrowRight, FaChevronUp } from 'react-icons/fa';
import { MdLocationOn, MdMyLocation } from 'react-icons/md';


const WaitingForDriver = () => {
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(65);

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Driver Info Section */}
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Driver Photo */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" 
                  alt="Driver" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Car Image */}
              <div className="w-24 h-16 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&h=150&fit=crop" 
                  alt="Car" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Driver Details */}
            <div className="text-right">
              <h3 className="text-gray-500 text-sm font-medium">SANTH</h3>
              <h2 className="text-2xl font-bold text-gray-900">KA15AK00-0</h2>
              <p className="text-sm text-gray-600 mt-1">White Suzuki S-Presso LXI</p>
              <div className="flex items-center justify-end gap-1 mt-2">
                <FaStar className="text-yellow-500 text-sm" />
                <span className="text-lg font-semibold text-gray-900">4.9</span>
              </div>
            </div>
          </div>

          {/* Send Message Button */}
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-full flex items-center justify-between transition-all duration-200">
            <span>Send a message...</span>
            <FaArrowRight className="text-gray-500" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="bg-white px-6 py-6 border-b border-gray-200">
          <div className="flex justify-around gap-4">
            {/* Safety Button */}
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center transition-all duration-200">
                <FaShieldAlt className="text-blue-600 text-2xl" />
              </div>
              <span className="text-sm font-medium text-gray-700">Safety</span>
            </button>

            {/* Share Trip Button */}
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center transition-all duration-200">
                <MdMyLocation className="text-blue-600 text-2xl" />
              </div>
              <span className="text-sm font-medium text-gray-700">Share my trip</span>
            </button>

            {/* Call Driver Button */}
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center transition-all duration-200">
                <FaPhone className="text-blue-600 text-2xl" />
              </div>
              <span className="text-sm font-medium text-gray-700">Call driver</span>
            </button>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white px-6 py-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <MdLocationOn className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">562/11-A</h3>
              <p className="text-sm text-gray-600 mt-1">Kaikondrahalli, Bengaluru, Karnataka</p>
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Letting User Home UI</span>
            <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200">
              <FaChevronUp className="text-gray-600" />
            </button>
          </div>
          
         
          
        </div>
      </div>
    </div>
  );
}

export default WaitingForDriver