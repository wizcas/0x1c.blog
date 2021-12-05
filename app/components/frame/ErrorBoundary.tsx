import { Document } from "./Document";
import { Layout } from "./Layout";

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
    return (
        <Document title="Error!">
            <Layout>
                <div>
                    <h1>There was an error</h1>
                    <p>{error.message}</p>
                    <hr />
                    <p>Hey, developer, you should replace this with what you want your users to see.</p>
                </div>
            </Layout>
        </Document>
    );
}
