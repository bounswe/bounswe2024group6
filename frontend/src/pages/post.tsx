import { Suspense, useState } from "react";
import { Navbar } from "../components/common";
import { CommentCardSkeleton, PostCard, CommentCard, PostCardSkeleton } from "../components/post";
import { Divider } from "@nextui-org/react";

export default function Post() {
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
          <div>
            <CommentCardSkeleton />
            <CommentCardSkeleton />
          </div>
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
        <Divider className="bg-zinc-500 w-11/12 mx-auto" />
        <div className="flex flex-col gap-6">
          <Suspense fallback={<CommentCardSkeleton />}>
            <CommentCard />
          </Suspense>
          <Suspense fallback={<CommentCardSkeleton />}>
            <CommentCard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
