import { LoaderFunction, useLoaderData } from 'remix';

export const loader: LoaderFunction = async ({ params }) => {
  const { cslug, tslug } = params;
  return { cslug, tslug };
};
export default function TopicIndex() {
  const loaderData = useLoaderData();
  return (
    <div>
      topic index
      <br />
      {JSON.stringify(loaderData)}
    </div>
  );
}
