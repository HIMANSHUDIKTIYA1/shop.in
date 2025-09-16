"use client";
import React, { useContext, useRef, useState, useEffect } from "react";
import Cart from "./cartModul";
import Image from "next/image";
import Link from "next/link";
import { FaCartPlus, FaBars, FaTimes } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { ImCross } from "react-icons/im";
import CartContext from "@/app/context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [hidden, setHidden] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartRef = useRef();

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

  // Toggle Cart
  const toggleCart = () => {
    if (cartRef.current.classList.contains("translate-x-full")) {
      cartRef.current.classList.remove("translate-x-full");
      cartRef.current.classList.add("translate-x-0");
    } else {
      cartRef.current.classList.remove("translate-x-0");
      cartRef.current.classList.add("translate-x-full");
    }
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed w-full top-0 bg-white shadow-md z-50 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
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

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 font-semibold text-lg">
            {["Tshirts", "Hoodies", "Stickers", "Mugs"].map((item, index) => (
              <Link key={index} href={`/${item}`}>
                <span className="relative cursor-pointer px-4 py-2 transition duration-300 hover:text-orange-600  hover:scale-105">
                  {item}
                </span>
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/login">
              <button className="flex items-center justify-center w-10 h-10 text-orange-500 transition-transform duration-300 hover:scale-110">
                <MdAccountCircle className="w-7 h-7" />
              </button>
            </Link>
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center w-10 h-10 text-orange-500 transition-transform duration-300 hover:scale-110"
            >
              <FaCartPlus className="w-7 h-7" />
              {totalItems > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
                  {totalItems}
                </div>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-orange-500 text-2xl transition-transform hover:scale-110"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg">
            <ul className="flex flex-col items-center py-4 space-y-4 font-semibold text-lg">
              {["Tshirts", "Hoodies", "Stickers", "Mugs"].map((item, index) => (
                <li key={index}>
                  <Link href={`/${item}`} onClick={() => setMobileMenuOpen(false)}>
                    <span className="cursor-pointer px-4 py-2 transition duration-300 hover:text-orange-600 hover:underline">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Side Cart */}
      <div
        ref={cartRef}
        className="fixed top-0 right-0 h-screen w-72 bg-orange-200 transition-transform translate-x-full overflow-y-auto py-10 px-8 shadow-lg"
      >
        <h1 className="text-xl font-bold text-center mb-8">Shopping Cart</h1>
        <button
          onClick={toggleCart}
          className="absolute top-5 right-5 text-orange-500 hover:scale-110 transition"
        >
          <ImCross />
        </button>
        <Cart />
      </div>
    </>
  );
};

export default Navbar;
