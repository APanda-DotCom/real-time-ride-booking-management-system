import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Start from './pages/Start.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import Home from './pages/Home.jsx'
import UserProtectWrapper from './pages/UserProtectWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx'


const App = () => {
  
  return (
    
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/login'element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/home'
        element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
         }/>
      
      <Route path='/user/logout'
      element={
      <UserProtectWrapper>
        <UserLogout/>
      </UserProtectWrapper>
      }/>
      <Route path='/captain-home' 
      element={
        <CaptainProtectWrapper>
          <CaptainHome/>
        </CaptainProtectWrapper>
      }/>

    
   </Routes>
  )
}

export default App
