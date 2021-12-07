import { ReactNode } from 'react';

import { Footer } from './Footer';
import Header from './Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <Header />
      <div className="pt-24">{children}</div>
      <Footer />
    </div>
  );
}
