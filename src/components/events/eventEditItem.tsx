import React, { Dispatch, SetStateAction, useState } from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../loading/loading";

interface EventEditItemProps {
  id: string;
  title: string;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const EventEditItem = ({ id, setEditMode, title }: EventEditItemProps) => {
  const [input, setInput] = useState(title);

  const ctx = api.useContext();

  const { mutate, isLoading } = api.count.updateTitle.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.count.getAll.invalidate();
    },
  });

  const submitHandler = () =>
    mutate({
      title: input,
      id,
    });

  return (
    <div>
      <form action="#" method="POST" className="w-full">
        <div className="m-4">
          <label
            htmlFor="item-name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Edit Event Name
          </label>

          <input
            name="item-name"
            id="item-name"
            placeholder="Enter Event Title"
            className="w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            min={6}
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
        </div>
        <div className="m-4">
          {input !== "" && !isLoading && (
            <button
              onClick={submitHandler}
              className="m-4 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Submit
            </button>
          )}

          <button
            onClick={() => setEditMode(false)}
            className="m-4 flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            Cancel
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center">
            <LoadingSpinner size={20} />
          </div>
        )}
      </form>
    </div>
  );
};

export default EventEditItem;
