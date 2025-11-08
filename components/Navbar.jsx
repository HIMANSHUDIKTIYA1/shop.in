"use client";
import React, { useContext, useRef, useState, useEffect } from "react";
import Cart from "./cartModul";
import Image from "next/image";
import Link from "next/link";
import { FaCartPlus, FaBars, FaTimes } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { ImCross } from "react-icons/im";
import CartContext from "@/app/context/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [hidden, setHidden] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartRef = useRef();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const welcomeShownRef = useRef(false);

  // Auto-hide Navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > prevScrollY && currentScrollY > 50);
      setPrevScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  // Check admin session for navbar state
  useEffect(() => {
    const loadSession = async () => {
      try {
        const [adminRes, userRes] = await Promise.all([
          fetch('/api/auth/session'),
          fetch('/api/auth/user-session')
        ]);
        
        let adminData = null;
        let userData = null;
        
        if (adminRes.ok) {
          adminData = await adminRes.json();
          setIsAdmin(Boolean(adminData?.isAdmin));
        }
        
        if (userRes.ok) {
          userData = await userRes.json();
          setUser(userData?.user || null);
        }
        
        // Show welcome toast - prioritize admin, then user
        if (!welcomeShownRef.current) {
          if (adminData?.admin?.name) {
            welcomeShownRef.current = true;
            toast.success(`Welcome, ${adminData.admin.name} (Admin)`);
          } else if (userData?.user?.name) {
            welcomeShownRef.current = true;
            toast.success(`Welcome, ${userData.user.name}`);
          }
        }
      } catch (err) {
        setIsAdmin(false);
        setUser(null);
      }
    };
    loadSession();
  }, []);

  // Close menus on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setAccountOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Toggle Cart - Original Logic
  const toggleCart = () => {
    if (cartRef.current.classList.contains("translate-x-full")) {
      cartRef.current.classList.remove("translate-x-full");
      cartRef.current.classList.add("translate-x-0");
    } else {
      cartRef.current.classList.remove("translate-x-0");
      cartRef.current.classList.add("translate-x-full");
    }
  };

  const menuItems = ["Tshirts", "Hoodies", "Stickers", "Mugs"];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes menuSlide {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-link {
          position: relative;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6b35, #f7931e);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }

        .menu-item {
          animation: menuSlide 0.4s ease forwards;
          opacity: 0;
        }
        
        .menu-item:nth-child(1) { animation-delay: 0.05s; }
        .menu-item:nth-child(2) { animation-delay: 0.1s; }
        .menu-item:nth-child(3) { animation-delay: 0.15s; }
        .menu-item:nth-child(4) { animation-delay: 0.2s; }
      `}} />

      {/* Navbar */}
      <div
        className={`fixed w-full top-0 bg-white shadow-md z-50 transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo - Original */}
          <Link href="/">
            <Image
              alt="store"
              width={150}
              height={42}
              className="cursor-pointer transform transition-transform hover:scale-105"
              priority
              src="/store.png"
            />
          </Link>

          {/* Desktop Menu - Improved */}
          <nav className="hidden md:flex space-x-8 font-semibold text-lg">
            {menuItems.map((item, index) => (
              <Link key={index} href={`/${item}`}>
                <span className="nav-link cursor-pointer px-2 py-2 transition-all duration-200 hover:text-orange-600 inline-block">
                  {item}
                </span>
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            {/* Account Menu */}
            <div className="relative">
              <button 
                onClick={() => setAccountOpen(!accountOpen)} 
                className="flex items-center justify-center w-10 h-10 text-orange-500 transition-all duration-200 hover:text-orange-600 rounded-full hover:bg-orange-50"
              >
                <MdAccountCircle className="w-7 h-7" />
              </button>
              
              {accountOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 bg-black/10 z-40"
                    style={{ animation: 'fadeIn 0.2s ease' }}
                    onClick={() => setAccountOpen(false)}
                  />
                  
                  {/* Dropdown */}
                  <div 
                    className="absolute right-0 mt-2 min-w-[250px] max-w-[500px] bg-white shadow-xl rounded-lg p-2 z-50 border border-gray-100"
                    style={{ animation: 'slideDown 0.2s ease' }}
                  >
                    {user && !isAdmin && (
                      <div className=" ">
                        <div className="px-3 py-2 text-sm bg-orange-50 rounded mb-1">
                          Welcome, <span className="font-semibold text-orange-600">{user.name}</span>
                        </div>
                        <Link href="/account" onClick={() => setAccountOpen(false)} className="block px-3 py-2 hover:bg-gray-50 rounded transition-colors">
                          Profile
                        </Link>
                        <button onClick={async () => { 
                          await fetch('/api/auth/clear-user', { method: 'POST' }); 
                          setUser(null); 
                          setAccountOpen(false); 
                        }} className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded transition-colors">
                          Clear Session
                        </button>
                      </div>
                    )}
                    {!user && !isAdmin && (
                      <>
                        <Link href="/login" onClick={() => setAccountOpen(false)} className="block px-3 py-2 hover:bg-gray-50 rounded transition-colors">
                          User Login
                        </Link>
                        <Link href="/signIn" onClick={() => setAccountOpen(false)} className="block px-3 py-2 hover:bg-gray-50 rounded transition-colors">
                          User Signup
                        </Link>
                        <div className="my-1 border-t border-gray-200" />
                        <Link href="/admin/login" onClick={() => setAccountOpen(false)} className="block px-3 py-2 hover:bg-gray-50 rounded transition-colors text-gray-700">
                          Admin Login
                        </Link>
                        <Link href="/admin/signup" onClick={() => setAccountOpen(false)} className="block px-3 py-2 hover:bg-gray-50 rounded transition-colors text-gray-700">
                          Admin Signup
                        </Link>
                      </>
                    )}
                    {isAdmin && (
                      <>
                        <Link href="/admin" onClick={() => setAccountOpen(false)} className="block px-3 py-2 hover:bg-gray-50 rounded transition-colors">
                          Admin Dashboard
                        </Link>
                        <Link href="/admin/products/new" onClick={() => setAccountOpen(false)} className="block px-3 py-2 hover:bg-gray-50 rounded transition-colors">
                          Create Product
                        </Link>
                        <button onClick={async () => { 
                          await fetch('/api/auth/logout', { method: 'POST' }); 
                          setIsAdmin(false); 
                          setAccountOpen(false); 
                        }} className="block w-full text-left px-3 py-2 hover:bg-red-50 rounded transition-colors text-red-600">
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center w-10 h-10 text-orange-500 transition-all duration-200 hover:text-orange-600 rounded-full hover:bg-orange-50"
            >
              <FaCartPlus className="w-7 h-7" />
              {totalItems > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </div>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-orange-500 text-2xl transition-all duration-200 hover:text-orange-600"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gradient-to-br from-orange-500 to-orange-600 z-[60]"
            style={{ animation: 'fadeIn 0.3s ease' }}
          />
          
          {/* Menu Content */}
          <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl hover:rotate-90 transition-transform duration-300"
            >
              <FaTimes />
            </button>

            {/* Menu Items */}
            <nav className="flex flex-col items-center space-y-6">
              {menuItems.map((item, index) => (
                <Link key={index} href={`/${item}`} onClick={() => setMobileMenuOpen(false)}>
                  <span className="menu-item text-white text-3xl font-bold cursor-pointer hover:scale-105 transition-transform duration-200 block">
                    {item}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Side Cart - Original Logic */}
      <div
        ref={cartRef}
        className="fixed z-[50] top-0 right-0 h-screen w-full md:w-[450px] bg-gradient-to-b from-orange-100 to-white transition-transform duration-300 translate-x-full overflow-y-auto py-10 px-8 shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Shopping Cart</h1>
        <button
          onClick={toggleCart}
          className="absolute top-5 right-5 text-orange-500 hover:text-orange-600 hover:rotate-90 transition-all duration-300"
        >
          <ImCross />
        </button>
        <Cart />
      </div>

      {/* Toast Container - Original */}
      <ToastContainer 
        position="top-right" 
        autoClose={4000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
      />
    </>
  );
};

export default Navbar;