import { Outlet } from 'remix';
import tippyStyles from 'tippy.js/dist/tippy.css';

import {
  Document,
  Layout,
  CatchBoundary,
  ErrorBoundary,
} from '~/components/frame';

import tailwindStyles from './tailwind.css';

import type { LinksFunction } from 'remix';

export { CatchBoundary, ErrorBoundary };

// https://remix.run/api/app#links
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tippyStyles },
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Fira+Sans+Condensed:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Fira+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap',
    },
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}
