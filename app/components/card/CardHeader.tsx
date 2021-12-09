import classNames from 'classnames';

const COVER_CLASS = classNames(
  'bg-cover bg-center bg-clip-border bg-no-repeat',
  '!-m-4 !p-4 !pb-0 !mb-4',
  'flex flex-col justify-end',
  'h-48'
);
const COVERED_TITLE_CLASS = '!-mx-4 px-4 py-2 bg-gray-900 bg-opacity-60';

interface Props {
  title: string;
  coverUrl?: string;
  className?: string;
}

export default function CardHeader({ title, coverUrl, className }: Props) {
  const hasCover = coverUrl;
  return (
    <div
      className={classNames(
        'card-header',
        { [COVER_CLASS]: hasCover },
        className
      )}
    >
      {coverUrl && <img src={coverUrl} alt="" className="card-cover-image" />}
      <h3 className={classNames('!m-0', coverUrl && COVERED_TITLE_CLASS)}>
        {title}
      </h3>
    </div>
  );
}
