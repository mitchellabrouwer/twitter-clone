import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

var renderNumber = 0;

const Tweet = ({ tweet, noLink }) => {
  const [isLiked, setIsLiked] = useState(null);

  renderNumber += 1;

  useEffect(() => {}, []);
  async function toggleLike(tweetId) {
    const res = await fetch("/api/like", {
      body: JSON.stringify({
        tweetId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
  }
  return (
    <div className="mb-4">
      <div className="flex flex-shrink-0 p-4 pb-0">
        <div className="group block flex-shrink-0">
          <div className="flex items-center">
            <div>
              <Image
                className="h-64 w-64 rounded-full"
                src={
                  tweet.author.image ||
                  "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/273.jpg"
                }
                alt=""
                width="40"
                height="40"
              />
            </div>
            <div className="ml-3 -mt-6">
              <p className="">
                <Link href={`/${tweet.author.name}`}>
                  <a>
                    <span className="color-primary text-base font-medium leading-6 hover:underline">
                      {tweet.author.name}
                    </span>
                  </a>
                </Link>
                {noLink ? (
                  <span>{` ${timeAgo.format(new Date(tweet.createdAt))}`}</span>
                ) : (
                  <span className="color-dimmed pl-1 text-sm font-light leading-5">
                    <Link href={`/${tweet.author.name}/status/${tweet.id}`}>
                      <a className="hover:underline">
                        {timeAgo.format(new Date(tweet.createdAt))}
                      </a>
                    </Link>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-6 pl-16">
        <p className="color-primary width-auto flex-shrink pl-1 pr-2 text-base font-normal">
          {tweet.content}
        </p>
      </div>
      <div className="my-2 flex items-center justify-evenly">
        <div className="flex items-center">
          <FaRegComment size="15" color="grey" />
          <span className="mb-1 select-none p-0.5 text-gray-400">
            <small>{tweet?._count?.replies || 0}</small>
          </span>
        </div>
        <AiOutlineRetweet size="20" color="grey" />
        <div className="flex items-center">
          <AiOutlineHeart
            className="hover:cursor-pointer"
            color="grey"
            onClick={() => toggleLike(tweet.id)}
          />
          <span className="mb-1 select-none p-0.5 text-gray-400">
            <small>{tweet?._count?.likes || 0}</small>
          </span>
        </div>

        <BsUpload color="grey" />
      </div>
    </div>
  );
};

export default Tweet;
