import { NextApiRequest, NextApiResponse } from 'next';
import { Item } from '../../models/Videos';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const setStatusCodeAndEnd = (statusCode: number) => {
    res.statusCode = statusCode;
    res.end();
  };

  if (req.method !== 'GET') {
    setStatusCodeAndEnd(400);
    return;
  }
  const imageUrl = req.query.url;
  if (typeof imageUrl !== 'string') {
    setStatusCodeAndEnd(400);
    return;
  }

  const response = await fetch(imageUrl);
  const buf = await response.arrayBuffer();

  res.statusCode = 200;
  res.setHeader('Content-Type', response.headers.get('Content-Type')!);
  res.setHeader('Content-Length', response.headers.get('Content-Length')!);
  res.end(Buffer.from(buf));
}
