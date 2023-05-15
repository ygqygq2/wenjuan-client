import { NextResponse } from 'next/server';

export async function POST() {
  const res = { errno: 0, msg: 'success' };
  return NextResponse.json(res);
}
