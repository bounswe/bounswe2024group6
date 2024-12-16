import { Card, Skeleton, Divider } from "@nextui-org/react";

type Props = {
    showOnlyRecommendation?: boolean;
};

export default function QuizEndSkeleton({ showOnlyRecommendation = false }: Props) {
    if (showOnlyRecommendation) {
        return (
            <div className="p-4 w-min overflow-hidden items-center mb-1">
                <Skeleton className="h-12 w-[300px] rounded-lg mx-auto mb-4" />
                <Card className="w-[740px]">
                    <div className="flex flex-row justify-between items-center m-4">
                        <Skeleton className="w-[200px] h-[200px] rounded-lg" />
                        <div className="w-[500px] flex flex-col gap-4">
                            <Skeleton className="h-8 w-4/5 rounded-lg" />
                            <Skeleton className="h-24 w-full rounded-lg" />
                            <div className="flex justify-between mt-4">
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-20 rounded-full" />
                                    <Skeleton className="h-8 w-20 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-screen overflow-hidden">
            {/* Quiz Title Skeleton */}
            <Skeleton className="h-12 w-[400px] rounded-lg mt-3 mb-1" />

            <div className="flex flex-col items-center pt-4 w-screen">
                <Card className="max-w-[600px]">
                    {/* Score Chip Skeleton */}
                    <div className="flex justify-center items-center p-4">
                        <Skeleton className="h-12 w-[200px] rounded-full" />
                    </div>

                    {/* Message Body Skeleton */}
                    <div className="flex flex-col justify-center shadow-lg rounded-lg w-[550px] h-[200px] p-6">
                        <Skeleton className="h-16 w-4/5 mx-auto rounded-lg" />
                    </div>

                    {/* Footer Actions Skeleton */}
                    <div className="flex gap-1 justify-between w-full items-center p-4">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <div className="flex gap-4">
                            <Skeleton className="h-12 w-24 rounded-lg" />
                            <Skeleton className="h-12 w-24 rounded-lg" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                </Card>
            </div>

            {/* Recommended Quiz Section Skeleton */}
            <div className="p-4 w-min overflow-hidden items-center mb-1">
                <Skeleton className="h-12 w-[300px] rounded-lg mx-auto mb-4" />
                {/* Reuse QuizQuestionSkeleton or create a simplified version */}
                <Card className="w-[740px]">
                    <div className="flex flex-row justify-between items-center m-4">
                        <Skeleton className="w-[200px] h-[200px] rounded-lg" />
                        <div className="w-[500px] flex flex-col gap-4">
                            <Skeleton className="h-8 w-4/5 rounded-lg" />
                            <Skeleton className="h-24 w-full rounded-lg" />
                            <div className="flex justify-between mt-4">
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-20 rounded-full" />
                                    <Skeleton className="h-8 w-20 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
