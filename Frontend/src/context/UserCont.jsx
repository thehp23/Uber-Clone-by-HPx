import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserDataContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 FETCH USER PROFILE FROM BACKEND
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
  setIsLoading(true); // 🔥 IMPORTANT
  return;
}
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Update user state only if data has changed
       setUser(res.data.user);
        setError(null);
      } catch (err) {
        console.log(
          "❌ Failed to fetch user profile:",
          err.response?.data || err.message
        );
        setUser(null);
        setError(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserDataContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, error, setError }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserProvider;