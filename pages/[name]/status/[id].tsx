import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NewReply from "../../../components/NewReply";
import Tweet from "../../../components/Tweet";
import Tweets from "../../../components/Tweets";
import { getReplies, getTweet } from "../../../lib/data";
import prisma from "../../../lib/prisma";

export default function SingleTweet({ tweet, replies }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Note that we must check for typeof window !== 'undefined' since we must run
  // any router code in the client-side, not on the server-side.

  if (typeof window !== "undefined" && tweet.parent) {
    console.log(tweet);

    router.push(`/${tweet.author.name}/status/${tweet.parent}`);
  }

  return (
    <div>
      <Tweet tweet={tweet} authorLink={true} tweetLink={true} />
      {session && session.user.email === tweet.author.email && (
        <div className="py-2em-2 flex-1 text-center">
          <a
            href="#"
            className="hover:bg-color-accent-hover hover:color-accent-hover group mt-1 flex w-12 items-center rounded-full px-3 py-2 text-base font-medium leading-6 text-gray-500"
            onClick={async () => {
              const res = await fetch("/api/tweet", {
                body: JSON.stringify({
                  id: tweet.id,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "DELETE",
              });

              if (res.status === 401) {
                alert("Unauthorized");
              }
              if (res.status === 200) {
                router.push("/home");
              }
            }}
          >
            delete
          </a>
        </div>
      )}
      <NewReply tweet={tweet} />
      {session && session.user.email === tweet.author.email && (
        <Tweets tweets={replies} authorLink={true} tweetLink={true} />
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let tweet = await getTweet(params.id, prisma);
  tweet = JSON.parse(JSON.stringify(tweet));

  let replies = await getReplies(params.id, prisma);
  replies = JSON.parse(JSON.stringify(replies));

  return {
    props: {
      tweet,
      replies,
    },
  };
}
