import connectDb from "../../../../middleware/mongoose";
import User from "../../../../models/User";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDb();
    const { email, password } = await req.json();
    const existingUser = await User.findOne({ email, password, role: { $in: [undefined, 'user'] } });
    if (existingUser) {
      const res = NextResponse.json({ message: 'Login Successful', user: { name: existingUser.name, email: existingUser.email } }, { status: 200 });
      res.cookies.set('user', JSON.stringify({ name: existingUser.name, email: existingUser.email }), { httpOnly: true, sameSite: 'lax', path: '/' });
      return res;
    }
    return NextResponse.json({ message: 'Invalid Credentials' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
