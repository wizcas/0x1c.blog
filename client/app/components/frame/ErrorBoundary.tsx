import { i } from '~/helpers/i18n';

import ErrorDisplay from '../error/ErrorDisplay';

import { Document } from './Document';
import { Layout } from './Layout';

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <ErrorDisplay
          title={i('出错了')}
          description={
            <p>
              不，这不是你的错。
              <br />
              错误信息已经收集，我将尽快解决。
            </p>
          }
        />
      </Layout>
    </Document>
  );
}
