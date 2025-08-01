import mongoose from 'mongoose';
import Product from '../models/Products';
import Link from 'next/link';
import connectDb from '../middleware/mongoose';

const Mugs = async () => {
  await connectDb();

  // Mugs के उत्पादों को लोड करना
  const products = await Product.find({ category: 'mugs' });

  // यदि उत्पाद लोड नहीं हो रहे हैं तो लोडिंग संकेत दिखाना
  if (!products || products.length === 0) {
    return <p>Loading products...</p>; // या <p>No products found</p>;
  }

  return (
    <div>
      <section className="text-gray-600 static body-font items-center cursor-pointer">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex m-auto flex-wrap items-center justify-center">
            {products.map((product) => (
              <div
                key={product._id}
                className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-2"
              >
                <Link href={`/Products/${product.slug}`}>
                  <img
                    alt="ecommerce"
                    className="w-full h-80"
                    src={product.img}
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.title}
                  </h2>
                  <p className="mt-1">₹{product.price}</p>

                  <div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Mugs;
