import React ,{useState}from 'react'
import Logo from '../assets/uber-seeklogo.svg'
import LocationGif from '../assets/Location.gif'

const Home = () => {
  const[first,setFirst]=useState()

  const handlerSubmit=(e)=>{
    e.preventDfault

  }
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
      <div  className='h-[30%] p-5 bg-white relative'>
      <h4 className="text-2xl font-semibold">Find a trip</h4>
      <form onSubmit={handlerSubmit}>
        <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'/>
        <input className='bg-[#eeeeee]  px-8 py-2 text-lg rounded-lg w-full mt-5'type="text" placeholder="Add a pick-up Location" />
        <input className='bg-[#eeeeee] px-8 py-2 text-lg rounded-lg  w-full mt-5'type="text" placeholder="Enter your Destination"/>
     </form>
     </div>
     <div className=' bg-orange-300 h-0' >
     </div>
    </div>
    </div>
  )
}

export default Home
