 "use client"
import React, { useContext, useRef } from 'react'
import Cart from './cartModul'
import Image from 'next/image'
 import Link from 'next/link'
 
 
 import { FaPlusCircle,FaMinusCircle } from "react-icons/fa";
 
 import { FaCartPlus } from "react-icons/fa6";
 import { MdAccountCircle } from "react-icons/md";
 import { ImCross } from "react-icons/im";
import CartContext from '@/app/context/CartContext'
 
const navbar = () => {

  const {cartItems} = useContext(CartContext);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const togglecart = () => {
if(ref.current.classList.contains('translate-x-full')){
  ref.current.classList.remove('translate-x-full')
  ref.current.classList.add('translate-x-0')
}
else if (!ref.current.classList.contains('translate-x-full')){
  ref.current.classList.remove('translate-x-0')
  ref.current.classList.add('translate-x-full')
}

  }
  const ref = useRef();
  return (
   <>
   <div className='sticky block top-0'>
<div className='   bg-white top-0 flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md'>
  <div className="logo mx-5 justify-center items-center flex align-center">
   <Link href={'/'}> <Image alt={'store'} width={190} height={100} className=' sm:mt-0 mt-2 mr-[130px]  ' priority src="/store.png"/></Link>
    
     </div>
  <div className="nav p-2 ">
    <ul className=' flex  items-center space-x-2 font-bold md:text-xl p-2  '>
      <Link href={'/Tshirts'}>  <li  className=' px-1   hover:text-red-600 hover:shadow-yellow-500  sm:px-4'>Tshirts</li> </Link>
      <Link href={'/Hoodies'}>   <li className=' px-1   hover:text-red-600 hover:shadow-yellow-500  sm:px-4' >Hoodies</li></Link>
      <Link href={'/Stickers'}>  <li  className=' px-1  hover:text-red-600 hover:shadow-yellow-500   sm:px-4'>Stickers</li></Link> 
      <Link href={'/Mugs'}>      <li  className=' px-1  hover:text-red-600 hover:shadow-yellow-500   sm:px-4'>Mugs</li> </Link> 
    </ul>
  </div>
  
  <div className='cart absolute  flex right-0 top-0 '>
 <Link href='/login'> <button  className='items-center  justify-center  align-center flex w-[40px] h-[50px]  mt-2     p-0'>  <MdAccountCircle className= ' text-orange-500 w-7 h-7  ' /> </button></Link>
 <button onClick={togglecart} className='items-center  justify-center align-center flex w-[40px] h-[50px]  mr-6 mt-2  p-0'>  < FaCartPlus className=' text-orange-500 w-7 h-7  ' /> 
 <div className='absolute top-0 mt-2 right-0 bg-red-500 text-white rounded-full w-5 h-5 mr-4 flex items-center justify-center text-sm'>
               {totalItems}   
                </div>
 </button>
  </div>
  <div ref={ref} className='sidecart overflow-y-scroll transition-transform translate-x-full  absolute top-0 bg-orange-200 right-0   h-[700px] w-72 py-10 px-8'>
     <h1 className='font-bold text-xl  mb-8 text-center p-1 '>Shopping cart</h1>
     <span  onClick={togglecart} className=' absolute top-5 right-2 cursor-pointer text-orange-500'><ImCross/></span>
   
 
      <Cart className=" " /> 
   
   
    
  </div>
 
</div>
</div>
   </>
  )
}

export default navbar
