import { NextResponse } from 'next/server';
import Product from '../../../../models/Products';
import connectDb from '../../../../middleware/mongoose';

export const POST = async (req) => {
  await connectDb();

  try {
    const body = await req.json();

    for (let i = 0; i < body.length; i++) {
      let p = await Product.findByIdAndUpdate(
        body[i]._id,
        body[i],
        { new: true, upsert: true } 
      );
    }
    return NextResponse.json({ success: "success" }, { status: 200 });
  } catch (error) {
    console.error('Error saving products:', error.message);
    return NextResponse.json({ error: 'Error ' }, { status: 500 });
  }
};
