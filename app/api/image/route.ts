import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('url');
  if (!imageUrl) {
    return NextResponse.next({ status: 404 });
  }

  const fetchResponse = await fetch(imageUrl);
  const buf = await fetchResponse.arrayBuffer();
  const response = new Response(Buffer.from(buf));
  for (const h in ['Content-Type', 'Content-Length']) {
    const v = fetchResponse.headers.get(h);
    if (v) {
      response.headers.set(h, v);
    }
  }
  return response;
}
