import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>

      <div className='bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1737066451197-93d342a476c2?q=80&w=1136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full flex flex-col justify-between'>


        <img className=' w-30 ml-2' src='https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg' alt='uberLogo'></img>

        <div className='bg-white py-5 px-5'>
          <h2 className='text-2xl font-bold tracking-widest'>Get Started With Uber</h2>
          <Link to={'/login'} className='flex w-full bg-black text-white  px-5 py-2 mt-5 items-center justify-center rounded'>Continue</Link>
        </div>

      </div>

    </div>
  )
}

export default Start