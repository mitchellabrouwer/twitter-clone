// this file is loaded server side
import { PrismaClient } from "@prisma/client";

// const withRepliesCount = async (tweets: (Tweet & { author: User })[]) => {
//   const ids = tweets.reduce((accumulator, tweet) => [...accumulator, tweet.id], []);

//   const repliesArray = await prisma.tweet.groupBy({
//     by: ["parent"],
//     where: {
//       parent: { in: ids },
//     },
//     _count: {
//       _all: true,
//     },
//   });

//   const repliesById = repliesArray.reduce((accumulator, current) => {
//     return { ...accumulator, [current.parent]: current._count._all };
//   }, {});

//   return tweets.map((tweet) => {
//     return { ..._cloneDeep(tweet), replies: repliesById[tweet.id] || 0 };
//   });
// };

export const getTweets = async (prisma: PrismaClient, take: number, cursor?) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      parent: null,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
    take,
    cursor,
    skip: cursor ? 1 : 0,
  });

  const tweetsRaw = await prisma.$queryRaw/*sql*/ `
    SELECT * FROM "Tweet"
    LEFT JOIN "User" ON "User"."id"="Tweet"."authorId"
    LEFT JOIN (SELECT "Tweet"."parent" AS "replyId", COUNT(*) AS "replyCount" FROM "Tweet" GROUP BY parent) replies
    ON "replies"."replyId" = "Tweet"."id";
    -- Add likes count
  `;
  console.log(tweetsRaw);

  // return withRepliesCount(tweets);
};

export const getTweet = async (id, prisma) => {
  const tweet = await prisma.tweet.findUnique({
    where: { id: parseInt(id) },
    include: { author: true },
  });

  return tweet;
};

export const getUserTweets = async (name, prisma) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      author: {
        name: name,
      },
      parent: null,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });

  return tweets;
};

export const getReplies = async (id, prisma) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      parent: parseInt(id),
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });

  return tweets;
};
