import { Title } from './_components/Title';
import { Footer } from './_components/Footer';
import { Content } from './_components/Content';

type Props = {
  searchParams: { ytUrl?: string };
};

export default function Main({ searchParams: { ytUrl } }: Props) {
  return (
    <div className='flex flex-col'>
      <main className='container mx-auto flex flex-col justify-center items-center pt-4 px-2'>
        <div className='mb-16'>
          <Title />
        </div>
        <Content ytUrlParam={ytUrl ?? ''} />
      </main>
      <Footer />
    </div>
  );
}
