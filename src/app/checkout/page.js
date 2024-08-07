"use client"
import React, {useContext} from 'react'
import { MdOutlinePayments } from "react-icons/md";
import CartContext from '../context/CartContext';
const page = () => {
    const { cartItems } = useContext(CartContext);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (

    <div>

      <h1 className='m-3 text-3xl font-bold justify-center flex items-center '> Checkout</h1>
      <h2 className=' font-bold text-xl m-5'> Delivery details</h2>
      <div className="mx-auto flex ">
        <div className="px-2  w-1/2">
        <div class="  mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" placeholder='example@gmail.com' className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div className='px-2  w-1/2'>
      <div class="  mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input type="text" id="name" name="name" placeholder='Enter your Full Name' className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>  
      </div>
      <div className='px-2 max-w-[1000px]  min-w-[370px] '>
      <div class="  mb-4">
        <label htmlFor="Adress" className="leading-7 text-sm text-gray-600">Address</label> 
        <textarea type="Address" id="Address" placeholder='Enter your Address' name="Address" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" >

        </textarea>
      </div>
      </div>  
 <div className="mx-auto flex ">
        <div className="px-2  w-1/2">
        <div class="  mb-4">
        <label htmlFor="number" className="leading-7 text-sm text-gray-600">Phone</label>
        <input type="number" id="number" placeholder='Enter your Number' name="phoneno" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div className='px-2  w-1/2'>
      <div class="  mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">City</label>
        <input type="city" id="City" name="name" placeholder='Enter your City' className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>  
      </div>
      <div className="mx-auto flex ">
        <div className="px-2  w-1/2">
        <div class="  mb-4">
        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
        <input type="state" id="state" name="state" placeholder='Enter your State' className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div className='px-2  w-1/2'>
      <div class="  mb-4">
        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">pincode</label>
        <input type="number" id="pincode" name="pincode" placeholder='Enter your Pincode' className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>  
      </div>
      <h2 className=' flex font-bold text-xl m-5'> Pay Your Amount </h2>
      <div>
      <button className="flex text-white justify-center items-center w-[150px] bg-orange-500 border-0 p-2 focus:outline-none hover:bg-orange-600 rounded text-sm mt-3 m-2">
          <MdOutlinePayments className='flex w-5 h-auto' /> Pay ₹{totalPrice}
        </button>
      </div>
    </div>
  )
}

export default page
