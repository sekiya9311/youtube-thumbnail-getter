import { NextRequest, NextResponse } from 'next/server';

const getExt = (url: string): string => {
  const dot = url.lastIndexOf('.');
  if (dot === -1) {
    return '.png';
  }
  return url.substring(dot);
};

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('url');
  const name = request.nextUrl.searchParams.get('name');
  if (!imageUrl) {
    return NextResponse.next({ status: 404 });
  }
  if (!name) {
    return NextResponse.next({ status: 400 });
  }

  const ext = getExt(imageUrl);
  const nameWithExt = `${name}${ext}`;

  const fetchResponse = await fetch(imageUrl);
  const buf = await fetchResponse.arrayBuffer();
  const response = new Response(Buffer.from(buf));
  for (const h in ['Content-Type', 'Content-Length']) {
    const v = fetchResponse.headers.get(h);
    if (v) {
      response.headers.set(h, v);
    }
  }
  const contentDisposition = `attachment; filename*=UTF-8''${encodeURIComponent(
    nameWithExt
  )}`;
  try {
    response.headers.set('Content-Disposition', contentDisposition);
  } catch (err) {
    throw err;
  }

  return response;
}
