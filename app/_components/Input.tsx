'use client';

import { useState } from 'react';
import Link from 'next/link';

type Props = {
  ytUrlParam: string;
};

export const Input = ({ ytUrlParam }: Props) => {
  const [url, setUrl] = useState(ytUrlParam);

  return (
    <>
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
        <Link
          href={{
            pathname: '/',
            query: { ytUrl: url },
          }}
          className='flex justify-center items-center w-4/12 bg-red-400 rounded text-white text-sm font-bold md:text-xl p-2 md:p-4 hover:bg-red-600'
        >
          Get Thumbnail
        </Link>
      </div>
    </>
  );
};
