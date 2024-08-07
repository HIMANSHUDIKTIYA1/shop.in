import { NextResponse } from 'next/server';
import Product from '../../../../models/Products';
import connectDb from '../../../../middleware/mongoose';

export const POST = async (req) => {
  await connectDb();

  try {
    const body = await req.json(); 

    for (let i = 0; i < body.length; i++) {
      let p = new Product({
        title: body[i].title,
        slug: body[i].slug,
        desc: body[i].desc,
        img: body[i].img,
        categary: body[i].categary,
        size: body[i].size,
        color: body[i].color,
        price: body[i].price,
        availableQty: body[i].availableQty,
      });
      await p.save();
    }
    return NextResponse.json({ success: "success" }, { status: 200 });
  } catch (error) {
    console.error('Error saving products:', error.message);
    return NextResponse.json({ error: 'Error ' }, { status: 500 });
  }
};
