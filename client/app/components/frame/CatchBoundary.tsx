import { useCatch } from 'remix';

import { i } from '~/helpers/i18n';

import ErrorDisplay from '../error/ErrorDisplay';

import { Document } from './Document';
import { Layout } from './Layout';

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = <p>{i('您没有权限访问此页面。')}</p>;
      break;
    case 404:
      message = <p>{i('挺好的页面，啪，没啦。')}</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <ErrorDisplay title={caught.status} description={message} />
      </Layout>
    </Document>
  );
}
