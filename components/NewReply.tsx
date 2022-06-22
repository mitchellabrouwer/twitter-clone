import { useRouter } from "next/router";
import { useState } from "react";

export default function NewReply({ tweet }) {
  const router = useRouter();
  const [reply, setReply] = useState("");

  return (
    <form
      className="ml-2 flex"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!reply) {
          alert("Enter some text in the reply");
          return;
        }
        const res = await fetch("/api/tweet", {
          body: JSON.stringify({
            parent: tweet.id,
            content: reply,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        router.reload();
      }}
    >
      <textarea
        className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none "
        rows={1}
        cols={50}
        placeholder="Tweet your reply"
        onChange={(e) => setReply(e.target.value)}
      />
      <div className="flex">
        <div className="mb-5 flex-1">
          <button className="color-accent-contrast bg-color-accent hover:bg-color-accent-hover float-right ml-2 mt-0 mr-8 rounded-full border px-8 py-2 font-bold">
            Reply
          </button>
        </div>
      </div>
    </form>
  );
}
