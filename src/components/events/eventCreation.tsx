/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../loading/loading";

const EventItemCreation = () => {
  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading } = api.count.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.count.getAll.invalidate();
    },
  });

  const { data } = api.count.getPriorityMaxCount.useQuery();

  const dataPriority = data?._max.priority ?? data?._count.priority ?? 0;

  const submitHandler = () =>
    mutate({
      title: input,
      priority: Number(dataPriority) + 1,
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
                  submitHandler();
                }
              }
            }}
            disabled={isLoading}
          />

          {input !== "" && !isLoading && (
            <button
              onClick={submitHandler}
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

export default EventItemCreation;
