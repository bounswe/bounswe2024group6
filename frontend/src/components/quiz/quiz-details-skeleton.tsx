import { Card, Skeleton, Divider } from "@nextui-org/react";

export default function QuizDetailsCardSkeleton() {
  return (
    <Card className="max-w-[600px] items-center" data-testid="quiz-card-skeleton">
      <div className="p-4 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <Skeleton className="rounded-full w-6 h-6" />
            <Skeleton className="h-3 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-3 w-20 rounded-lg" />
        </div>
        <Divider className="my-2" />

        {/* Body */}
        <div className="w-[550px] h-[300px] p-4">
          <Skeleton className="h-8 w-2/3 rounded-lg mb-4" />
          <div className="flex justify-between">
            <div className="space-y-4 w-3/5">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-4/5 rounded-lg" />
              <div className="space-y-2 mt-6">
                <Skeleton className="h-3 w-1/3 rounded-lg" />
                <Skeleton className="h-3 w-1/3 rounded-lg" />
                <Skeleton className="h-3 w-1/3 rounded-lg" />
              </div>
              <Skeleton className="h-9 w-1/3 rounded-lg mt-6" />
            </div>
            <Skeleton className="w-[170px] h-[170px] rounded-lg" />
          </div>
        </div>
        
        <Divider className="my-2" />

        {/* Footer */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
}
