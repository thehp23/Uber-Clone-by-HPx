import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userCaptain, setCaptainData] = useState({})


  const submitHandler = (e) =>{
    e.preventDefault();  
    setCaptainData({email : email, password : password})
    setEmail('');
    setPassword('');
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
  
    <div className="px-8 pb-4 bg-white rounded-xl w-96 shadow-xl 
                  transition transform hover:-translate-y-2 hover:shadow-2xl">
       <img className='w-20 py-5 ' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='uberLogo'></img>
  
      <form onSubmit={(e)=>{
        submitHandler(e);
      }} autoComplete="off">
      
         {/* Email */}
         <h3 className="text-xl mb-2">What's our Captain's email?</h3>
         <input
         type="email"
         value={email}
         onChange={(e)=>{
          setEmail(e.target.value)
         }}
         className="w-full text-lg  placeholder:text-sm bg-[#f3f3f3] mb-7 px-4 py-2 border rounded shadow-inner  focus:outline-none focus:ring-2 focus:ring-black"
         placeholder="Enter your email"
         required
         autoComplete="off"/>

         {/* Password */}
         <h3 className="text-xl mb-2">Enter Password</h3>
         <input
         type="password"
         value={password}
         onChange={(e)=>{
          setPassword(e.target.value)
         }}
         className="w-full text-lg placeholder:text-sm bg-[#f3f3f3] mb-7 px-4 py-2 border rounded shadow-inner     focus:outline-none focus:ring-2 focus:ring-black"
         placeholder="Enter your password"
         required
         autoComplete="new-password"/>

        <button
         className="w-full text-lg bg-black text-white mb-7 px-8 py-2 rounded 
                   shadow-md transition active:scale-95 active:shadow-sm hover:bg-gray-800">
          Login
        </button>

        <p className='text-center'>Join a fleet?<Link to={'/captain-signup'} className='text-blue-600'>Register as a Captain
        </Link></p>

      </form>

         <div>
            <Link to={'/login'} className="w-full text-lg bg-yellow-400 text-white mt-30 px-8 py-2 rounded 
                   shadow-md transition active:scale-95 active:shadow-sm hover:bg-gray-800 flex items-center justify-center">Login as a User
            </Link>
         </div>

    </div>
    
  </div>
  )
}

export default CaptainLogin