import { Card, CardBody, CardHeader, CardFooter, Chip, Button, cn } from "@nextui-org/react";
import Navbar from "../components/common/navbar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {
    IconBookmark,
    IconBookmarkFilled,
    IconThumbUp,
    IconThumbUpFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../lib/baseURL.ts";
import axios from "axios";
import { AuthActions } from "../components/auth/utils.tsx";
import { set } from "react-hook-form";
import QuizCard from "../components/quiz/quiz-card.tsx";
import { Quiz, QuizResponse } from "../types.ts";
import { convertQuizResponseToQuiz } from "../components/common/utils.tsx";
import QuizEndSkeleton from "../components/quiz/quiz-end-skeleton.tsx";

export default function QuizEnd() {
    const { quizID } = useParams<{ quizID: any }>();
    const [quizData, setQuizData] = useState<any>();
    const [quizRecommend, setQuizRecommend] = useState<Quiz>();
    const navigate = useNavigate();
    const { getToken } = AuthActions();
    const token = getToken("access");
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(true);
    const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
    const best_messages = ["Good job!", "Well done!", "Great work!", "Nice job!", "Keep it up!", "You're doing great!", "You're on fire!", "You're unstoppable!", "You're a genius!", "You're a master!"];
    const medium_messages = ["Not bad!", "Nice try!", "Good effort!", "You're getting there!", "You're improving!", "You're on the right track!", "You're doing well!", "You're almost there!", "You're so close!"];
    const bad_messages = ["Try again!", "Keep practicing!", "You can do better!", "You're getting closer!", "You're on the right path!", "Good luck next time!"];
    const [message, setMessage] = useState("");
    const [quiz_id, setquiz_id] = useState();
    const [scorePercentage, setScorePercentage] = useState(0);

    useEffect(() => {
        if (quizID) {
            setIsLoadingQuiz(true);
            axios
                .get(`${BASE_URL}/quiz/result/${quizID}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    setQuizData(response.data.quiz_result);
                    setScorePercentage((response.data.quiz_result.score / response.data.quiz_result.question_count) * 100);
                    setIsLiked(response.data.quiz_result.is_liked);
                    setLikes(response.data.quiz_result.like_count);
                    setIsBookmarked(response.data.quiz_result.is_bookmarked);
                    setquiz_id(response.data.quiz_result.quiz.id);
                })
                .catch((error) => {
                    console.error("Error fetching quiz data:", error);
                })
                .finally(() => {
                    setIsLoadingQuiz(false);
                });
        } else {
            console.error("No quiz ID provided");
        }
    }, [quizID, token]);

    useEffect(() => {
        if (quiz_id) {
            setIsLoadingRecommendation(true);
            axios
                .get(`${BASE_URL}/quiz/recommend/${quiz_id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log("recommended:", response.data);
                    const temp: QuizResponse = response.data;
                    setQuizRecommend(convertQuizResponseToQuiz(temp));
                })
                .catch((error) => {
                    console.error("Error fetching quiz data:", error);
                })
                .finally(() => {
                    setIsLoadingRecommendation(false);
                });
        } else {
            console.error("No quiz ID provided");
        }
    }, [quiz_id, token]);


    useEffect(() => {
        setMessage(getMessage());
    }, [scorePercentage]);

    const getMessage = () => {
        let messageArray;
        if (scorePercentage >= 70) {
            messageArray = best_messages;
        } else if (scorePercentage >= 40) {
            messageArray = medium_messages;
        } else {
            messageArray = bad_messages;
        }
        // Return a random message from the selected array
        return messageArray[Math.floor(Math.random() * messageArray.length)];
    };


    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false); // Example state for bookmark


    const toggleLike = () => {
        axios
            .post(
                `${BASE_URL}/quiz/like/`,
                { quiz_id: quiz_id },
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
                { quiz_id: quiz_id },
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
        <div className="w-screen flex flex-col overflow-hidden">
            <Navbar />
            {isLoadingQuiz ? (
                <QuizEndSkeleton />
            ) : (
                <div className="flex flex-col items-center overflow-hidden w-min">
                    <h1 className="font-semibold text-4xl mt-3 mb-1 text-blue-900">{quizData?.quiz.title}</h1>
                    <div className="flex flex-col items-center pt-4 w-screen">
                        <Card className="max-w-[600px]">
                            <CardHeader className="flex justify-center items-center">
                                <Chip color={
                                    scorePercentage >= 70
                                        ? "success"
                                        : scorePercentage >= 40
                                            ? "warning"
                                            : "danger"
                                } variant="shadow" className="mt-4 h-12">You got {quizData?.score} out of {quizData?.question_count}</Chip>
                            </CardHeader>
                            <CardBody className="flex flex-col justify-center shadow-lg rounded-lg shadow-default-200 pb-12 w-[550px] h-[200px]">
                                <p className="text-center text-5xl text-blue-900">{message}</p>
                            </CardBody>
                            <CardFooter>
                                <div className="flex gap-1 justify-between w-full items-center mx-1">
                                    <div className="flex justify-between gap-1 items-center">
                                        <p
                                            className={cn("font-semibold text-xl text-default-500", {
                                                "font-semibold text-red-500": isLiked,
                                            })}
                                            style={{ width: "15px" }}
                                        >
                                            {likes}
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
                                                <IconThumbUpFilled size={25} stroke={1.5} />
                                            ) : (
                                                <IconThumbUp size={25} stroke={1.5} />
                                            )}
                                        </Button>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <Button color="primary" variant="flat" onClick={() => navigate(`/quiz/${quizData?.quiz.id}`)} className="text-lg w-24 h-12">
                                            Retake
                                        </Button>
                                        <Button color="primary" variant="flat" onClick={() => navigate(`/quiz/${quizID}/review`)} className="text-lg w-24 h-12">
                                            Review
                                        </Button>
                                    </div>
                                    <div className="ml-9">
                                        <Button
                                            isIconOnly
                                            color="secondary"
                                            aria-label="Bookmark"
                                            onClick={toggleBookmark}
                                            variant="light"
                                        >
                                            {isBookmarked ? (
                                                <IconBookmarkFilled size={25} stroke={1.5} />
                                            ) : (
                                                <IconBookmark size={25} stroke={1.5} />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className=" p-4 w-min overflow-hidden items-center mb-1">
                        {isLoadingRecommendation ? (
                            <QuizEndSkeleton showOnlyRecommendation />
                        ) : quizRecommend ? (
                            <div className="flex flex-col justify-center gap-2 items-center w-min">
                                <h1 className="font-semibold text-3xl mt-3 mb-1 text-blue-900">Recommended for you</h1>
                                <QuizCard
                                    key={quizRecommend.id}
                                    id={quizRecommend.id}
                                    username={quizRecommend.author.username}
                                    title={quizRecommend.quiz.title}
                                    content={quizRecommend.quiz.description}
                                    picture={""}
                                    timePassed={quizRecommend.quiz.timestamp}
                                    likeCount={quizRecommend.engagement.like_count}
                                    tags={quizRecommend.quiz.tags}
                                    initialIsLiked={quizRecommend.engagement.is_liked}
                                    initialIsBookmarked={quizRecommend.engagement.is_bookmarked}
                                    timesTaken={quizRecommend.quiz.times_taken}
                                />
                            </div>
                        ) : (
                            <p className="text-center text-2xl text-blue-900">No recommendations available</p>
                        )}
                    </div>
                </div>
            )}
        </div >
    );
}
