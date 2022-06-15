import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Image from "next/image";
import Link from "next/link";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const Tweet = ({ tweet, noLink }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-shrink-0 p-4 pb-0">
        <div className="group block flex-shrink-0">
          <div className="flex items-center">
            <div>
              {tweet.author.image && (
                <Image
                  className="h-64 w-64 rounded-full"
                  src={tweet.author.image}
                  alt=""
                  width="40"
                  height="40"
                />
              )}
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
    </div>
  );
};

export default Tweet;
