import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewTweet({ tweets, setTweets }) {
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || !session.user) return null;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!content) {
          alert("No content");
          return;
        }

        const res = await fetch("/api/tweet", {
          body: JSON.stringify({
            content,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const tweet = await res.json();
        setTweets([tweet, ...tweets]);
        // router.reload(window.location.pathname);
      }}
    >
      <div className="flex">
        <div className="mt-2 mr-1 ml-1 flex-1 px-1 pt-2">
          <textarea
            className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none "
            rows={2}
            cols={50}
            placeholder="What's happening?"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="flex border-b-8">
        <div className="mb-5 flex-1">
          <button className="float-right mt-0 mr-2 rounded-full border px-8 py-2 font-bold text-sky-400">
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
}
