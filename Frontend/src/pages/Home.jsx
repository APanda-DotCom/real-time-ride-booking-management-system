import React, { useState, useRef } from 'react'
import Logo from '../assets/uber-seeklogo.svg'
import LocationGif from '../assets/Location.gif'
import gsap from "gsap";
import {useGSAP} from '@gsap/react';

import { FiChevronDown } from "react-icons/fi";
import LocationPanel from './components/LocationPanel';
import UberXL from '../assets/UberXL_Black_v2.png';
import UberMotorCycle from '../assets/motorcycle.png';
import UberCar from '../assets/car.png';
import UberAuto from '../assets/auto.png';
import { FaUser } from "react-icons/fa";



const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const[vehiclePanel,setVehiclepanel]=useState(false)
  
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

  return (
    <div className='h-screen relative'>
      <img className='w-16 absolute left-5 top-5'
         src={Logo}
         alt="Uber Logo"
      />
      <div className='h-screen w-screen'>
        <img className="h-full w-full object-cover"
          src={LocationGif}
          alt="location" 
        />
      </div>
     
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef}onClick={()=>
            setpanelOpen(false)
          }className="absolute right-3 top-3 text-3xl">
            <FiChevronDown  />
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={handlerSubmit}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'/>
            <input className='bg-[#eeeeee] px-8 py-2 text-lg rounded-lg w-full mt-5'
              type="text" 
              onClick={() => setpanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Add a pick-up Location" 
            />
            <input className='bg-[#eeeeee] px-8 py-2 text-lg rounded-lg w-full mt-5'
              type="text" 
              onClick={() => setpanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your Destination"
            />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationPanel vehiclePanel={vehiclePanel} setVehiclepanel={setVehiclepanel}/> 
        </div>
          <div ref={vehiclePanelRef}className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-8'>
            <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>
            <div className='flex border-2  active:border-black rounded-xl w-full p-3 mt-2 items-center'>
              <img className='h-16'src={UberCar} alt="UberXL_Black_van"/>
              <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base flex gap-2 '> UberGo <span className='flex gap-2'><FaUser/>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable,compact rides</p>

              </div>
              <h2 className='text-lg font-semibold flex' >₹193.20</h2>
            </div>
           
            <div className='flex border-2  active:border-black rounded-xl w-full p-3 mt-2 items-center'>
              <img className='h-16'src={UberMotorCycle} alt="UberXL_Black_van"/>
              <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base flex gap-2 '> UberGo <span className='flex gap-2'><FaUser/>1</span></h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>

              </div>
              <h2 className='text-lg font-semibold flex' >₹65.20</h2>
            </div>
             <div className='flex border-2  active:border-black rounded-xl w-full p-3 mt-2 items-center'>
              <img className='h-16'src={UberAuto} alt="UberXL_Black_van"/>
              <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base flex gap-2 '> UberGo <span className='flex gap-2'><FaUser/>3</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>

              </div>
              <h2 className='text-lg font-semibold flex' >₹110.20</h2>
            </div>
             <div className='flex border-2  active:border-black rounded-xl w-full p-3 mt-2 items-center'>
              <img className='h-20'src={UberXL} alt="UberXL_Black_van"/>
              <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base flex gap-2 '> UberGo <span className='flex gap-2'><FaUser/>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Premier</p>

              </div>
              <h2 className='text-lg font-semibold flex' >₹293.20</h2>
            </div>

          </div>

      </div>
    </div>
  )
}

gsap.registerPlugin(useGSAP);

export default Home