import React, { useContext } from 'react'
import Home from './pages/Home'
import {Route,Routes} from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Terms from './pages/Terms'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { UserDataContext } from './context/UserCont'





const App = () => {

  const ans = useContext(UserDataContext)

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>




      </Routes>
    </div>
  )
}

export default App