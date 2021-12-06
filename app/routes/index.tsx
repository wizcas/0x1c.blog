import type { MetaFunction } from 'remix';

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div className="remix__page">
      <main>
        <div className="btn">hi</div>
        <div className="test">
          test
          <span className="nested">xxx</span>
          <input placeholder="placeholder" />
        </div>
      </main>
    </div>
  );
}
