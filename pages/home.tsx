import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadMore from "../components/LoadMore";
import Nav from "../components/Nav";
import NewTweet from "../components/NewTweet";
import Tweets from "../components/Tweets";
import { getTweets } from "../lib/data";
import prisma from "../lib/prisma";

export default function Home({ initialTweets }) {
  const [tweets, setTweets] = useState(initialTweets);
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  if (loading) {
    return null;
  }

  if (!session) {
    router.push("/");
  }

  if (session && !session.user.name) {
    router.push("/setup");
  }

  return (
    <div className="h-full border-gray-800 dark:bg-black dark:text-gray-200 md:grid md:grid-cols-4">
      <Nav />
      <div className="col-span-2 h-full border-x-2 border-gray-200">
        <h2 className="border-b-2 p-3 text-lg font-semibold">Home</h2>
        <NewTweet tweets={tweets} setTweets={setTweets} />
        <Tweets tweets={tweets} noLink="false" />
        <LoadMore tweets={tweets} setTweets={setTweets} />
      </div>
      <h2 className="border-b-2 p-3 text-lg font-semibold">Trends for you...</h2>
    </div>
  );
}
export async function getServerSideProps() {
  let tweets = await getTweets(prisma, 2, undefined);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      initialTweets: tweets,
    },
  };
}
