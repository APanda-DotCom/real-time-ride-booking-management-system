import React, { useState, useRef } from 'react'
import Logo from '../assets/uber-seeklogo.svg'
import LocationGif from '../assets/Location.gif'
import gsap from "gsap";
import {useGSAP} from '@gsap/react';

import { FiChevronDown } from "react-icons/fi";
import LocationPanel from "../components/LocationPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedVehicle from '../components/ConfirmedVehicle';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';


const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [pickupSuggestions, setPickupSuggestion] = useState([])
  const [destinationSuggestions, setDestinationSuggestion] = useState([])
  const [activeField, setActiveField] = useState(null)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const  LookingDriverRef = useRef(null)
  const  WaitingDriverRef = useRef(null)
  const panelCloseRef = useRef(null)
  const[vehiclePanel,setVehiclepanel]=useState(false)
  const [confirmRidePanel,setConfirmRidePanel]=useState(false)
  const [LookingDriver,setLookingDriver]=useState(false)
  const [WaitingDriver,setWaitingDriver]=useState(false)

const handelPickupChange = async(e) => {
    setPickup(e.target.value)
    setActiveField('pickup')
    try{
       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
         params:{
           input:e.target.value},
           headers: {
            Authorization:`Bearer ${localStorage.getItem('token')} `
           }
         })
       setPickupSuggestion(response.data)
    }catch{
        console.log("error fetching pickup suggestions")
    }
  }

const handelDestinationChange = async(e) => {
    setDestination(e.target.value)
    setActiveField('destination')
    try{
       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
         params:{
           input:e.target.value},
           headers: {
            Authorization:`Bearer ${localStorage.getItem('token')} `
           }
         })
       setDestinationSuggestion(response.data)
    }catch{
        console.log("error fetching destination suggestions")
    }
  }



  // eslint-disable-next-line no-unused-vars
  const handleSelectLocation = (location) => {
    if (activeField === 'pickup') {
      setPickup(location)
    } else if (activeField === 'destination') {
      setDestination(location)
    }
    setPickupSuggestion([])
    setDestinationSuggestion([])
  }






  const handlerSubmit = (e) => {
    e.preventDefault()
  }
  
  
  useGSAP(function() {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: '0'
        // opacity:1
      })
      gsap.to(panelCloseRef.current,{
         opacity:1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        // opacity:1
      })
      gsap.to(panelCloseRef.current,{
         opacity:0
      })
    }
  }, [panelOpen]);

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
           transform:'translatey(0)'
     }) 
    }else{
     gsap.to(vehiclePanelRef.current,{
          transform:'translatey(100%)'
     })
    }
  } ,[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
           transform:'translatey(0)'
     }) 
    }else{
     gsap.to(confirmRidePanelRef.current,{
          transform:'translatey(100%)'
     })
    }
  } ,[confirmRidePanel])

  useGSAP(function(){
    if(LookingDriver){
      gsap.to(LookingDriverRef.current,{
           transform:'translatey(0)'
     }) 
    }else{
     gsap.to(LookingDriverRef.current,{
          transform:'translatey(100%)'
     })
    }
  } ,[LookingDriver])

  useGSAP(function(){
    if(WaitingDriver){
      gsap.to(WaitingDriverRef.current,{
           transform:'translatey(0)'
     }) 
    }else{
     gsap.to(WaitingDriverRef.current,{
          transform:'translatey(100%)'
     })
    }
  } ,[WaitingDriver])

  return (
    <div className='h-screen overflow-hidden relative'>
      <img className='w-16 absolute left-5 top-5'
         src={Logo}
         alt="Uber Logo"
      />
      <div onClick={()=>{
        setVehiclepanel(false)
      }}className="h-4/5">
        <img className="h-full w-full object-cover"
          src={LocationGif}
          alt="location" 
        />
      </div>
     
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef}onClick={()=>
            setPanelOpen(false)
          }className="absolute right-3 top-3 text-3xl">
            <FiChevronDown  />
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={handlerSubmit}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'/>
            <input className='bg-[#eeeeee] px-8 py-2 text-lg rounded-lg w-full mt-5'
              type="text" 
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={handelPickupChange}
              placeholder="Add a pick-up Location" 
            />
            <input className='bg-[#eeeeee] px-8 py-2 text-lg rounded-lg w-full mt-5'
              type="text" 
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={handelDestinationChange}
              placeholder="Enter your Destination"
            />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationPanel 
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
            setVehiclePanel={setVehiclepanel}
            setPanelOpen={setPanelOpen}
            setPickupSuggestion={setPickupSuggestion}
            setDestinationSuggestion={setDestinationSuggestion}
          /> 
        </div> 
          <div ref={vehiclePanelRef}className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-8'>
            <VehiclePanel setConfirmRidePanel={setConfirmRidePanel}setVehiclePanel={setVehiclepanel}/>

          </div>
            <div ref={confirmRidePanelRef}className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-8'>
            <ConfirmedVehicle setConfirmRidePanel={setConfirmRidePanel}setLookingDriver={setLookingDriver}/>

          </div>
          <div ref={LookingDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-8">
            <LookingForDriver  setLookingDriver={setLookingDriver}/>
          </div>
          <div ref={WaitingDriverRef}className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-8"> 
            <WaitingForDriver setWaitingDriver={setWaitingDriver} />
          </div>
      </div>
    </div>
  )
}

gsap.registerPlugin(useGSAP);

export default Home