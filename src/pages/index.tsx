/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import EventItemCreation from "~/components/events/eventCreation";
import EventFeed from "~/components/events/eventFeed";

export default function Home() {
  return (
    <>
      <main className="m-4">
        <div className="flex grow flex-col items-center">
          <br />

          <EventItemCreation />

          <EventFeed />
        </div>
      </main>
    </>
  );
}
