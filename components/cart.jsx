// import React from 'react'

// const cart = () => {
//     const [cart, setCart] = useState({})
//     const [subTotal, setSubtotal] = useState(0)
//     useEffect(()=>{
//       console.log("hey")
//       try{
//         if(localStorage.getItem("cart")){
//           setCart(JSON.parse(localStorage.getItem("cart")))
//         }
//       }
//       catch(error){
//         console.error(error);
//         localStorage.clear()
//       }
     
//     },[])
//     const saveCart =(myCart)=>{
//       localStorage.setItem("cart", myCart)
//       let subt = 0;
//       let keys = object.keys(cart);
//       for(let i=0; keys.length;i++){
//         subt += myCart[keys[i]].price*myCart[keys[i]].qty;
//       }
//       subTotal(subt)
//     }
//     const addtoCart = (itemCode , qty, price,name, size, variant) =>{
//       let newCart = cart;
//       if(itemCode in cart){
//         newCart[itemCode].qty = cart[itemCode].qty + qty
        
//         } else{
//           newCart[itemCode] =  {qty: 1 , price, name,size ,variant} 
//            }
    
//     setCart(newCart)
//   saveCart(newCart)
//   }
//   const clearCart = () =>{
//     setCart({})
//     saveCart({})
//   }
//   const removeFromCart = (itemCode , qty, price,name, size, variant) =>{
//     let newCart = cart;
//     if(itemCode in cart){
//       newCart[itemCode].qty = cart[itemCode].qty - qty;
      
//       } 
  
//   if(newCart[itemCode].qty<=0){
//     delete newCart[itemCode]
//   }
//   setCart(newCart)
//   saveCart(newCart)
//   }
//   console.log(cart, addtoCart, removeFromCart, clearCart, subTotal);
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default cart

// "use client"
// import React, { useContext } from 'react';
// import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
// import { IoBagCheckOutline } from "react-icons/io5";
// import CartContext from '@/app/context/CartContext';

// const CartModule = () => {
//   const { cartItems, setCartItems } = useContext(CartContext);

//   const handleQuantityChange = (itemId, change) => {
//     setCartItems(prevCartItems =>
//       prevCartItems.map(item =>
//         item.id === itemId ? { ...item, quantity: item.quantity + change } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const hasItems = cartItems.length > 0;

//   return (
//     <div>
//       {hasItems ? (
//         <ol className='list-decimal'>
//           {cartItems.map(item => (
//             <li key={item.id}>
//               <div className='item justify-center items-center flex my-2'>
//                 <div className='mx-2'> {item.name} </div>
//                 <FaPlusCircle
//                   className='text-orange-500 cursor-pointer'
//                   onClick={() => handleQuantityChange(item.id, 1)}
//                 />
//                 <span className='mx-1'> {item.quantity} </span>
//                 <FaMinusCircle
//                   className={`text-orange-500 cursor-pointer ${item.quantity === 0 ? 'disabled' : ''}`}
//                   onClick={() => (item.quantity > 0 ? handleQuantityChange(item.id, -1) : null)}
//                 />
//               </div>
//             </li>
//           ))}
//         </ol>
//       ) : (
//         <p className="text-center text-gray-500">Cart is Empty</p>
//       )}

//       <div className="flex">
//         <button className="flex text-white justify-center items-center w-[150px] bg-orange-500 border-0 p-2 focus:outline-none hover:bg-orange-600 rounded text-sm mt-10 m-2">
//           <IoBagCheckOutline className='flex w-5 h-auto' /> Check out
//         </button>
//         <button className="flex text-white justify-center items-center w-[60px] bg-orange-500 border-0 focus:outline-none hover:bg-orange-600 rounded text-sm mt-10 m-2" onClick={clearCart}>
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartModule;
