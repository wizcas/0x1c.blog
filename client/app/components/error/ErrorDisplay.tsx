import { Link } from 'remix';

import { i } from '~/helpers/i18n';

interface Props {
  title: string | number | JSX.Element;
  description: string | JSX.Element;
}
export default function ErrorDisplay({ title, description }: Props) {
  return (
    <main className="page-content flex flex-col justify-center items-stretch gap-12 h-full text-center">
      {typeof title === 'string' || typeof title === 'number' ? (
        <h1 className="text-red-600 text-[20vh] leading-none">{title}</h1>
      ) : (
        title
      )}
      {description}
      <Link to="/">{i('返回首页')}</Link>
    </main>
  );
}
