import classNames from 'classnames';
import { Link } from 'remix';

import Logo from '~/components/branding/Logo';

const headerStyles = classNames(
  'backdrop-filter backdrop-blur-md',
  'w-full h-24',
  'fixed top-0 left-0 right-0 z-10',
  'bg-dark-800 bg-opacity-70'
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
