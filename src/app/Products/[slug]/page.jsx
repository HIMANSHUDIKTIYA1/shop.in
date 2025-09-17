"use client";
import { useState, useEffect, useContext } from 'react';
import CartContext from '@/app/context/CartContext';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = ({ params }) => {
  const { slug } = params;
  
  const [pin, setPin] = useState('');
  const [service, setService] = useState(null);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [product, setProduct] = useState();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Pin code check logic
  const checkServiceability = async () => {

    let pins = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pincodes`);

    let pinJson = await pins.json();
    setService(pinJson.includes(parseInt(pin)));
  
if(pinJson.includes(parseInt(pin))){
setService(true);
  toast.success('This pincode is Serviceable',{

    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

}else{
  setService(false);
  toast.error('Sorry, we do not deliver to this pincode',{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}};
  const onChangePin = (e) => setPin(e.target.value);

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.warning('please select size and color !!',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }else{
      toast("product add to cart !");
    }
    const newCartItem = {
      id: cartItems.length,
      name: product.title,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      img: product.img,
    };
    setCartItems([...cartItems, newCartItem]);
  };

  const fetchProduct = async () => {
    const response = await fetch(`/api/findproduct/${slug}`);
    if (response.ok) {
      const data = await response.json();
      setProduct(data);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {product ? (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded" src={product.img} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                <p className="leading-relaxed">{product.desc}</p>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  
/>
                {/* Color Selection */}
                <div className=' flex p-3 m-3'>
                <div className="flex p-2 m-2">
                  {product.color.map((col) => (
                    <button
                      key={col}
                      className={`border-2 rounded-full w-6 h-6 m-1 ${selectedColor === col ? 'border-blue-800' : 'border-gray-300'}`}
                      style={{ backgroundColor: col.toLowerCase() }}
                      onClick={() => setSelectedColor(col)}
                    ></button>
                  ))}
                </div>

                {/* Size Selection */}
                <select
                  className="rounded border p-2 border-gray-300"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Select Size</option>
                  {product.size.map((sz) => (
                    <option key={sz} value={sz}>{sz}</option>
                  ))}
                </select>

                </div>
                
                <div className="flex mt-4">
                  <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
                  <button
                    onClick={addToCart}
                    className="flex ml-5 text-white bg-orange-500 border-0 py-2 px-4 hover:bg-orange-600 rounded"
                  >
                    Add To Cart
                  </button>
                  <Link href="/checkout">
                    <button className="flex ml-4 text-white bg-orange-500 border-0 py-2 px-4 hover:bg-orange-600 rounded">
                      Buy
                    </button>
                  </Link>
                  <button id='heart' onClick={(heart) => { document.getElementById("heart").style.color = 'orange'; }} onDoubleClick={() => { document.getElementById("heart").style.color = 'gray'; }} className="rounded-full ml-2 w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
           <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
             <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
           </svg>
         </button>
                </div>

                <div className="flex mt-5">
                  <input
                    onChange={onChangePin}
                    className="border-gray-500 border-2 p-1"
                    type="search"
                    placeholder="Search pincode"
                  />
                  <button
                    onClick={checkServiceability}
                    className="flex ml-1 text-white bg-orange-400 border-0 py-1 px-6 hover:bg-orange-600 rounded"
                  >
                    Check
                  </button>
                </div>
                {!service && service !== null && (
                  <div className="text-red-700 text-sm mt-3">Sorry, we do not deliver to this pincode </div>

                )}
                {service && service !== null && (
                  <div className="text-green-700 text-sm mt-3">This pincode is Serviceable</div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;
