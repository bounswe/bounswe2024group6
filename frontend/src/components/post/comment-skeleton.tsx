import { Card, Skeleton } from "@nextui-org/react";

export default function CommentSkeleton() {
  return (
    <Card
      className="w-[740px] h-[120px] space-y-5 p-4"
      radius="lg"
      data-testid="post-card-skeleton"
    >
      <div className="w-full flex flex-col gap-4">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />

        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
