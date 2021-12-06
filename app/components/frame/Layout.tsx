import { ReactNode } from 'react';

import Header from './Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <Header />
      <div className="pt-24">{children}</div>
      <footer>&copy; 0x1C.dev</footer>
    </div>
  );
}
