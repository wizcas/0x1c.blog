import classNames from 'classnames';

import Image, { ImageAsset } from '../presentation/Image';

const COVER_CLASS = classNames(
  'bg-cover bg-center bg-clip-border bg-no-repeat',
  '!-m-4 !p-4 !pb-0 !mb-4',
  'flex flex-col justify-end',
  'h-48'
);
const COVERED_TITLE_CLASS = '!-mx-4 px-4 py-2 bg-gray-900 bg-opacity-60';

interface Props {
  title: string;
  cover?: ImageAsset;
  className?: string;
  compact?: boolean;
}

export default function CardHeader({
  title,
  cover,
  className,
  compact,
}: Props) {
  return (
    <div
      className={classNames(
        'card-header',
        { [COVER_CLASS]: cover, 'h-36': compact && cover },
        className
      )}
    >
      {cover && <Image asset={cover} className="card-cover-image" />}
      <h4 className={classNames('!m-0', cover && COVERED_TITLE_CLASS)}>
        {title}
      </h4>
    </div>
  );
}
