import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (req.method === "POST") {
    let tweet;

    if (req.body.parent) {
      tweet = await prisma.reply.create({
        data: {
          content: req.body.content,
          parent: {
            connect: { id: req.body.parent },
          },
          author: {
            connect: { id: user.id },
          },
        },
      });
    } else {
      tweet = await prisma.tweet.create({
        data: {
          content: req.body.content,
          author: {
            connect: { id: user.id },
          },
        },
      });
    }

    const tweetWithAuthorData = await prisma.tweet.findUnique({
      where: {
        id: tweet.id,
      },
      include: {
        author: true,
      },
    });

    res.json(tweetWithAuthorData);
    return;
  }

  if (req.method === "DELETE") {
    const id = req.body.id;

    console.log(req.body.id);
    if (req.body.parent) {
      const reply = await prisma.reply.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
        },
      });
      console.log(reply);
      if (reply.author.id !== user.id) return res.status(401).end();

      await prisma.reply.delete({ where: { id } });

      return res.status(200).end();
    } else {
      const tweet = await prisma.tweet.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
        },
      });

      if (tweet.author.id !== user.id) return res.status(401).end();

      await prisma.tweet.delete({ where: { id } });

      return res.status(200).end();
    }
  }
}
