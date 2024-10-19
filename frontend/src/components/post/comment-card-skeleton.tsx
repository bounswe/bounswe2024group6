import { Card, Skeleton } from "@nextui-org/react";

export default function CommentCardSkeleton() {
  return (
    <Card className="w-[540px] h-[180px] space-y-5 p-4" radius="lg">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </Card>
  );
}