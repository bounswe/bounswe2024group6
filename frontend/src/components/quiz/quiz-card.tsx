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
  IconDotsVertical,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "../auth/utils";
import axios from "axios";
import { BASE_URL } from "../../lib/baseURL";
import { UserCard } from "../common/user-card";
import GuestAuthModal from "../auth/guest-auth-modal";
import { ProfileResponse } from "../../types";
import DeleteQuizModal from "../admin/delete-quiz-modal";
import EditQuizTagsModal from "../admin/edit-quiz-tags-modal";

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
  const { getToken, useIsAdmin } = AuthActions();
  const token = getToken("access");
  const isGuest = !token;
  const isAdmin = useIsAdmin();
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteQuizModalOpen, setDeleteQuizModalOpen] = useState(false);
  const [editQuizTagsModalOpen, setEditQuizTagsModalOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

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
    <Card className="w-[740px] pt-2" isPressable>
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
          <div className="flex flex-row items-center justify-end gap-2">
            <p className="text-default-400 text-small text-nowrap">
              {timePassed}
            </p>
            <DeleteQuizModal
              isOpen={deleteQuizModalOpen}
              setIsOpen={setDeleteQuizModalOpen}
              quiz_id={id}
            />
            <EditQuizTagsModal
              isOpen={editQuizTagsModalOpen}
              setIsOpen={setEditQuizTagsModalOpen}
              quizId={id}
              title={title}
              description={content}
              initialTags={tags}
            />
            {isAdmin && (
              <Popover
                key="bottom-end"
                placement="bottom-end"
                onOpenChange={(isOpen) => setPopoverOpen(isOpen)}
                isOpen={popoverOpen}
              >
                <PopoverTrigger>
                  <IconDotsVertical size={20} />
                </PopoverTrigger>
                <PopoverContent className="p-1 pb-2">
                  {title && (
                    <Button
                      variant="light"
                      onClick={() => {
                        setEditQuizTagsModalOpen(true);
                        setPopoverOpen(false); // Close the popover
                      }}
                      className="text-medium mt-2"
                    >
                      Edit Quiz
                    </Button>
                  )}
                  <Button
                    variant="light"
                    color="danger"
                    onClick={() => {
                      setDeleteQuizModalOpen(true);
                      setPopoverOpen(false); // Close the popover
                    }}
                    className="text-medium mt-2"
                  >
                    Delete Quiz
                  </Button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <Divider className="mt-1.5 bg-zinc-200" />
      </CardHeader>
      <div className="flex flex-row justify-between items-center mb-4 ml-4 mr-4">
        {picture ? (
          <img
            src={picture}
            alt="quiz"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "10px",
            }}
            onClick={() => navigate(`/quiz/${id}/details`)}
          />
        ) : (
          <div
            className="w-[200px] h-[200px] flex justify-center items-center p-8"
            onClick={() => navigate(`/quiz/${id}/details`)}
          >
            <div className="text-blue-800 text-7xl md:text-7xl font-semibold items-center mb-3 pb-6 pl-3">
              <div className="relative">
                <span className="inline-block transform -rotate-12 translate-y-2">
                  bu
                </span>
                <span className="text-blue-600 inline-block transform rotate-12 translate-y-2">
                  lingo
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="w-[500px] h-[200px] flex flex-col justify-between pt-4">
          <CardBody
            className="px-3 py-0 text-small text-default-600 text-justify leading-relaxed overflow-hidden"
            onClick={() => navigate(`/quiz/${id}/details`)}
          >
            <div className="flex flex-row justify-between w-full">
              <h2 className="text-2xl font-semibold leading-none text-default-800 mb-1">
                <h2 className="text-default-800">{title}</h2>
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
                <GuestAuthModal
                  isOpen={guestModalOpen}
                  setIsOpen={setGuestModalOpen}
                />
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Like"
                  onClick={isGuest ? () => setGuestModalOpen(true) : toggleLike}
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
                onClick={
                  isGuest ? () => setGuestModalOpen(true) : toggleBookmark
                }
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
