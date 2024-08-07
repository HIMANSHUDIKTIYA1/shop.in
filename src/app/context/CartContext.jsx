"use client"
import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // पेज लोड होने पर लोकल स्टोरेज से कार्ट आइटम्स लोड करें
    if (typeof window !== 'undefined') {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    }
    return [];
  });

  useEffect(() => {
    // जब भी कार्ट आइटम्स बदलते हैं, तब उन्हें लोकल स्टोरेज में सहेजें
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
