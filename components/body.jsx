import React, { useEffect, useState } from "react";
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
    title: "100% Secure Payments",
    description: "Our payment system is fully secure, ensuring your money is safe.",
  },
  {
    icon: <FaTag className="text-orange-600 w-12 h-12 mb-3" />,
    title: "Affordable Prices",
    description: "We offer the best quality products at unbeatable prices.",
  },
];

const Body = () => {
  const [product, setProduct] = useState([]);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const products = async () => {
      const res = await fetch("/api/getproducts");
      const data = await res.json();
      setProduct(data);
    };
    products();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [product]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-orange-50/30">
      {/* Floating Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <section className="relative z-10 text-gray-600 body-font">
        <div className="container px-5 py-12 md:py-20 mx-auto">
          
          {/* Hero Section */}
          <div 
            id="hero" 
            className={`animate-on-scroll flex flex-wrap w-full mb-16 md:mb-24 flex-col items-center text-center ${isVisible.hero ? 'fade-in-up' : 'opacity-0'}`}
          >
            <div className="relative">
              <h1 className="text-3xl sm:text-3xl md:text-4xl font-black mb-6 text-gray-900 ">
                Buy Products with
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
                  @diktiyastore
                </span>
              </h1>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-orange-400 rounded-full filter blur-3xl opacity-20"></div>
            </div>
            <p className="lg:w-2/3 w-full leading-relaxed text-gray-600 text-base md:text-lg max-w-2xl">
              Express your own style with trending products. Premium quality, unbeatable prices, and fast delivery.
            </p>
          </div>

          {/* Top Products Section */}
          <div 
            id="products" 
            className={`animate-on-scroll mb-16 md:mb-24 ${isVisible.products ? 'fade-in-up' : 'opacity-0'}`}
          >
            <div className="flex items-center justify-between mb-8 px-2">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                  Top Products <span className="text-orange-600">for you</span>
                </h2>
                <p className="text-gray-600 text-sm md:text-base">Handpicked collection of trending items</p>
              </div>
              <Link href="/all-products" className="hidden md:flex items-center text-orange-600 hover:text-orange-700 font-semibold group">
                View All
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="relative group">
              <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar scroll-smooth px-2">
                {product?.map((item, index) => (
                  <Link
                    key={index}
                    href={`/Products/${item.slug}`}
                    className="flex-shrink-0 w-64 md:w-72 group/card"
                  >
                    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-2">
                      {/* Image Container */}
                      <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <span className="text-white font-semibold text-sm bg-orange-500 px-4 py-2 rounded-full">
                            View Details →
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover/card:text-orange-600 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-orange-600">₹{item.price}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            4.5
                          </div>
                        </div>
                      </div>

                      {/* Badge */}
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        New
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Gradient Fade on edges */}
              <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-16 md:mb-24">
            <button className="group relative inline-flex items-center justify-center px-8 md:px-12 py-4 text-base md:text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 overflow-hidden">
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-96 group-hover:h-96 opacity-10"></span>
              <span className="relative flex items-center">
                Shop Now
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Animated Banner */}
          <div className="mb-16 md:mb-24 overflow-hidden rounded-2xl">
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white font-bold py-4 md:py-5 px-6 flex items-center shadow-xl">
              <div className="animate-marquee whitespace-nowrap flex items-center space-x-12">
                <span className="flex items-center text-sm md:text-base">
                  🔥 Flat 50% Off
                </span>
                <span className="flex items-center text-sm md:text-base">
                  🚚 Free Delivery
                </span>
                <span className="flex items-center text-sm md:text-base">
                  💳 Easy Returns
                </span>
                <span className="flex items-center text-sm md:text-base">
                  🔥 Flat 50% Off
                </span>
                <span className="flex items-center text-sm md:text-base">
                  🚚 Free Delivery
                </span>
                <span className="flex items-center text-sm md:text-base">
                  💳 Easy Returns
                </span>
              </div>
            </div>
          </div>

        

          {/* Features Grid */}
          <div 
            id="features" 
            className={`animate-on-scroll ${isVisible.features ? 'fade-in-up' : 'opacity-0'}`}
          >
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose <span className="text-orange-600">Us?</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                Experience premium quality and unmatched service with every purchase
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:border-orange-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <h2 className="text-lg md:text-xl text-gray-900 font-bold text-center mb-3 group-hover:text-orange-600 transition-colors">
                      {feature.title}
                    </h2>
                    <p className="leading-relaxed text-sm md:text-base text-center text-gray-600">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-100 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;