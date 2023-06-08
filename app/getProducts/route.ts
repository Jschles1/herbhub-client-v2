import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  console.log('getProducts');
  const params = request.nextUrl.searchParams;

  console.log('Server search params', params);
  return NextResponse.json({ message: 'Hello', params });
}
