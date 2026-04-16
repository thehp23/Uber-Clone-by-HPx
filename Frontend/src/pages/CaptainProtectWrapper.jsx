import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainCont'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('captainToken')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
            return;
        }

        const fetchCaptain = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setCaptain(response.data);
                setIsLoading(false);

            } catch (err) {
                console.log("FULL ERROR:", err.response?.data || err.message);
                localStorage.removeItem('captainToken');
                navigate('/captain-login');
            }
        };

        fetchCaptain();
    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>; // ✅ FIXED return typo
    }

    return <>{children}</>;
}

export default CaptainProtectWrapper;