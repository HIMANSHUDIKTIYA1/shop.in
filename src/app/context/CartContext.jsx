"use client"
import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
   
    if (typeof window !== 'undefined') {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    }
    return [];
  });

  useEffect(() => {
   
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
