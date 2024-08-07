"use client"
import { useState, useContext } from 'react';
import CartContext from '@/app/context/CartContext';
import Link from 'next/link';
const ProductPage = ({ params }) => {
  const [pin, setPin] = useState('');
  const [service, setService] = useState(null);
  const { slug } = params;
  const { cartItems, setCartItems } = useContext(CartContext);

  const checkServiceability = async () => {
    let pins = await fetch('http://localhost:3000/api/pincodes');
    let pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
    } else {
      setService(false);
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const addToCart = () => {
    const newCartItem = { id: cartItems.length + 1, name: `Diktiya Store Product: ${cartItems.length + 1}`, quantity: 1, price: 344 };
    setCartItems([...cartItems, newCartItem]);
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded" src="https://m.media-amazon.com/images/I/61Qska1i4gL._SX679_.jpg" />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>
              <div className="flex mb-4">
                {/* Add your star rating here */}
              </div>
              <p className="leading-relaxed">Fam locavore kickstarter distillery...</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/* Add color and size options here */}
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">₹758</span>
                <button onClick={addToCart} className="flex ml-5 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded">Add To Cart</button>
               <Link href='/checkout'><button  className="flex ml-4 text-white bg-orange-500 border-0 py-2 px-4 focus:outline-none hover:bg-orange-600 rounded">Buy</button></Link> 
                <button onClick={(check) => { check.target.style.color = 'orange'; }} onDoubleClick={(check) => { check.target.style.color = 'gray'; }} className="rounded-full ml-2 w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className='flex m-5'>
                <input onChange={onChangePin} className='border-gray-500 border-2 p-1' type="search" placeholder='Search pincode' />
                <button onClick={checkServiceability} className="flex ml-1 text-white bg-orange-400 border-0 py-1 px-6 focus:outline-none hover:bg-orange-600 rounded">Check</button>
              </div>
              {!service && service !== null && <div className='text-red-700 text-sm mt-3'>Sorry, we do not deliver to this pincode</div>}
              {service && service !== null && <div className='text-green-700 text-sm mt-3'>This pincode is Serviceable</div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
