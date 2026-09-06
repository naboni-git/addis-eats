import { createContext, useState } from "react";

export const someContext = createContext(null);

export const SomeProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({ items: [] });

  return (
    <someContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </someContext.Provider>
  );
};
