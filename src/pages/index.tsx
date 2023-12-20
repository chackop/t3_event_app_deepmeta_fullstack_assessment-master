import { LoadingPage } from "~/components/loading/loading";
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

export default function Home() {
  return (
    <>
      <main className="m-4">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-xl font-medium">Welcome To Event App!</h1>

          <br />

          <EventFeed />
        </div>
      </main>
    </>
  );
}
