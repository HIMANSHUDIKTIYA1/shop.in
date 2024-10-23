import { NextResponse } from 'next/server';
import connectDb from '../../../../../middleware/mongoose';// MongoDB से कनेक्शन के लिए utility function
import Products from '../../../../../models/Products'; // अपने प्रोडक्ट मॉडल को इम्पोर्ट करें

export async function GET(request, { params }) {
  const { slug } = params; // URL से slug को प्राप्त करें
  
 
    

    // स्लग के आधार पर प्रोडक्ट को ढूंढें
    const product = await Products.findOne({ slug: slug });
      
   

    return NextResponse.json(product); // प्रोडक्ट डेटा रिटर्न करें
  
}
