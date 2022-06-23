import Tweet from "./Tweet";

export default function Tweets({ tweets, authorLink, tweetLink }) {
  if (!tweets) {
    return null;
  }
  return (
    <>
      {tweets.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} authorLink={authorLink} tweetLink={tweetLink} />
      ))}
    </>
  );
}
