import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../../components/Navbar.jsx'
import Foot from '../../components/foot.jsx'
import {CartProvider} from "./context/CartContext"; 
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Diktiya Store: Apni Pasand Ki Duniya ",
  description: "this is online store ",
};

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
      <body className={inter.className}>
        
     
      <CartProvider>
      <Navbar />
          {children}
       <Foot/>
      </CartProvider>
      
      
     
      
      </body>
    </html>
   </>
  );
}
