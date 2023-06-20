import { MdFileDownload } from 'react-icons/md';

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
  return (
    <>
      {loadedThumbnail ? (
        <a
          className='flex justify-center items-center w-2/12 bg-red-400 rounded-full text-white text-2xl font-bold p-2 md:p-4 hover:bg-red-600'
          href={`/api/image?url=${encodeURIComponent(
            thumbnailUrl
          )}&name=${encodeURIComponent(videoName)}`}
        >
          <MdFileDownload />
        </a>
      ) : (
        <span className='flex justify-center items-center w-2/12 bg-red-400 rounded-full text-white text-2xl font-bold p-2 md:p-4 hover:bg-red-600 opacity-25 cursor-not-allowed'>
          <MdFileDownload />
        </span>
      )}
    </>
  );
};
