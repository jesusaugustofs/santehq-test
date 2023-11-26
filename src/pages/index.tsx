import Head from "next/head";
import UsersContainer from "~/containers/users";

export default function Home() {
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
      <main>
        <UsersContainer />
      </main>
    </>
  );
}
