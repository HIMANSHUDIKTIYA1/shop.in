"use client"
import React, { useContext, useEffect } from 'react';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
 import Link from 'next/link';
import CartContext from '@/app/context/CartContext.jsx';

const CartModule = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    // जब कंपोनेंट माउंट होता है, तब लोकल स्टोरेज से कार्ट आइटम्स लोड करें
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, [setCartItems]);

  useEffect(() => {
    // जब भी कार्ट आइटम्स बदलते हैं, तब उन्हें लोकल स्टोरेज में सहेजें
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (itemId, change) => {
    setCartItems(prevCartItems =>
      prevCartItems
        .map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + change } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const hasItems = cartItems.length > 0;

  return (
    <div className=' '>
      {hasItems ? (
        <div className=' '>
          <ol className='list-decimal   '>
            {cartItems.map(item => (
              <li key={item.id}>
                <div className='item justify-center items-center flex my-2'>
                  <div className='mx-2'> {item.name} ({item.size}/{item.color}) </div> 
                  <div> </div>
                  <FaPlusCircle
                    className='text-orange-500 cursor-pointer'
                    onClick={() => handleQuantityChange(item.id, 1)}
                  />
                  <span className='mx-1'> {item.quantity} </span>
                  <FaMinusCircle
                    className={`text-orange-500 cursor-pointer ${item.quantity === 0 ? 'disabled' : ''}`}
                    onClick={() => (item.quantity > 0 ? handleQuantityChange(item.id, -1) : null)}
                  />
                </div>
              </li>
            ))}
          </ol>
         
          <div className="mt-4">
            <p className="text-lg font-semibold">Total Items: {totalItems}</p>
            <p className="text-lg font-semibold">Total Price: ₹{totalPrice}</p>
          </div> 
        </div>
        
      ) : (
        <p className="text-center text-gray-500">Cart is Empty</p>
      )}
        <div className="flex">
       <Link href={'/checkout'}><button className="flex text-white justify-center items-center w-[150px] bg-orange-500 border-0 p-2 focus:outline-none hover:bg-orange-600 rounded text-sm mt-10 m-2">
          <IoBagCheckOutline className='flex w-5 h-auto' /> Check out
        </button></Link> 
        <button className="flex text-white justify-center items-center w-[60px] bg-orange-500 border-0 focus:outline-none hover:bg-orange-600 rounded text-sm p-2 mt-10 m-2" onClick={clearCart}>
          Clear
        </button>
      </div>

    </div>
  );
};

export default CartModule;
