import { FaGithub } from 'react-icons/fa';

export const Footer = () => (
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
);
