
import { NextResponse } from 'next/server';
import connectDb from '../../../../../middleware/mongoose';
import Products from '../../../../../models/Products';

// Global connection caching
let cachedDb = null;

async function getDbConnection() {
  if (cachedDb) {
    return cachedDb;
  }
  cachedDb = await connectDb(); // Assuming connectDb returns mongoose connection
  return cachedDb;
}

export async function GET(request, { params }) {
  const { slug } = params;

  // Early validation
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }

  try {
    // Connect to database with caching
    await getDbConnection();

    // Fetch product with lean() for performance
    const product = await Products.findOne({ slug }).lean();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

