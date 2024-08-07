import React from 'react'
import Link from 'next/link'
const Tshirts = () => {
  return (
    <div>
    <section className="text-gray-600 static body-font items-center cursor-pointer">
       <div className="container px-5 py-24 mx-auto">
       <div className="flex flex-wrap justify-center">
      
       <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      
         <div className="shadow-lg m-2">
         <Link href={'/Products/code-js dekho '}>
             <img alt="ecommerce" className="w-full h-auto" src="https://m.media-amazon.com/images/I/612Rl6GKHoL._SX679_.jpg"/>
             </Link>

           <div className="mt-4">
             <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
             <h2 className="text-gray-900 title-font text-lg font-medium">T shirt</h2>
             <p className="mt-1">₹400</p>
             <p>S, M, L, XL, XXL, XXXL</p>
           </div>
         </div>
       </div>
      
     
         
   
    
    
    
  
   </div>
 </div>
</section>

   </div>
  )
}
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
 
  return {
    props: {},
  }
}
export default Tshirts
