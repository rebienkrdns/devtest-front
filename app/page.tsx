import { Suspense } from "react";
import Users from "./users/page";
import Loading from "./components/loading";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Users />
      </Suspense>
    </div>
  );
}
