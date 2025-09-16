"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
const images = [
  "/Home.png",
  "/banner1.jpg",
  "/banner2.jpg",
  "/banner3.png",
  "/banner4.png",
  "/banner5.jpg",
  "/banner6.png",
  "/banner7.png",
  "/banner8.png",
  "/banner9.png",
  "/banner10.png",
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mt-[50px] flex flex-col  h-[400px] sm:h-[600px] w-full max-w-[1300px]  mx-auto  overflow-auto rounded-2xl shadow-lg">

      {images.map((img, index) => (
       <motion.div
  key={index}
  className="   top-0 left-0 w-full sm:h-[full] h-[full] "
  initial={{ opacity: 0, scale: 1.05 }}
  animate={{
    opacity: current === index ? 1 : 1,
    scale: current === index ? 1 : 1.05,
  }}
  transition={{ duration: 0.2 }}
>
    
 <Image
    src={img}
   fill

    alt={`Slide ${index}`}

    className={` rounded-2xl ${current=== index ? "flex" : "hidden"} `}
    priority={index === 0}
   
  />
    
 
</motion.div>
      ))}

      {/* Dots indicator */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
