import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const CaptainSignup = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptaindata] = useState({})


  const submitHandler = (e) =>{
    e.preventDefault();  
   const newCaptaindata = {
      fullname : {
      firstname : firstname,
      lastname : lastname
      },
      email : email,
      password : password
    } 

    setCaptaindata(newCaptaindata);
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
  }


  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
  
    <div className="px-8 pb-4 bg-white rounded-xl w-120 shadow-xl 
                  transition transform hover:-translate-y-2 hover:shadow-2xl">

       <img className='w-15 py-5 ' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='uberLogo'></img>
  

      <form onSubmit={(e)=>{
        submitHandler(e);
      }} autoComplete="off">
      

      {/* fullname */}
         <h3 className="text-base font-bold mb-2">What's our Captain's Name?</h3>
         <div className=' flex gap-3 mb-2'>
          <input
         type="text"
         value={firstname}
         onChange={(e)=>{
          setFirstname(e.target.value)
         }}
         className="w-1/2 text-base placeholder:text-sm bg-[#f3f3f3] mb-2 px-4 py-1 border rounded shadow-inner  focus:outline-none focus:ring-2 focus:ring-black"
         placeholder="Enter your firstname"
         required
         autoComplete="off"/>

         <input
         type="text"
         value={lastname}
         onChange={(e)=>{
          setLastname(e.target.value)
         }}
         className="w-1/2 text-base  placeholder:text-sm bg-[#f3f3f3] mb-2 px-4 py-1 border rounded shadow-inner  focus:outline-none focus:ring-2 focus:ring-black"
         placeholder="Enter your lastname"
         autoComplete="off"/>
         </div>


         {/* Email */}
         <h3 className="text-base font-bold mb-2">What's our Captain's Email?</h3>
         <input
         type="email"
         value={email}
         onChange={(e)=>{
          setEmail(e.target.value)
         }}
         className="w-full text-base  placeholder:text-sm bg-[#f3f3f3] mb-4 px-4 py-1 border rounded shadow-inner  focus:outline-none focus:ring-2 focus:ring-black"
         placeholder="Enter your email"
         required
         autoComplete="off"/>


         {/* Password */}
         <h3 className="text-base font-bold mb-2">Enter Password</h3>
         <input
         type="password" 
         value={password}
         onChange={(e)=>{
          setPassword(e.target.value)
         }}
         className="w-full text-base placeholder:text-sm bg-[#f3f3f3] mb-4 px-4 py-1 border rounded shadow-inner   focus:outline-none focus:ring-2 focus:ring-black"
         placeholder="Enter your password"
         required
         autoComplete="new-password"/>


        <button
         className="w-full text-lg bg-black text-white mb-4 px-8 py-1 rounded 
                   shadow-md transition active:scale-95 active:shadow-sm hover:bg-gray-800">
          Login
        </button>


        <p className='text-center mb-15'>Already have an account?<Link to={'/captain-login'} className='text-blue-600'>Login Here </Link></p>


      </form>


         <div>
            <p className='font-light my-4 text-xs leading-tight'>By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber and its affiliates.</p>
         </div>

         <div>
            <p className="text-xs font-light my-4">
            By continuing, you agree to our <span className="text-blue-600 underline cursor-pointer"><Link to={'/terms'}>Terms of Service</Link></span> and <span className="text-blue-600 underline cursor-pointer"><Link to={'/privacypolicy'}>Privacy Policy</Link></span>.
            </p>
         </div>


    </div>
    
  </div>
  )
}

export default CaptainSignup