import { useReducer, useMemo } from "react";
import { someContext } from "./CartContext";
import { cartReducer, initialState, getTotal, getCount } from "./cartReducer";

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Memoize to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      cartItems: state,
      dispatch,
      total: getTotal(state.items),
      count: getCount(state.items),
    }),
    [state],
  );

  return <someContext.Provider value={value}>{children}</someContext.Provider>;
}
