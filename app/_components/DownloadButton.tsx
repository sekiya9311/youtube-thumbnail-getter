'use client';

import { useRef } from 'react';
import { MdFileDownload } from 'react-icons/md';
import { getImageAsync } from '../_api/getImageAsync';

type Props = {
  loadedThumbnail: boolean;
  thumbnailUrl: string;
  videoName: string;
};

export const DownloadButton = ({
  loadedThumbnail,
  thumbnailUrl,
  videoName,
}: Props) => {
  const downloadTag = useRef<HTMLAnchorElement>(null);
  const downloadThumbnail = async () => {
    if (!downloadTag.current) {
      return;
    }

    const blob = await getImageAsync(thumbnailUrl);
    const blobUrl = window.URL.createObjectURL(blob);
    try {
      downloadTag.current.href = blobUrl;
      downloadTag.current.download = `${videoName}${thumbnailUrl.substring(
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
    <>
      <button
        disabled={!loadedThumbnail}
        className={`flex justify-center items-center w-2/12 bg-red-400 rounded-full text-white text-2xl font-bold p-2 md:p-4 hover:bg-red-600${
          loadedThumbnail ? '' : ' opacity-25 cursor-not-allowed'
        }`}
        onClick={downloadThumbnail}
      >
        <MdFileDownload />
      </button>
      <a className='hidden' ref={downloadTag} />
    </>
  );
};
