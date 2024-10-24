import { NextResponse } from 'next/server';
import Product from '../../../../models/Products';
import connectDb from '../../../../middleware/mongoose';

export const GET = async () => {
  try {
    await connectDb(); 
    let products = await Product.find(); 
    
    
    
    return NextResponse.json(products); 
     
  } catch (error) {
    console.error("Error fetching products:", error.message); 
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
};
