import { Videos } from '../_models/Videos';

const extractVideoId = (urlText: string) => {
  const url = new URL(urlText);
  if (
    url.protocol + '//' + url.host + url.pathname ===
    'https://www.youtube.com/watch'
  ) {
    return url.searchParams.get('v');
  }

  if (url.origin === 'https://youtu.be') {
    const paths = url.pathname.split('/');
    if (paths.length !== 2) {
      return null;
    }
    return paths[1];
  }

  return undefined;
};

const VIDEOS_API_URL_ENDPOINT =
  'https://content-youtube.googleapis.com/youtube/v3/videos';

export const getVideoAsync = async (urlText: string) => {
  if (!urlText) {
    return null;
  }
  const videoId = extractVideoId(urlText);
  if (videoId === undefined) {
    throw new Error('Must be Youtube video url.');
  }
  if (videoId === null) {
    throw new Error('The video id is not found.');
  }

  const apiUrl = new URL(VIDEOS_API_URL_ENDPOINT);
  apiUrl.searchParams.set('part', 'snippet');
  apiUrl.searchParams.set('key', process.env.YOUTUBE_API_KEY!);
  apiUrl.searchParams.set('id', videoId);
  const apiRes = await fetch(apiUrl.toString());
  const responseObj = (await apiRes.json()) as Videos;

  return responseObj.items[0];
};
