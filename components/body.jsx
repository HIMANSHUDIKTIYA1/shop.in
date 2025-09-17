

import React, { useEffect } from "react";
import { FaShippingFast, FaExchangeAlt, FaHeadset, FaLock, FaTag, FaTshirt } from "react-icons/fa";
import Link from "next/link";
const features = [
  {
    icon: <FaTshirt className="text-orange-600 w-12 h-12 mb-3" />,
    title: "Best Quality Products",
    description: "All our products are quality-checked and made from premium materials.",
  },
  {
    icon: <FaShippingFast className="text-orange-600 w-12 h-12 mb-3" />,
    title: "Fast Delivery in 7 Days",
    description: "We ensure that your order reaches your doorstep within 7 days.",
  },
  {
    icon: <FaExchangeAlt className="text-orange-600 w-12 h-12 mb-3" />,
    title: "Easy Return Policy",
    description: "If you're not satisfied, return the product within 7 days hassle-free.",
  },
  {
    icon: <FaHeadset className="text-orange-600 w-12 h-12 mb-3" />,
    title: "24/7 Customer Support",
    description: "Our support team is always available to assist you anytime.",
  },
  {
    icon: <FaLock className="text-orange-600 w-12 h-12 mb-3" />,
    title: "100% Secure Payments" ,
    description: "Our payment system is fully secure, ensuring your money is safe.",
  },
  {
    icon: <FaTag className="text-orange-600 w-12 h-12 mb-3" />,
    title: "Affordable Prices",
    description: "We offer the best quality products at unbeatable prices.",
  },
];

const Body = () => {
 
const [product , setProduct] = React.useState([])
      useEffect(()=>{
      const products = async()=>{
      const res = await fetch("/api/getproducts");
      const data = await res.json();
     setProduct(data)
      
     }
products()
      },[])
      
  return (
    <div className=" static">
      <section className="text-gray-600 body-font">
       
        <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-4xl text-xl font-bold title-font mb-4 text-gray-900">
            Buy Products with <span className="text-orange-600">@diktiyastore</span>
          </h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-lg">
            Express your own style with trending products.
          </p>
          </div>
         <div className="p-6">
      <h2 className="text-2xl font-bold text-black mb-4">Top Products for you</h2>
      <div>

      <div style={ { scrollbarWidth: "none" }} className="  relative flex flex-row w-full overflow-scroll  scrollbar ">
     
 {product?.map((item, index) => (
          <Link
            key={index}
            href={`/Products/${item.slug}`} // ✅ dynamic link (customize here)
           
             className="min-w-[250px] max-w-[250px] border rounded-lg shadow hover:shadow-lg transition m-4 p-4 bg-white"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full  object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">₹{item.price}</p>
          </Link>
        ))}
     
       
      </div>

      </div>
 
    </div>
      <button className="flex mx-auto mt-16 text-white bg-orange-600 border-0 py-3 px-10 focus:outline-none hover:bg-orange-700 rounded text-lg transition duration-300 transform hover:scale-105">
            Shop Now
          </button>
    <br />
    <br />
     <br />
    <br />
    <marquee behavior="" direction="" width="100%"   className=" text-white bg-red-600 p-2 m-2 font-bold" scrollamount="10"> <span>🔥 Flat 50% Off | 🚚 Free Delivery | 💳 Easy Returns    </span>     </marquee>
          <div className="flex flex-wrap -m-4">
            {features.map((feature, index) => (
              <div key={index} className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-orange-50">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h2 className="text-lg text-gray-900 font-medium title-font text-center">
                    {feature.title}
                  </h2>
                  <p className="leading-relaxed text-base text-center mt-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        
        </div>
      </section>
    </div>
  );
};

export default Body;
