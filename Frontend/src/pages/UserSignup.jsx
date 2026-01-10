import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import UberLogo from '../assets/uber-seeklogo.svg'
import axios from 'axios'
import { useContext } from "react";
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  //const [userData, setUserData] = useState({})

  
  // eslint-disable-next-line no-unused-vars
  const{user,setUser}=useContext(UserDataContext)

  const navigate=useNavigate()

  const handlerSubmit =async (e) => {
    e.preventDefault()

  const newUser={
      fullname :{
       firstname: firstName,
        lastname: lastName
      },
      email,
      password,
    }

    const response = await axios.post(
  `${import.meta.env.VITE_BASE_URL}/users/register`,newUser
);

if (response.status === 201) {
  const data = response.data;
  localStorage.setItem('token', data.token);
  setUser(data.user);
  navigate('/home');
}


    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }



  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
    
      <div className="px-7 pt-10">
        <img src={UberLogo} alt="Uber Logo" className="w-20 mb-10" />

        <form onSubmit={handlerSubmit} className="space-y-6">

    
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-800">
              What’s your name
            </h3>
            <div className="flex gap-3">
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

       
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-800">
              What’s your email
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
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer
                           text-gray-500 hover:text-black p-1 rounded-full"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>
          </div>

       
          <button
            className="w-full bg-black text-white py-3 rounded-lg
                       font-semibold text-base hover:bg-gray-900 transition"
          >
            Create account
          </button>
        </form>

    
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>

     
      <p className="text-[9px] text-gray-500 leading-snug text-center px-6 pb-6">
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
  )
}

export default UserSignup
