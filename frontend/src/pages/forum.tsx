import { Suspense, useState } from "react";
import { Navbar } from "../components/common";
import { PostCard, PostCardSkeleton } from "../components/post";

export default function Forum() {
  const [test, setTest] = useState(true);

  setTimeout(() => {
    setTest(false);
  }, 1000);

  if (test)
    return (
      <div className="flex flex-col items-center">
        <Navbar />
        <div className="flex flex-col gap-6">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Navbar />
      <div className="flex flex-col gap-6">
        <Suspense fallback={<PostCardSkeleton />}>
          <PostCard />
        </Suspense>
        <Suspense fallback={<PostCardSkeleton />}>
          <PostCard />
        </Suspense>
        <Suspense fallback={<PostCardSkeleton />}>
          <PostCard />
        </Suspense>
      </div>
    </div>
  );
}
