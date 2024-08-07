// src/app/api/pincode/route.js

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([262311, 263001, 263002]);
}
