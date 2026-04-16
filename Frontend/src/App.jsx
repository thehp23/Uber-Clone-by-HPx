import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"

import UserProtectWrapper from './pages/UserProtectWrapper'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Start from './pages/Start'
// import Home from './pages/Home'
import UserLogout from './pages/UserLogout'

import Terms from './pages/Terms'
import PrivacyPolicy from './pages/PrivacyPolicy'

import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainLogout from './pages/CaptainLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainRequests from './pages/CaptainRequests'
import CaptainConfirm from './pages/CaptainConfirm'
import CaptainFinal from './pages/CaptainFinal'

import Layout from "./componenets/Layout"
import Ride from './componenets/Ride'
import ChooseRide from "./componenets/ChooseRide"
import LookingForDriver from "./componenets/LookingForDriver"

import { RentalProvider } from './context/RentalContext'
import RentalLayout from './componenets/RentalLayout'
import Rental from './componenets/Rental'
import RentalHours from './componenets/RentalHours'
import RentalChooseRide from './componenets/RentalChooseRide'
import RentalLookingDriver from './componenets/RentalLookingDriver'

const App = () => {
  return (
    <RentalProvider>

      {/* 🔥 GLOBAL TOASTER */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 2000,
          style: {
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            backdropFilter: "blur(10px)",
          },
        }}
      />

      <Routes>

        {/* 🔐 PROTECTED USER LAYOUT */}
        <Route element={
          <UserProtectWrapper>
            <Layout />
          </UserProtectWrapper>
        }>

          {/* <Route path='/home' element={<Home />} /> */}

          {/* NORMAL RIDE */}
          <Route path="/ride" element={<Ride />} />
          <Route path="/ride/choose-ride" element={<ChooseRide />} />
          <Route path="/ride/searching" element={<LookingForDriver />} />

          {/* 🔥 RENTAL FLOW */}
          <Route path="/rental" element={<RentalLayout />}>
            <Route index element={<Rental />} />
            <Route path="/rental/hours" element={<RentalHours />} />
            <Route path="/rental/choose-rental" element={<RentalChooseRide />} />
            <Route path="/rental/rental-searching" element={<RentalLookingDriver />} />
          </Route>

        </Route>

        {/* PUBLIC ROUTES */}
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />

        {/* USER LOGOUT */}
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />

        {/* 🚗 CAPTAIN ROUTES */}
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />

        <Route path='/captain/requests' element={
          <CaptainProtectWrapper>
            <CaptainRequests />
          </CaptainProtectWrapper>
        } />

        <Route path='/captain/confirm' element={
          <CaptainProtectWrapper>
            <CaptainConfirm />
          </CaptainProtectWrapper>
        } />

        <Route path='/captain/final' element={
          <CaptainProtectWrapper>
            <CaptainFinal />
          </CaptainProtectWrapper>
        } />

        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />

      </Routes>

    </RentalProvider>
  )
}

export default App