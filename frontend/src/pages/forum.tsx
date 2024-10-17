import { Suspense } from "react";
import { Navbar } from "../components/common";
import PostCard from "../components/post/post-card";
import PostCardSkeleton from "../components/post/post-card-skeleton";

export default function Forum() {

  return (
    <div className="flex flex-col items-center">
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
