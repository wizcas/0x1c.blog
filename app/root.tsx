import { Outlet } from 'remix';

import {
  Document,
  Layout,
  CatchBoundary,
  ErrorBoundary,
} from '~/components/frame';

import styles from './tailwind.css';

import type { LinksFunction } from 'remix';

export { CatchBoundary, ErrorBoundary };

// https://remix.run/api/app#links
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
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
