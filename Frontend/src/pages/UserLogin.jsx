/* eslint-disable no-unused-vars */
import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import UberLogo from '../assets/uber-seeklogo.svg'
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  //const [userData, setUserData] = useState({})

  const{user,setUser}=useContext(UserDataContext)

  const navigate=useNavigate()

  const handlerSubmit =async (e) => {
    e.preventDefault()

    const userData={
      email:email,
      password:password
    }

    try {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/users/login`,
    userData
  );

  setUser(response.data.user);
  localStorage.setItem('token', response.data.token);
  navigate('/home');
} catch (error) {
  console.log(error.response?.data);
  alert(error.response?.data?.message || "Login failed");
}

    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-white">
      
      <div>
        <img
          className="w-20 mb-10"
          src={UberLogo}
          alt="Uber Logo"
        />

        <form onSubmit={(e)=>
         handlerSubmit(e)
         }
        >
        
          <h3 className="text-lg font-medium mb-2">
            What's your email
          </h3>

          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="bg-gray-100 mb-6 rounded-lg px-4 py-3 border w-full text-base
                       focus:outline-none focus:ring-2 focus:ring-black"
          />

        
          <h3 className="text-lg font-medium mb-2">
            Enter Password
          </h3>

          <div className="relative mb-7">
            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-gray-100 rounded-lg px-4 py-3 pr-14 border w-full text-base
                         focus:outline-none focus:ring-2 focus:ring-black"
            />

            
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer
                         text-gray-500 hover:text-black hover:bg-gray-200
                         p-1 rounded-full transition-all duration-200"
            >
              {showPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </span>
          </div>

          
          <button
            className="bg-slate-950 text-white rounded-lg font-semibold mb-6
                       px-4 py-3 w-full text-lg hover:bg-slate-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          New User?{' '}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create new account
          </Link>
        </p>
      </div>

      
      <Link
        to="/captain-login"
        className="bg-purple-600 text-white rounded-lg font-semibold
                   px-4 py-3 w-full text-center text-lg
                   hover:bg-purple-400 transition"
      >
        Sign in as Captain
      </Link>
    </div>
  )
}

export default UserLogin
