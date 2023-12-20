/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { LoadingPage, LoadingSpinner } from "~/components/loading/loading";
import { api } from "~/utils/api";

const EventFeed = () => {
  const { data, isLoading } = api.count.getAll.useQuery();

  if (isLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex grow flex-col overflow-y-scroll">
      {data?.map((dataItem) => (
        <div key={dataItem.id}>{dataItem.title}</div>
      ))}
    </div>
  );
};

const EventItemCreation = () => {
  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.count.getAll.invalidate();
    },
  });

  return (
    <div>
      <input
        placeholder="Enter Event Title"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            if (input !== "") {
              mutate({ title: input });
            }
          }
        }}
        disabled={isLoading}
      />

      {input !== "" && !isLoading && (
        <button
          onClick={() => mutate({ title: input })}
          class="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
        >
          Submit
        </button>
      )}

      {isLoading && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <>
      <main className="m-4">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-xl font-medium">Welcome To Event App!</h1>

          <br />

          <EventItemCreation />

          <EventFeed />
        </div>
      </main>
    </>
  );
}
