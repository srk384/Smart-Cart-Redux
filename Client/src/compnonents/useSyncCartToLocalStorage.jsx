import { useEffect } from "react";

const useSyncCartToLocalStorage = (cartItems) => {

  useEffect(() => {
  if (cartItems && cartItems.length > 0) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } else {
    localStorage.removeItem("cart");
  }
}, [cartItems]);

};

export default useSyncCartToLocalStorage;
