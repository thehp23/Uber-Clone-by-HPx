import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserCont'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true) // ✅ initialize true
  const token = localStorage.getItem('userToken')

  useEffect(() => {
    let isMounted = true; // ✅ prevent state updates after unmount

    if (!token) {
      navigate('/login')
      return
    }

    // fetch user profile only if not already loaded
    if (!user || !user.email) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (isMounted && response.status === 200) {
          setUser(response.data); // NOT response.data.user
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        localStorage.removeItem('userToken')
        navigate('/login')
      })
    } else {
      setIsLoading(false)
    }

    return () => {
      isMounted = false
    }
  }, [token, user])

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return <>{children}</>
}

export default UserProtectWrapper