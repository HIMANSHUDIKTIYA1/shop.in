"use client"
import React, { useContext, useEffect, useState } from 'react';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoBagCheckOutline, IoClose } from "react-icons/io5";
import Link from 'next/link';
import CartContext from '@/app/context/CartContext.jsx';

const CartModule = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, [setCartItems]);

  useEffect(() => {
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
const checkOut = ( ) =>{
   setIsOpen(false)
}
  return (
    <>
      {/* Floating Cart Button */}
      <button
        className="fixed bottom-6 right-6 z-40 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        🛒 Cart ({totalItems})
      </button>

      {/* Full-Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800">🛒 Your Cart</h2>
            <button
              className="text-gray-600 hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              <IoClose size={30} />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {hasItems ? (
              <div>
                <ol className="space-y-4">
                  {cartItems.map(item => (
                    <li key={item.id}>
                      <div className="flex justify-between items-center bg-[#faf9f6] rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className='flex flex-row p-2 m-2'>
                         
                          <img src={item.img} alt=""  className='flex sm:w-8 w-5 mr-2'/>
                          <div className=' ml-2 '>
                         <p className="font-medium text-gray-700">{item.name} </p>
                          <p className="text-sm text-gray-500">{item.size} / {item.color}</p>
                          </div>
                         
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaPlusCircle
                            className="text-orange-500 cursor-pointer hover:scale-110 transition"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          />
                          <span className="text-gray-700 font-medium">{item.quantity}</span>
                          <FaMinusCircle
                            className="text-orange-500 cursor-pointer hover:scale-110 transition"
                            onClick={() => (item.quantity > 0 ? handleQuantityChange(item.id, -1) : null)}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 bg-[#faf9f6] rounded-xl p-5 shadow-sm border border-gray-100">
                  <p className="text-lg font-semibold text-gray-800">Total Items: <span className="text-orange-500">{totalItems}</span></p>
                  <p className="text-lg font-semibold text-gray-800">Total Price: <span className="text-orange-500">₹{totalPrice}</span></p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-10">Cart is Empty</p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center sm:justify-end gap-4 px-6 py-4 border-t shadow-sm">
            <Link href={'/checkout'}>
              <button onClick={checkOut} className="flex items-center gap-2 text-white bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-xl shadow hover:shadow-md hover:scale-105 transition">
                <IoBagCheckOutline className="w-5 h-5" /> Check out
              </button>
            </Link>
            <button
              className="text-orange-600 border border-orange-400 bg-white px-6 py-3 rounded-xl shadow hover:bg-orange-50 hover:scale-105 transition"
              onClick={clearCart}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CartModule;
