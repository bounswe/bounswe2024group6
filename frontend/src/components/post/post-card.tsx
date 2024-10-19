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
  Link,
} from "@nextui-org/react";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconThumbUp,
  IconThumbUpFilled,
  IconMessageCircle,
} from "@tabler/icons-react";

const maxLength = 250; // Maximum length of the content to be displayed

type Props = {
  id: number;
  username: string;
  title?: string;
  content: string;
  timePassed: string;
  likeCount: number;
  tags?: string[];
};

export default function PostCard({
  id,
  username,
  title,
  content,
  timePassed,
  likeCount,
  tags,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);
  const [isBookmarked, setIsBookmarked] = useState(false); // Example state for bookmark

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
        <h4 className="text-lg font-semibold leading-none text-black">
          {title}
        </h4>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-600 text-justify leading-relaxed overflow-hidden">
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
      <CardFooter className="flex justify-between gap-3">
        <div className="flex gap-1 items-center">
          <div className="flex gap-3 items-center">
            <p
              className={cn("font-semibold text-default-500", {
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
          <Link href={`/post/${id}`}>
            <Button
              isIconOnly
              color="warning"
              aria-label="Message"
              variant="light"
            >
              <IconMessageCircle size={20} stroke={1.5} />
            </Button>
          </Link>
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
    </Card>
  );
}
