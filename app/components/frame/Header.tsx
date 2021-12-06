import classNames from 'classnames';

import Logo from '~/components/branding/Logo';

const headerStyles = classNames(
  'backdrop-filter backdrop-blur-md',
  'w-full h-24 flex justify-center',
  'fixed top-0 left-0 right-0 z-5',
  'bg-dark-800 bg-opacity-70'
);

export default function Header() {
  return (
    <header className={headerStyles}>
      <div className="container flex flex-row items-center justify-between h-full">
        <Logo />
      </div>
    </header>
  );
}
