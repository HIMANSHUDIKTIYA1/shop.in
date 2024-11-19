import mongoose from 'mongoose';
import Product from '../models/Products';
import Link from 'next/link';
import connectDb from '../middleware/mongoose';

const Hoodies = async () => {
  await connectDb();

  const products = await Product.find({ category: 'hoodies' });

  // अगर products नहीं हैं, तो लोडिंग टेक्स्ट दिखाएं
  if (!products || products.length === 0) {
    return <p>Loading products...</p>;
  }

  let hoodies = {};
  for (let item of products) {
    if (item.title in hoodies) {
      if (!hoodies[item.title].color.includes(item.color) && item.availableQty > 0) {
        hoodies[item.title].color.push(item.color);
      }
      if (!hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoodies[item.title].size.push(item.size);
      }
    } else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];
      }
    }
  }

  return (
    <div>
      <section className="text-gray-600 static body-font items-center cursor-pointer">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex m-auto flex-wrap items-center justify-center">
            {Object.values(hoodies).map((product) => (
              <div key={product._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-2">
                <Link href={`/Products/${product.slug}`}>
                  <img alt="ecommerce" className="w-full h-80" src={product.img} />
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
                    <div>
                      {product.size.includes('S') && <span className='border mx-1 px-1'> S</span>}
                      {product.size.includes('M') && <span className='border mx-1 px-1'> M</span>}
                      {product.size.includes('L') && <span className='border mx-1 px-1'> L</span>}
                      {product.size.includes('XL') && <span className='border mx-1 px-1'> XL</span>}
                      {product.size.includes('XXL') && <span className='border mx-1 px-1'> XXL</span>}
                    </div>
                  </div>
                  <div>
                    <div>
                      {product.color.includes('Red') && <button className="border-2 border-gray-300 hover:border-blue-800 bg-red-700 rounded-full w-6 h-6 m-1 p-1 focus:outline-none"></button>}
                      {product.color.includes('Yellow') && <button className="border-2 border-gray-300 hover:border-blue-800 bg-yellow-400 rounded-full m-1 p-1 w-6 h-6 focus:outline-none"></button>}
                      {product.color.includes('Green') && <button className="border-2 border-gray-300 hover:border-blue-800 bg-green-700 rounded-full w-6 m-1 p-1 h-6 focus:outline-none"></button>}
                      {product.color.includes('White') && <button className="border-2 border-gray-300 m-1 p-1 hover:border-blue-800 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                      {product.color.includes('Black') && <button className="border-2 m-1 p-1 border-gray-300 hover:border-blue-800 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hoodies;
