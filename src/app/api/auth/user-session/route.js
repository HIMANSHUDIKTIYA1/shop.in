import { NextResponse } from 'next/server';

export async function GET(request) {
  const cookie = request.cookies.get('user')?.value;
  try {
    const user = cookie ? JSON.parse(cookie) : null;
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}


