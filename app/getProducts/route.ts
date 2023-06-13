import { NextRequest, NextResponse } from 'next/server';

export const revalidate = false;

export async function GET(request: NextRequest) {
  console.log('3. GET PRODUCTS ROUTE');
  const params = request.nextUrl.searchParams;

  console.log('4. GET PRODUCTS PARAMS', params);
  return NextResponse.json({
    message: 'Hello from client',
    params: params.toString(),
  });
}
