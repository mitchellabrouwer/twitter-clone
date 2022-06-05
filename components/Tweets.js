import Tweet from "components/Tweet";

export default function Tweets({ tweets, noLink }) {
  if (!tweets) {
    return null;
  }
  return (
    <>
      {tweets.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} noLink={noLink} />
      ))}
    </>
  );
}
