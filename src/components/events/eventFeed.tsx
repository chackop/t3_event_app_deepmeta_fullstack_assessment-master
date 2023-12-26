/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "~/utils/api";
import { LoadingPage } from "../loading/loading";
import EventItem from "./eventItem";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const EventFeed = () => {
  const { data, isLoading } = api.count.getAll.useQuery();

  const ctx = api.useContext();

  const { mutate } = api.count.updatePriority.useMutation({
    onSuccess: () => {
      void ctx.count.getAll.invalidate();
    },
  });

  const onDragEndHandler = (event: DragEndEvent) => {
    console.log(event);
    const { active, over } = event;
    if (over && active.id === over.id) {
      return;
    }

    const activeItem = data?.find((item) => item.id === active.id) ?? null;

    if (activeItem) {
      mutate({ id: activeItem.id, priority: activeItem.priority });
    }
  };

  if (!data) return <div>Something went wrong</div>;

  if (isLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  return (
    <div className="w-full">
      {data && (
        <ul role="list" className="divide-y divide-gray-100 overflow-y-scroll">
          {/* <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEndHandler}
          >
            <SortableContext
              items={data}
              strategy={verticalListSortingStrategy}
            > */}
          {data.map((dataItem) => (
            <EventItem
              key={dataItem.id}
              id={dataItem.id}
              title={dataItem.title}
              priority={dataItem.priority}
            />
          ))}
          {/* </SortableContext>
          </DndContext> */}
        </ul>
      )}
    </div>
  );
};

export default EventFeed;
