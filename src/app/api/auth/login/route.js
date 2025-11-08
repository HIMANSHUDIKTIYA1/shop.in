import { NextResponse } from 'next/server';
import connectDb from '../../../../../middleware/mongoose';
import User from '../../../../../models/User';

export async function POST(req) {
  await connectDb();
  const { email, password } = await req.json();

  const admin = await User.findOne({ email, password, role: 'admin' });
  if (admin) {
    const res = NextResponse.json({ ok: true, admin: { name: admin.name, email: admin.email } });
    res.cookies.set('admin_token', 'true', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
    // Store admin info in cookie
    res.cookies.set('admin_user', JSON.stringify({ name: admin.name, email: admin.email }), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
    return res;
  }

  return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
}

