"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Divider,
  Button,
  cn,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "../auth/utils";
import axios from "axios";
import { BASE_URL } from "../../lib/baseURL";
import { UserCard } from "../common/user-card";

const maxLength = 250; // Maximum length of the content to be displayed

type Props = {
  id: number;
  username: string;
  title: string;
  content: string;
  picture?: string;
  timePassed: string;
  likeCount: number;
  tags: string[];
  initialIsLiked: boolean;
  initialIsBookmarked: boolean;
  timesTaken: number;
};

export default function QuizCard({
  id,
  username,
  title,
  content,
  picture = "",
  timePassed,
  likeCount,
  tags,
  initialIsLiked,
  initialIsBookmarked,
  timesTaken,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(likeCount);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const navigate = useNavigate();
  const { getToken } = AuthActions();
  const token = getToken("access");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLike = () => {
    axios
      .post(
        `${BASE_URL}/quiz/like/`,
        { quiz_id: id },
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
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    setIsLiked(!isLiked);
  };

  const toggleBookmark = () => {
    axios
      .post(
        `${BASE_URL}/quiz/bookmark/`,
        { quiz_id: id },
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

  const displayedText =
    isExpanded || content.length <= maxLength
      ? content
      : `${content.slice(0, maxLength)}... `;

  return (
    <Card className="w-[740px] px-2 pt-2">
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex w-full justify-between">
          <div className="flex gap-3">
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
                      {username}
                    </h5>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <UserCard username={username} />
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-default-400 text-small">{timePassed}</p>
        </div>
        <Divider className="mt-1.5 bg-zinc-200" />
      </CardHeader>
      <div onClick={() => navigate(`/quiz/${id}/details`)} className="flex flex-row justify-between items-center mb-5">
        {picture ? (
          <img
            src={picture}
            alt="quiz"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : (
          <div className="w-[200px] h-[200px] flex justify-center items-center p-8">
            <div className="text-blue-800 text-7xl md:text-7xl font-semibold items-center mb-3 pb-6 pl-3">
              <div className="relative">
                <span className="inline-block transform -rotate-12 translate-y-2">bu</span>
                <span className="text-blue-600 inline-block transform rotate-12 translate-y-2">lingo</span>
              </div>
            </div>
          </div>
        )}
        <div className="w-[500px] h-[200px] flex flex-col justify-between pt-4">
          <CardBody className="px-3 py-0 text-small text-default-600 text-justify leading-relaxed overflow-hidden">
            <div className="flex flex-row justify-between w-full">
              <h2 className="text-2xl font-semibold leading-none text-default-800 mb-1">
                <h2 className="text-default-800 hover:underline">
                  {title}
                </h2>
              </h2>
              <p className="text-default-600 text-sm">{timesTaken} Attemps</p>
            </div>
            <p>
              {displayedText}
              {content.length > maxLength && (
                <span
                  onClick={toggleExpand}
                  style={{ color: "#186df5", cursor: "pointer" }}
                >
                  {isExpanded ? " Read less" : " Read more"}
                </span>
              )}
            </p>
          </CardBody>
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
              {tags &&
                tags.map((tag) => (
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
        </div>
      </div>
    </Card>
  );
}
