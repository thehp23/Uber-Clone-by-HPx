import { createContext, useContext, useState } from "react";

const RentalContext = createContext();

export const RentalProvider = ({ children }) => {

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [time, setTime] = useState("Pickup now");
  const [hours, setHours] = useState(1);
  const [riderType, setRiderType] = useState("me");

  return (
    <RentalContext.Provider
      value={{
        pickup,
        setPickup,
        drop,
        setDrop,
        time,
        setTime,
        hours,
        setHours,
        riderType,
        setRiderType
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => useContext(RentalContext);