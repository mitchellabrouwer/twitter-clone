import Tweets from "components/tweets";
import { getTweets } from "lib/data";
import prisma from "lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Index({ tweets }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (session) {
    router.push("/home");
  }

  return (
    <div className="mt-10">
      <Tweets tweets={tweets.slice(0, 3)} />
      <p className="text-center p-4 border m-4">
        <h2 className="mb-10">Join the conversation!</h2>
        <a
          className="border px-8 py-2 mt-5 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker"
          href="/api/auth/signin"
        >
          login
        </a>
      </p>
    </div>
  );
}

export async function getServerSideProps() {
  const take = 3;
  let tweets = await getTweets(prisma, take);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets,
    },
  };
}
