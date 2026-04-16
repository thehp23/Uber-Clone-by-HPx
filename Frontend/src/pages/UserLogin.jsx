import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserCont'
import axios from 'axios'


const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [userr, setUserData] = useState({})

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newuserData = {
      email: email,
      password: password
    }


    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newuserData)
    if (response.status === 200) {
      const data = response.data
      console.log("👤 LOGGED IN USER:", data.user);
      setUser(data.user); // signup/login
      localStorage.setItem("userToken", data.token);
      navigate('/ride');
    }
    // setUserData({email : email, password : password})
    setEmail('');
    setPassword('');
  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="px-8 pb-4 bg-white rounded-xl w-96 shadow-xl 
                  transition transform hover:-translate-y-2 hover:shadow-2xl">
        <img className='w-20 py-5 ' src='https://logodownload.org/wp-content/uploads/2015/05/uber-logo-7.png' alt='uberLogo'></img>

        <form onSubmit={(e) => {
          submitHandler(e);
        }} autoComplete="off">

          {/* Email */}
          <h3 className="text-xl mb-2">What's your email?</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="w-full text-lg  placeholder:text-sm bg-[#f3f3f3] mb-7 px-4 py-2 border rounded shadow-inner  focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your email"
            required
            autoComplete="off" />

          {/* Password */}
          <h3 className="text-xl mb-2">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="w-full text-lg placeholder:text-sm bg-[#f3f3f3] mb-7 px-4 py-2 border rounded shadow-inner     focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
            required
            autoComplete="new-password" />

          <button
            className="w-full text-lg bg-black text-white mb-7 px-8 py-2 rounded 
                   shadow-md transition active:scale-95 active:shadow-sm hover:bg-gray-800">
            Login
          </button>

          <p className='text-center'>New here?<Link to={'/signup'} className='text-blue-600'>Create New Account
          </Link></p>

        </form>

        <div>
          <Link to={'/captain-login'} className="w-full text-lg bg-green-600 text-white mt-30 px-8 py-2 rounded 
                   shadow-md transition active:scale-95 active:shadow-sm hover:bg-gray-800 flex items-center justify-center">Login as a Captain
          </Link>
        </div>

      </div>

    </div>
  )
}

export default UserLogin