import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CaptainDataContext = createContext();

const CaptainCont = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  // 🔥 ADD THIS (VERY IMPORTANT)
  useEffect(() => {
    const fetchCaptain = async () => {
      const token = localStorage.getItem("captainToken"); // ✅ IMPORTANT

      if (!token) return;

      setIsLoading(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`, // ✅ CORRECT API
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        setCaptain(res.data); // ✅ SET DATA
        console.log("✅ Captain Profile:", res.data);

        setError(null);
      } catch (err) {
        console.log(
          "❌ Captain fetch error:",
          err.response?.data || err.message
        );

        setCaptain(null);
        setError(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptain();
  }, []);

  return (
    <CaptainDataContext.Provider
      value={{
        captain,
        setCaptain,
        updateCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainCont;