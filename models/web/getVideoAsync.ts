import { Item } from '../Videos';

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

export const getVideoAsync = async (urlText: string) => {
  const videoId = extractVideoId(urlText);
  if (videoId === undefined) {
    throw new Error('Must be Youtube video url.');
  }
  if (videoId === null) {
    throw new Error('The video id is not found.');
  }

  const apiUrl = new URL(location.origin);
  apiUrl.pathname = '/api/video';
  apiUrl.searchParams.set('id', videoId);
  const response = await fetch(apiUrl.toString());
  if (!response.ok) {
    throw Error(`status code : ${response.status}`);
  }

  const videoInfo = (await response.json()) as Item;
  return videoInfo;
};
