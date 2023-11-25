import Head from "next/head";
import { Button } from "~/components/ui/button";

import { api } from "~/utils/api";

export default function Home() {
  const { data, isLoading } = api.user.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Sante Users</title>
        <meta
          name="description"
          content="Sante, just the best liquor selling app ;)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>{data?.map((user) => <p key={user.id}>{user.email}</p>)}</>
          )}
        </div>
        <Button>Click me!</Button>
      </main>
    </>
  );
}
