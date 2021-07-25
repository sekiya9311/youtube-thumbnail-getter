import { NextApiRequest, NextApiResponse } from 'next';
import { Item, Videos } from '../../models/Videos';

const VIDEOS_API_URL_ENDPOINT =
  'https://content-youtube.googleapis.com/youtube/v3/videos';

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
  const videoId = req.query.id;
  if (typeof videoId !== 'string') {
    setStatusCodeAndEnd(400);
    return;
  }

  const apiUrl = new URL(VIDEOS_API_URL_ENDPOINT);
  apiUrl.searchParams.set('part', 'snippet');
  apiUrl.searchParams.set('key', process.env.YOUTUBE_API_KEY!);
  apiUrl.searchParams.set('id', videoId);

  const apiRes = await fetch(apiUrl.toString());
  if (apiRes.status !== 200) {
    setStatusCodeAndEnd(apiRes.status);
    return;
  }

  const responseObj = (await apiRes.json()) as Videos;
  if (responseObj.items.length === 0) {
    setStatusCodeAndEnd(404);
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(responseObj.items[0]));
}
