import { Card, Skeleton, Divider, Spinner } from "@nextui-org/react";

export default function QuizQuestionSkeleton() {
  return (
    <div className="flex flex-row items-start gap-8 w-full justify-center">
      {/* Question Image Spinner */}
      <div className="w-[400px] h-[400px] mt-24 rounded-lg flex items-center justify-center bg-gray-50 shadow-md">
        <Spinner size="lg" color="primary" />
      </div>

      <div className="flex flex-col items-center py-4">
        {/* Quiz Title */}
        <Skeleton className="h-12 w-[200px] rounded-lg mb-4" />

        <Card className="max-w-[600px]">
          {/* Card Header */}
          <div className="flex flex-row justify-center w-full items-center gap-3 p-4">
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
          <Divider />

          {/* Card Body - Question */}
          <div className="flex flex-col justify-center shadow-lg rounded-lg w-[550px] h-[200px] p-6">
            <Skeleton className="h-12 w-4/5 mx-auto rounded-lg" />
          </div>

          {/* Card Footer - Options */}
          <div className="w-[550px] h-[170px] py-6 px-4">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-12 rounded-lg" />
              ))}
            </div>
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-24 mt-4 my-1">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
