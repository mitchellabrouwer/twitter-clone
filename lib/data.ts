// this file is loaded server side
import { Prisma, PrismaClient } from "@prisma/client";

const tweets = Prisma.sql/*sql*/ `
  SELECT 
  "Tweet"."id",
  "Tweet"."parent",
  "Tweet"."createdAt",
  "Tweet"."content",
  "Tweet"."authorId",
  "User"."name",
  "User"."image",
  "replies"."replyCount",         
  "likes"."likesCount" 
  FROM "Tweet"
  LEFT JOIN "User" ON "User"."id"="Tweet"."authorId"
  LEFT JOIN (SELECT "Tweet"."parent" AS "tweetId", COUNT(*) AS "replyCount" FROM "Tweet" GROUP BY parent) replies ON "replies"."tweetId" = "Tweet"."id"
  LEFT JOIN (SELECT "Like"."tweetId" AS "tweetId", COUNT(*) AS "likesCount" FROM "Like" GROUP BY "tweetId") likes ON "likes"."tweetId" = "Tweet"."id";
`;

// const byUser = Prisma.sql/* sqlFragment */`
//   WHERE
// `

// const tweetsByUser = Prisma.sql/*sql*/ `
//   []
// `;

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
//     return { ...tweet, replies: repliesById[tweet.id] || 0 };
//   });
// };

export const getTweets = async (prisma: PrismaClient, take: number, cursor?) => {
  const tweets = await prisma.tweet.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
      likes: true,
      replies: true,
      _count: true,
    },
    take,
    cursor,
    skip: cursor ? 1 : 0,
  });

  return tweets;
};

export const getTweet = async (id, prisma: PrismaClient) => {
  const tweet = await prisma.tweet.findUnique({
    where: { id: parseInt(id) },
    include: { author: true },
  });

  return tweet;
};

export const getUserTweets = async (
  name,
  prisma: PrismaClient,
  take: number,
  cursor?
) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      author: {
        name: name,
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
      likes: true,
      replies: true,
      _count: true,
    },

    take,
    cursor,
    skip: cursor ? 1 : 0,
  });

  return tweets;
};

export const getReplies = async (id, prisma: PrismaClient) => {
  const tweets = await prisma.reply.findMany({
    where: {
      parentId: parseInt(id),
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

export const isUser = async (name, prisma: PrismaClient) => {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  return !!user;
};
