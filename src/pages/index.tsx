/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { LoadingPage, LoadingSpinner } from "~/components/loading/loading";
import { api } from "~/utils/api";

const EventFeed = () => {
  const { data, isLoading } = api.count.getAll.useQuery();

  const ctx = api.useContext();

  const { mutate } = api.count.delete.useMutation({
    onSuccess: () => {
      void ctx.count.getAll.invalidate();
    },
  });

  if (isLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="overflow-y-scroll">
      {data && (
        <ul role="list" className="divide-y divide-gray-100">
          {data.map((dataItem) => (
            <li key={dataItem.id} className="mt-6 flex max-w-md gap-x-4">
              <div className="flex gap-x-6">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {dataItem.title}
                </p>
              </div>

              <button
                className="flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                onClick={() => mutate({ id: dataItem.id })}
              >
                Delete
              </button>

              {/* <button className="flex-none rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
                Edit
              </button>
               */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EventItemCreation = () => {
  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading } = api.count.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.count.getAll.invalidate();
    },
  });

  return (
    <div className="m-4">
      <form action="#" method="POST" className="mx-auto max-w-xl sm:mt-10">
        <div>
          <label
            htmlFor="item-name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Enter Event Name
          </label>

          <input
            name="item-name"
            id="item-name"
            placeholder="Enter Event Title"
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
      </form>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <main className="m-4">
        <div className="flex flex-col items-center justify-center">
          <br />

          <EventItemCreation />

          <EventFeed />
        </div>
      </main>
    </>
  );
}
