import React from 'react'
import { MdOutlineLocationOn } from "react-icons/md";

const LocationPanel = (props) => {

  const locations = [
    "5th Main Rd, Marathahalli, Kasavanahalli, Bengaluru, Karnataka 560037",
    "5th Main Rd, Marathahalli, Bengaluru, Karnataka 560037",
    " Marathahalli, Kasavanahalli, Bengaluru, Karnataka 560036",
    " Kasavanahalli, Bengaluru, Karnataka 5"
  ];

  return (
    <div> 
      {
        locations.map(function (elem,index) {

         return <div   key={index} onClick={() =>{
          props.setVehiclepanel(true)
          }}className="flex items-start gap-4 p-2 rounded-2xl border border-gray-200 hover:border-black transition-all duration-300 bg-white shadow-sm hover:shadow-md cursor-pointer my-3 ml-4 mr-4">
  
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-black"><MdOutlineLocationOn size={20} /> </div>

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
}
</div>

)
}


export default LocationPanel
