import { ReactNode } from 'react';

import { Footer } from './Footer';
import Header from './Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Header />
      <div className="flex-1 py-12 md:pt-20">{children}</div>
      <Footer />
    </div>
  );
}
