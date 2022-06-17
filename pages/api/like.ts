import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const tweetId = req.body.tweetId;
  const isLiked = await prisma.like.findFirst({
    where: {
      tweetId,
      userId: user.id,
    },
  });

  if (req.method === "GET") {
  }

  if (req.method === "POST") {
    console.log(tweetId);
    console.log(isLiked);
  }
}
