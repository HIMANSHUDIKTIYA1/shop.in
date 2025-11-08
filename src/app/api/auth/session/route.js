import { NextResponse } from 'next/server';

export async function GET(request) {
  const token = request.cookies.get('admin_token')?.value;
  const adminCookie = request.cookies.get('admin_user')?.value;
  
  let admin = null;
  if (adminCookie) {
    try {
      admin = JSON.parse(adminCookie);
    } catch (e) {
      admin = null;
    }
  }
  
  return NextResponse.json({ 
    isAdmin: Boolean(token),
    admin: admin 
  });
}


