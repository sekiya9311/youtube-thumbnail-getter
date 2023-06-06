import { ThumbnailDownloader } from './ThumbnailDownloader';
import { Input } from './Input';

type Props = {
  ytUrlParam: string;
};

export const Content = (props: Props) => {
  return (
    <div>
      <Input {...props} />
      {/* @ts-expect-error エラーにならなくなったら消そうね */}
      <ThumbnailDownloader {...props} />
    </div>
  );
};
