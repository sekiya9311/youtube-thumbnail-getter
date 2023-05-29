import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState } from 'react';
import blank from '../public/blank.png';
import { getVideoAsync } from '../models/web/getVideoAsync';
import { extractThumbnailUrl } from '../models/Videos';
import { getImageAsync } from '../models/web/getImageAsync';
import { MdFileDownload } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

const AppHead = () => {
  return (
    <Head>
      <title>YouTube Thumbnail Getter</title>
      <meta name='application-name' content='YouTube Thumbnail Getter' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta
        name='apple-mobile-web-app-title'
        content='YouTube Thumbnail Getter'
      />
      <meta
        name='description'
        content='We can download Youtube video thumbnail image !'
      />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      {/*<meta name='msapplication-config' content='/icons/browserconfig.xml' />*/}
      {/*<meta name='msapplication-TileColor' content='#e53e3e' />*/}
      {/*<meta name='msapplication-tap-highlight' content='no' />*/}
      <meta name='theme-color' content='#e53e3e' />
      <link rel='apple-touch-icon' href='/icon-512x512.png' />
      <link rel='apple-touch-icon' sizes='256x256' href='/icon-256x256.png' />
      <link rel='apple-touch-icon' sizes='384x384' href='/icon-384x384.png' />
      <link rel='apple-touch-icon' sizes='192x192' href='/icon-192x192.png' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='manifest' href='/manifest.webmanifest' />

      <link rel='mask-icon' href='/monochrome.svg' color='#e53e3e' />
      <link rel='shortcut icon' href='/favicon.ico' />

      <meta name='twitter:card' content='app' />
      <meta
        name='twitter:url'
        content='https://youtube-thumbnail-getter.sekiya9311.dev/'
      />
      <meta name='twitter:title' content='YouTube Thumbnail Getter' />
      <meta
        name='twitter:description'
        content='We can download Youtube video thumbnail image !'
      />
      <meta
        name='twitter:image'
        content='https://youtube-thumbnail-getter.sekiya9311.dev/icon-512x512.png'
      />
      <meta name='twitter:creator' content='@sekiya9311' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='YouTube Thumbnail Getter' />
      <meta
        property='og:description'
        content='We can download Youtube video thumbnail image !'
      />
      <meta property='og:site_name' content='YouTube Thumbnail Getter' />
      <meta
        property='og:url'
        content='https://youtube-thumbnail-getter.sekiya9311.dev/'
      />
      <meta
        property='og:image'
        content='https://youtube-thumbnail-getter.sekiya9311.dev/icon-512x512.png'
      />
    </Head>
  );
};

export default function Main() {
  const [url, setUrl] = useState('');
  const [songName, setSongName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(blank.src);
  const downloadTag = useRef<HTMLAnchorElement>(null);

  const loadedThumbnail = thumbnailUrl !== blank.src;

  const getThumbnail = async () => {
    try {
      const videoInfo = await getVideoAsync(url);
      const imageUrl = extractThumbnailUrl(videoInfo);
      if (imageUrl === null) {
        return;
      }
      setThumbnailUrl(imageUrl);
      setSongName(videoInfo.snippet.title);
    } catch (e) {
      alert(e);
    }
  };

  const downloadThumbnail = async () => {
    if (!downloadTag.current) {
      return;
    }

    const blob = await getImageAsync(thumbnailUrl);
    const blobUrl = window.URL.createObjectURL(blob);
    try {
      downloadTag.current.href = blobUrl;
      downloadTag.current.download = `${songName}${thumbnailUrl.substring(
        thumbnailUrl.lastIndexOf('.')
      )}`;
      downloadTag.current.click();
    } catch (e) {
      alert(e);
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
  };

  return (
    <div className='flex flex-col'>
      <AppHead />
      <main className='container mx-auto flex flex-col justify-center items-center pt-4 px-2'>
        <div className='mb-16'>
          <h1 className='text-2xl md:text-5xl text-center font-bold text-red-600'>
            YouTube Thumbnail Getter
          </h1>
        </div>

        <div>
          <div className='mb-2 flex flex-col px-2'>
            <input
              type='text'
              value={url}
              onChange={(x) => setUrl(x.target.value)}
              placeholder='YouTube video URL'
              className='flex-grow border-b border-red-300 text-sm md:text-2xl outline-none'
            />
          </div>
          <div className='flex justify-center items-center mb-2'>
            <button
              type='button'
              className='flex justify-center items-center w-4/12 bg-red-400 rounded text-white text-sm font-bold md:text-xl p-2 md:p-4 hover:bg-red-600'
              onClick={getThumbnail}
            >
              Get Thumbnail
            </button>
          </div>
          <div className='border mb-2'>
            <Image
              src={thumbnailUrl}
              alt='Thumbnail image'
              width='640'
              height='360'
              className='object-cover'
            />
          </div>
          <div className='flex justify-end'>
            <button
              disabled={!loadedThumbnail}
              className={`flex justify-center items-center w-2/12 bg-red-400 rounded-full text-white text-2xl font-bold p-2 md:p-4 hover:bg-red-600${
                loadedThumbnail ? '' : ' opacity-25 cursor-not-allowed'
              }`}
              onClick={downloadThumbnail}
            >
              <MdFileDownload />
            </button>
          </div>
        </div>
      </main>

      <footer className='fixed bottom-0 w-full border-t h-16 flex justify-between items-center bg-black text-white'>
        <div className='ml-4'>
          <a
            href='https://github.com/sekiya9311/youtube-thumbnail-getter'
            target='_blank'
            rel='noopener noreferrer'
            className='text-4xl'
          >
            <FaGithub />
          </a>
        </div>
        <div className='px-4'>
          <span className='text-sm'>
            Created by{' '}
            <a
              href='https://twitter.com/sekiya9311'
              target='_blank'
              rel='noopener noreferrer'
              className='border-b-2 border-white'
            >
              @sekiya9311
            </a>
          </span>
        </div>
      </footer>

      <a className='hidden' ref={downloadTag} />
    </div>
  );
}
