import { NextResponse } from 'next/server';
import connectDb from '../../../../../middleware/mongoose';
import User from '../../../../../models/User';

export async function POST(req) {
  await connectDb();
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
  }
  const admin = await User.create({ name, email, password, role: 'admin' });
  return NextResponse.json({ ok: true, admin: { id: admin._id, email: admin.email } }, { status: 201 });
}


