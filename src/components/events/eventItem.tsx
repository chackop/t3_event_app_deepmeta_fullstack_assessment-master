import { useSortable } from "@dnd-kit/sortable";
import { api } from "~/utils/api";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import EventEditItem from "./eventEditItem";

interface EventItemProps {
  id: string;
  title: string;
  priority: number;
}

const EventItem = ({ id, title, priority }: EventItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: priority });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const ctx = api.useContext();

  const { mutate } = api.count.delete.useMutation({
    onSuccess: () => {
      void ctx.count.getAll.invalidate();
    },
  });

  const [editMode, setEditMode] = useState(false);

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="m-4 flex justify-center gap-x-4 rounded-2xl bg-gray-50 p-3 py-10 text-center ring-1 ring-inset"
    >
      {editMode ? (
        <EventEditItem setEditMode={setEditMode} id={id} title={title} />
      ) : (
        <>
          <div className="flex gap-x-6">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {title}
            </p>
          </div>

          <button
            className="flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            onClick={() => mutate({ id })}
          >
            Delete
          </button>

          <button
            className="flex-none rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        </>
      )}
    </li>
  );
};

export default EventItem;
