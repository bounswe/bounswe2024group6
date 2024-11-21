import { useState } from "react";
import Navbar from "../components/common/navbar.tsx";
import { useNavigate, useLocation } from "react-router-dom";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Divider,
    Button,
    cn,
} from "@nextui-org/react";
import {
    IconBookmark,
    IconBookmarkFilled,
    IconThumbUp,
    IconThumbUpFilled,
    IconPhotoOff,
} from "@tabler/icons-react";

const quiz = {
    id: 1,
    author: "elifndeniz",
    title: "Geographical Landforms",
    content: "Different types of landforms.",
    picture: "https://nextui.org/avatars/avatar-1.png",
    timestamp: "1h ago",
    likeCount: 10,
    attempts: 15,
    questionCount: 10,
    averageScore: 8,
    timeLimit: "No Limit",
    tags: ["other", "A2"],
};

export default function QuizDetails() {
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(quiz.likeCount);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(true);


    const toggleLike = () => {
        setIsLiked(!isLiked);
        setLikes(likes + (!isLiked ? 1 : -1));
    };

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <div className="h-screen w-screen items-center gap-2 flex flex-col">
            <Navbar />

            <Card className="max-w-[600px] items-center">
                <CardHeader className="flex flex-col items-start gap-2">
                    <div className="flex w-full justify-between items-center px-1">
                        <div className="flex items-center gap-3 my-2">
                            <Avatar
                                isBordered
                                radius="full"
                                className="w-6 h-6 text-tiny"
                                src="https://nextui.org/avatars/avatar-1.png"
                            />
                            <div className="flex flex-col gap-1 items-center justify-center">
                                <h5 className="text-small tracking-tight text-default-400">
                                    {quiz.author}
                                </h5>
                            </div>
                        </div>
                        <p className="text-default-400 items-center text-small">{quiz.timestamp}</p>
                    </div>
                    <Divider className="mt-1.5 bg-zinc-200" />
                </CardHeader>
                <CardBody className="flex flex-col justify-start rounded-lg shadow-zinc-200 w-[550px] h-[300px] overflow-hidden mb-2">
                    <div className="flex flex-row justify-between w-full mx-2 mb-4">
                        <h2 className="text-3xl font-semibold leading-none text-black">
                            {quiz.title}
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center mx-3">
                        <div className="flex flex-row justify-between">
                            <div >
                                <p className="w-full items-center text-lg mb-4">{quiz.content}</p>
                                <div className="flex flex-col justify-center gap-1 my-4">
                                    <p>Attempts: {quiz.attempts}</p>
                                    <p>Question Count: {quiz.questionCount}</p>
                                    <p>Average Score: {quiz.averageScore}</p>
                                    <p>Time Limit: {quiz.timeLimit}</p>
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
                            <Button color="primary" variant="solid" onClick={() => navigate(`/quiz/${quiz.id}`)}
                                className="w-1/3 items-center text-center mt-3">
                                Start Quiz
                            </Button>
                            {hasAttempted && (
                                <Button color="primary" variant="faded" onClick={() => navigate(`/quiz/${quiz.id}`)} className="w-1/4 items-center text-center mt-3">
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
                        {quiz.tags &&
                            quiz.tags.map((tag) => (
                                <Button
                                    key={tag}
                                    color="primary"
                                    variant="flat"
                                    className="text-sm h-8"
                                    size="sm"
                                    radius="full"
                                >
                                    {tag}
                                </Button>
                            ))}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
