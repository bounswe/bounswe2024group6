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
} from "@nextui-org/react";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

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
};

export default function PostCard({
  id,
  username,
  title,
  content,
  picture = "https://nextui.org/avatars/avatar-1.png",
  timePassed,
  likeCount,
  tags,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(likes + (!isLiked ? 1 : -1));
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const displayedText =
    isExpanded || content.length <= maxLength
      ? content
      : `${content.slice(0, maxLength)}... `;

  return (
    <Card className="w-[740px] px-2 pt-2 bg-white">
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex w-full justify-between">
          <div className="flex gap-3">
            <Avatar
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
          <p className="text-default-400 text-small">{timePassed}</p>
        </div>
        <Divider className="mt-1.5 bg-zinc-200" />
      </CardHeader>
      <div className="flex flex-row justify-between items-center mb-5">
        <img src={picture} style={{ width: "200px", height: "200px", objectFit: "cover", objectPosition: "center" }} ></img>
        <div className="w-[500px] flex flex-col justify-between h-full pt-4">
          <CardBody className="px-3 py-0 text-small text-default-600 text-justify leading-relaxed overflow-hidden">
            <div className="flex flex-row justify-between w-full">
              <h2 className="text-2xl font-semibold leading-none text-black">
                <Link to={`/quiz/${id}/details`} className="text-black hover:underline">
                  {title}
                </Link>
              </h2>
              <p className="text-default-600 text-sm">15 Attemps</p>
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
                    {tag}
                  </Button>
                ))}
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
