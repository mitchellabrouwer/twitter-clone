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
    <div className="dark:bg-black dark:text-gray-200 h-full">
      <Nav />
      <NewTweet tweets={tweets} setTweets={setTweets} />
      <Tweets tweets={tweets} noLink="false" />
      <LoadMore tweets={tweets} setTweets={setTweets} />
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
