import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (req.method === "PUT") {
    const tweet = await prisma.like.findFirst({
      where: {
        tweetId: req.body.tweetId,
        userId: user.id,
      },
    });

    let response;

    if (tweet) {
      response = await prisma.like.delete({
        where: {
          id: tweet.id,
        },
      });
      return res.send({ response: response.tweetId, liked: false });
    } else {
      response = await prisma.like.create({
        data: {
          tweetId: req.body.tweetId,
          userId: user.id,
        },
      });
      return res.send({ response: response.tweetId, liked: true });
    }
  }
}
