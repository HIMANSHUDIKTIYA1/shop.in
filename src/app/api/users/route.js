import { NextResponse } from 'next/server';
import connectDb from '../../../../middleware/mongoose';
import User from '../../../../models/User';

export async function GET() {
  await connectDb();
  const users = await User.find({});

 return  NextResponse.json( users , {status: 200})
 
}


