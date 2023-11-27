import Head from "next/head";
import UsersContainer from "~/containers/users";

export default function Home() {
  return (
    <>
      <Head>
        <title>Santé Users</title>
        <meta
          name="description"
          content="Santé, just the best liquor selling app ;)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <UsersContainer />
      </main>
    </>
  );
}
