import React from 'react'
import { MdOutlineLocationOn } from "react-icons/md";

const LocationPanel = ({ 
  suggestions, 
  setVehiclePanel, 
  setPanelOpen,
  activeField,
  setPickup,
  setDestination,
  setPickupSuggestion,
  setDestinationSuggestion
}) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion)
    } else if (activeField === 'destination') {
      setDestination(suggestion)
    }
    setVehiclePanel(true)
    setPanelOpen(false)
    setPickupSuggestion([])
    setDestinationSuggestion([])
  }

  return (
    <div> 
      {
        suggestions && suggestions.length > 0 ? (
          suggestions.map(function (elem, index) {
            return <div   
              key={index} 
              onClick={() => handleSuggestionClick(elem)}
              className="flex items-start gap-4 p-2 rounded-2xl border border-gray-200 hover:border-black transition-all duration-300 bg-white shadow-sm hover:shadow-md cursor-pointer my-3 ml-4 mr-4">
    
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-black">
                  <MdOutlineLocationOn size={20} /> 
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 leading-snug">
                    {elem}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {elem}
                  </p>
                </div>
              </div>
          })
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No suggestions found</p>
          </div>
        )
      }
    </div>
  )
}


export default LocationPanel
