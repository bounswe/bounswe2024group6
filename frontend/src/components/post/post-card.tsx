"use client";
import { useEffect, useState } from "react";
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
  IconMessageCircle,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "../auth/utils";
import { PostResponse } from "../../types";
import { convertPostResponseToPost } from "../common/utils";
import axios from "axios";
import { BASE_URL } from "../../lib/baseURL";
import { UserCard } from "../common/user-card";
import GuestAuthModal from "../auth/guest-auth-modal";
import ClickableText from "../common/clickable-text";
import { ProfileResponse } from "../../types";
import DeletePostModal from "../admin/delete-post-modal";

const maxLength = 250; // Maximum length of the content to be displayed

type Props = {
  id: number;
  username: string;
  title?: string;
  content: string;
  timePassed: string;
  likeCount: number;
  tags?: string[];
  initialIsLiked: boolean;
  initialIsBookmarked: boolean;
};

export default function PostCard({
  id,
  username,
  title,
  content,
  timePassed,
  likeCount,
  tags,
  initialIsLiked,
  initialIsBookmarked,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(likeCount);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const navigate = useNavigate();
  const { getToken, useIsAdmin } = AuthActions();
  const token = getToken("access");
  const isGuest = !token;
  const isAdmin = useIsAdmin();
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [deletePostModalOpen, setDeletePostModalOpen] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (username) {
      setIsLoading(true);
      axios
        .get(`${BASE_URL}/profile/${username}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data: ProfileResponse = response.data;
          console.log("profile", data);
          setProfileImage(response.data.profile_picture);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [username, token]);

  const toggleLike = () => {
    if (title) {
      axios
        .post(
          `${BASE_URL}/post/${isLiked ? "unlike" : "like"}/`,
          { post_id: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setLikes(response.data.like_count);
        })
        .catch((error) => {
          if (
            error.response.data.detail === "You have already liked this post."
          ) {
            setIsLiked(true);
          }
          console.log(error.response.data);
        });
      setIsLiked(!isLiked);
    } else {
      axios
        .post(
          `${BASE_URL}/post/comment/${isLiked ? "unlike" : "like"}/`,
          { comment_id: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setLikes(response.data.like_count);
        })
        .catch((error) => {
          if (
            error.response.data.detail ===
            "You have already liked this comment."
          ) {
            setIsLiked(true);
          }
          console.log(error.response.data);
        });
      setIsLiked(!isLiked);
    }
  };

  const toggleBookmark = () => {
    if (title) {
      axios
        .post(
          `${BASE_URL}/${isBookmarked ? "unbookmark" : "bookmark"}/`,
          { post_id: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setIsBookmarked(response.data.is_bookmarked);
        });
    } else {
      axios
        .post(
          `${BASE_URL}/comments/${isBookmarked ? "unbookmark" : "bookmark"}/`,
          { comment_id: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setIsBookmarked(response.data.is_bookmarked);
        });
    }
  };

  const displayedText =
    isExpanded || (content && content.length <= maxLength)
      ? content
      : `${content.slice(0, maxLength)}... `;

  return (
    <Card className="w-[740px] px-2 pt-2" data-testid="post-card" isPressable>
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
                    src={
                      profileImage || "https://nextui.org/avatars/avatar-1.png"
                    }
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
          <div
            onClick={() => navigate(title ? `/post/${id}` : `/comment/${id}`)}
            className="w-full"
          />
          <div className="flex flex-row items-center justify-end gap-2">
            <p className="text-default-400 text-small text-nowrap">
              {timePassed}
            </p>
            <DeletePostModal
              isOpen={deletePostModalOpen}
              setIsOpen={setDeletePostModalOpen}
              post_id={id}
              isPost={title ? true : false}
            />
            {isAdmin && (
              <Popover
                key="bottom-end"
                placement="bottom-end"
                onOpenChange={(isOpen) => setPopoverOpen(isOpen)}
                isOpen={popoverOpen}
              >
                <PopoverTrigger data-testid="admin-popover">
                  <IconDotsVertical size={20} />
                </PopoverTrigger>
                <PopoverContent className="p-1 pb-2">
                  {title && (
                    <Button
                      variant="light"
                      onClick={() => {
                        navigate(`/edit-post/${id}`);
                        setPopoverOpen(false); // Close the popover
                      }}
                      className="text-medium mt-2"
                    >
                      Edit Post
                    </Button>
                  )}
                  <Button
                    variant="light"
                    color="danger"
                    onClick={() => {
                      setDeletePostModalOpen(true);
                      setPopoverOpen(false); // Close the popover
                    }}
                    className="text-medium mt-2"
                  >
                    {title ? "Delete Post" : "Delete Comment"}
                  </Button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <Divider className="mt-1.5 bg-zinc-200" />
        <h4
          className="text-lg font-semibold leading-none text-default-900"
          onClick={() => navigate(title ? `/post/${id}` : `/comment/${id}`)}
        >
          {title}
        </h4>
      </CardHeader>
      <CardBody
        onClick={() => navigate(title ? `/post/${id}` : `/comment/${id}`)}
        className="px-3 py-0 text-small text-default-600 text-justify leading-relaxed overflow-hidden"
      >
        <p>
          <ClickableText text={displayedText} />
          {content && content.length > maxLength && (
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
          <div className="flex justify-between items-center">
            <p
              className={cn("font-semibold text-default-500", {
                "font-semibold text-red-500": isLiked,
              })}
            >
              {likes}
            </p>
            <GuestAuthModal
              isOpen={guestModalOpen}
              setIsOpen={setGuestModalOpen}
            />
            <Button
              isIconOnly
              color="danger"
              aria-label="Like"
              onClick={
                isGuest
                  ? () => {
                      setGuestModalOpen(true);
                    }
                  : toggleLike
              }
              variant="light"
              className="flex items-center gap-3"
              data-testid="like-button"
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
            onClick={
              isGuest
                ? () => {
                    setGuestModalOpen(true);
                  }
                : toggleBookmark
            }
            variant="light"
          >
            {isBookmarked ? (
              <IconBookmarkFilled size={20} stroke={1.5} />
            ) : (
              <IconBookmark size={20} stroke={1.5} />
            )}
          </Button>
          <Button
            isIconOnly
            onClick={() => navigate(title ? `/post/${id}` : `/comment/${id}`)}
            color="warning"
            aria-label="Message"
            variant="light"
          >
            <IconMessageCircle size={20} stroke={1.5} />
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
    </Card>
  );
}
