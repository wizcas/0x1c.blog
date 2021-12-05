import { Outlet } from 'remix';

import {
  Document,
  Layout,
  CatchBoundary,
  ErrorBoundary,
} from '~/components/frame';

import type { LinksFunction } from 'remix';

import darkStylesUrl from '~/styles/dark.css';
import globalStylesUrl from '~/styles/global.css';

export { CatchBoundary, ErrorBoundary };

// https://remix.run/api/app#links
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStylesUrl },
    {
      rel: 'stylesheet',
      href: darkStylesUrl,
      media: '(prefers-color-scheme: dark)',
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
