import classNames from 'classnames';
import { Link } from 'remix';

import Logo from '~/components/branding/Logo';

const headerStyles = classNames(
  'glass',
  'w-full h-24',
  'fixed top-0 left-0 right-0 z-20'
);

export default function Header() {
  return (
    <header className={headerStyles}>
      <div className="page-content flex flex-row items-center justify-between h-full">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
