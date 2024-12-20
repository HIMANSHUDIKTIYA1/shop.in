"use client"
import React,{useContext} from 'react'

import CartContext from '../context/CartContext.jsx';

const order = () => {
  const { cartItems } = useContext(CartContext);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const name = cartItems.map((item) =>  item.name  );
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">DIKTIYASTORE.COM</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">ORDER ID: #55343443</h1>
        
        <p className="leading-relaxed mb-4">your order has been successfully palced </p>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Product </span>
          <span className="ml-auto text-gray-900">{name}</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Color </span>
          <span className="ml-auto text-gray-900">(black/xl)</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Size</span>
          <span className="ml-auto text-gray-900">Medium</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-gray-500">Quantity</span>
          <span className="ml-auto text-gray-900">{totalItems}</span>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900"> Total: ₹{totalPrice}</span>
          <button className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Track order</button>
        
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
    </div>
  </div>
</section>
    </div>
  )
}

export default order
