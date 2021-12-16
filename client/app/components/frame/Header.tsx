import classNames from 'classnames';
import { Link } from 'remix';

import Logo from '~/components/branding/Logo';
import { i } from '~/helpers/i18n';

const HEADER_CLASS = classNames(
  'glass',
  'w-full h-12 md:h-20',
  'fixed top-0 left-0 right-0 z-20'
);

export default function Header() {
  return (
    <header className={HEADER_CLASS}>
      <div className="page-content flex flex-row items-center justify-between h-full">
        <Link to="/">
          <Logo className="!h-4 md:!h-8 !gap-2 md:!gap-4" />
        </Link>
        <nav className="space-x-4">
          <Link to="/">{i('博客')}</Link>
          <Link to="/about">{i('关于')}</Link>
        </nav>
      </div>
    </header>
  );
}
