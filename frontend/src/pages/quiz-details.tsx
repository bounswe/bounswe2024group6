import { useEffect, useState } from "react";
import Navbar from "../components/common/navbar.tsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Divider,
    Button,
    cn,
    PopoverTrigger,
    PopoverContent,
    Popover,
} from "@nextui-org/react";
import {
    IconBookmark,
    IconBookmarkFilled,
    IconThumbUp,
    IconThumbUpFilled,
    IconPhotoOff,
} from "@tabler/icons-react";
import { BASE_URL } from "../lib/baseURL.ts";
import axios from "axios";
import { AuthActions } from "../components/auth/utils.tsx";
import { convertQuizDetailsResponseToQuizDetails } from "../components/common/utils.tsx";
import { QuizDetail } from "../types.ts";
import { UserCard } from "../components/common/user-card.tsx";
import QuizDetailsCardSkeleton from "../components/quiz/quiz-details-skeleton.tsx";

const quiz = {
    picture: "https://nextui.org/avatars/avatar-1.png",
};

export default function QuizDetails() {
    const { quizID } = useParams<{ quizID: any }>();
    const [quizData, setQuizData] = useState<QuizDetail>();
    const [isLoading, setIsLoading] = useState(true);
    const { getToken } = AuthActions();
    const token = getToken("access");
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(quizData?.is_liked);
    const [likes, setLikes] = useState(quizData?.like_count);
    const [isBookmarked, setIsBookmarked] = useState(quizData?.is_bookmarked);
    const [hasAttempted, setHasAttempted] = useState(quizData?.has_unfinished_progress);

    useEffect(() => {
        if (quizID) {
            setIsLoading(true);
            const headers = {
                ...(token && { Authorization: `Bearer ${token}` }),
            };
            axios
                .get(`${BASE_URL}/quiz/${quizID}/`, {
                    headers
                })
                .then((response) => {
                    console.log(response.data);
                    setQuizData(convertQuizDetailsResponseToQuizDetails(response.data));
                    setIsLiked(response.data.quiz.is_liked);
                    setLikes(response.data.quiz.like_count);
                    setIsBookmarked(response.data.quiz.is_bookmarked);
                    setHasAttempted(response.data.has_unfinished_progress);
                })
                .catch((error) => {
                    console.error("Error fetching quiz data:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            console.error("No quiz ID provided");
        }
    }, [quizID, token]);



    const toggleLike = () => {
        axios
            .post(
                `${BASE_URL}/quiz/like/`,
                { quiz_id: quizID },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                if (isLiked) {
                    setLikes(likes - 1);
                } else {
                    setLikes(likes + 1);
                }
                setIsLiked(!isLiked);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const toggleBookmark = () => {
        axios
            .post(
                `${BASE_URL}/quiz/bookmark/`,
                { quiz_id: quizID },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                setIsBookmarked(!isBookmarked);
            });
    };

    return (
        <div className="h-screen w-screen items-center gap-2 flex flex-col">
            <Navbar />
            {isLoading
                ? <QuizDetailsCardSkeleton />
                : (
                    <Card className="max-w-[600px] items-center">
                        <CardHeader className="flex flex-col items-start gap-2">
                            <div className="flex w-full justify-between items-center px-1">
                                <div className="flex items-center gap-3 my-2">
                                    <Popover showArrow placement="bottom">
                                        <PopoverTrigger>
                                            <div className="flex flex-row gap-3 items-center">
                                                <Avatar
                                                    as="button"
                                                    isBordered
                                                    radius="full"
                                                    className="w-6 h-6 text-tiny"
                                                    src="https://nextui.org/avatars/avatar-1.png"
                                                />
                                                <div className="flex flex-col gap-1 items-start justify-center">
                                                    <h5 className="text-small tracking-tight text-default-400">
                                                        {quizData?.author.username}
                                                    </h5>
                                                </div>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-1">
                                            <UserCard username={quizData?.author.username || ""} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <p className="text-default-400 items-center text-small">{quizData?.timestamp}</p>
                            </div>
                            <Divider className="mt-1.5 bg-zinc-200" />
                        </CardHeader>
                        <CardBody className="flex flex-col justify-start rounded-lg shadow-zinc-200 w-[550px] h-[300px] overflow-hidden mb-2">
                            <div className="flex flex-row justify-between w-full mx-2 mb-4">
                                <h2 className="text-3xl font-semibold leading-none text-default-900">
                                    {quizData?.title}
                                </h2>
                            </div>
                            <div className="flex flex-col justify-center mx-3">
                                <div className="flex flex-row justify-between">
                                    <div >
                                        <p className="w-full items-center text-lg mb-4">{quizData?.description}</p>
                                        <div className="flex flex-col justify-center gap-1 my-4">
                                            <p>Attempts: {quizData?.times_taken}</p>
                                            <p>Question Count: {quizData?.question_count}</p>
                                            <p>Average Score: {quizData?.average_score}</p>
                                        </div>
                                    </div>
                                    {quiz.picture ? (
                                        <img
                                            src={quiz.picture}
                                            alt="quiz"
                                            style={{
                                                width: "170px",
                                                height: "170px",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: "200px",
                                                height: "200px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "#f0f0f0", // Light gray background for the fallback
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <IconPhotoOff style={{ width: '70%', height: '70%', position: 'center', top: '50%', left: '50%' }} stroke={1.5} color="gray" />
                                        </div>
                                    )}
                                </div>

                        <div className="w-full flex flex-row justify-start gap-3 items-center">
                            <Button color="primary" variant="solid" onClick={() => navigate(`/quiz/${quizData?.id}`, { state: { isNotResuming: true } })}
                                className="w-1/3 items-center text-center mt-3">
                                Start Quiz
                            </Button>
                            {hasAttempted && (
                                <Button color="primary" variant="faded" onClick={() => navigate(`/quiz/${quizData?.id}`, { state: { isNotResuming: false } })} className="w-1/4 items-center text-center mt-3">
                                    Resume Quiz
                                </Button>
                            )}
                        </div>
                    </div>
                </CardBody>
                <Divider className="bg-zinc-200" />
                <CardFooter className="flex justify-between gap-2">
                    <div className="flex gap-0 items-center">
                        <div className="flex justify-between items-center">
                            <p
                                className={cn("font-semibold text-default-500", {
                                    "font-semibold text-red-500": isLiked,
                                })}
                            >
                                {quizData?.like_count}
                            </p>
                            <Button
                                isIconOnly
                                color="danger"
                                aria-label="Like"
                                onClick={toggleLike}
                                variant="light"
                                className="flex items-center gap-3"
                            >
                                {isLiked ? (
                                    <IconThumbUpFilled size={20} stroke={1.5} />
                                ) : (
                                    <IconThumbUp size={20} stroke={1.5} />
                                )}
                            </Button>
                        </div>
                        <Button
                            isIconOnly
                            color="secondary"
                            aria-label="Bookmark"
                            onClick={toggleBookmark}
                            variant="light"
                        >
                            {isBookmarked ? (
                                <IconBookmarkFilled size={20} stroke={1.5} />
                            ) : (
                                <IconBookmark size={20} stroke={1.5} />
                            )}
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        {quizData?.tags &&
                            quizData?.tags.map((tag) => (
                                <Button
                                    key={tag}
                                    color="primary"
                                    variant="flat"
                                    className="text-sm h-8"
                                    size="sm"
                                    radius="full"
                                >
                                    #{tag}
                                </Button>
                            ))}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
