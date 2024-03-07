import { getAnalytics } from "~/lib/get-analytics";

export default async function Home() {
    const analytics = await getAnalytics();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <pre>{JSON.stringify(analytics, null, 2)}</pre>
        </main>
    );
}
