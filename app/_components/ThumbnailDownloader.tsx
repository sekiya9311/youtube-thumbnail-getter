import Image from 'next/image';
import blank from '../blank.png';
import { getVideoAsync } from '../_api/getVideoAsync';
import { extractThumbnailUrl } from '../_models/Videos';
import { DownloadButton } from './DownloadButton';

type Props = {
  ytUrlParam: string;
};

export const ThumbnailDownloader = async ({ ytUrlParam }: Props) => {
  const videoInfo = await getVideoAsync(ytUrlParam);
  const imageUrl = videoInfo ? extractThumbnailUrl(videoInfo) : blank.src;
  const loadedThumbnail = imageUrl !== blank.src;

  return (
    <>
      <div className='border mb-2'>
        <Image
          src={imageUrl}
          alt='Thumbnail image'
          width='640'
          height='360'
          className='object-cover'
        />
      </div>
      <div className='flex justify-end'>
        <DownloadButton
          loadedThumbnail={loadedThumbnail}
          thumbnailUrl={imageUrl}
          videoName={videoInfo?.snippet.title ?? ''}
        />
      </div>
    </>
  );
};
