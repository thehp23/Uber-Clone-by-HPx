import { createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { UserDataContext } from "./UserCont";
import { CaptainDataContext } from "./CaptainCont";

export const SocketContext = createContext();

// 🔥 Create socket instance
const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
  transports: ["websocket"],
  autoConnect: false, // important
});

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const { user } = useContext(UserDataContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
  socket.connect();

  const handleConnect = () => {
    console.log("✅ Connected:", socket.id);
  };

  socket.on("connect", handleConnect);

  return () => {
    socket.off("connect", handleConnect);
  };
}, []); 


  useEffect(() => {
  if (socket.connected && user?._id) {
    console.log("📤 JOIN USER:", user._id);
    socket.emit("join", { userId: user._id, userType: "user" });
  }

  if (socket.connected && captain?._id) {
    console.log("📤 JOIN CAPTAIN:", captain._id);
    socket.emit("join", { userId: captain._id, userType: "captain" });
  }
}, [user?._id, captain?._id]);



  // 🔹 Send message
  const sendMessage = (eventName, message) => {
    socket.emit(eventName, message);
  };

  // 🔹 Receive message
  const receiveMessage = (eventName, callback) => {
    socket.on(eventName, callback);
  };


  
  return (
    <SocketContext.Provider value={{socket, sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;