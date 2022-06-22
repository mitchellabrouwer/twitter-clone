import { useState } from "react";
import LoadMore from "../../components/LoadMore";
import Tweets from "../../components/Tweets";
import { getUserTweets, isUser } from "../../lib/data";
import prisma from "../../lib/prisma";

export default function UserProfile({ name, initialTweets, userExists }) {
  const [tweets, setTweets] = useState(initialTweets);

  return (
    <>
      {userExists ? (
        <p className="p-5 text-center">User profile of {name}</p>
      ) : (
        <p className="p-5 text-center">User does not exist</p>
      )}
      <Tweets tweets={tweets} noLink={false} />
      <LoadMore tweets={tweets} setTweets={setTweets} user={name} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let tweets = await getUserTweets(params.name, prisma, 2, undefined);
  tweets = JSON.parse(JSON.stringify(tweets));

  const userExists = await isUser(params.name, prisma);

  return {
    props: {
      name: params.name,
      initialTweets: tweets,
      userExists,
    },
  };
}
