'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import blank from '../public/blank.png';
import { getVideoAsync } from '../models/web/getVideoAsync';
import { extractThumbnailUrl } from '../models/Videos';
import { getImageAsync } from '../models/web/getImageAsync';
import { MdFileDownload } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

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
