import { NextResponse } from 'next/server';
import Product from '../../../../models/Products';
import connectDb from '../../../../middleware/mongoose';

export const GET = async () => {
  try {
    await connectDb(); 
    let products = await Product.find(); 
    let tshirts = {}
    for(let item of products){
      if(item.title in tshirts){
        if(!tshirts[item.title].color.includes(item.color) && item.availableQty > 0){
          tshirts[item.title].color.push(item.color)
        }
        if(!tshirts[item.title].size.includes(item.size) && item.availableQty > 0){
          tshirts[item.title].size.push(item.size)
        }
      }
      else{
        tshirts[item.title] = JSON.parse(JSON.stringify(item))
        if(item.availableQty > 0){
          tshirts[item.title].color = [item.color]
          tshirts[item.title].size = [item.size]
        }
      }
    }
    return NextResponse.json({ tshirts }); 
     
  } catch (error) {
    console.error("Error fetching products:", error.message); 
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
};
