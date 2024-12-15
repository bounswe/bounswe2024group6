import Navbar from "../components/common/navbar.tsx";

import {
  Tabs,
  Tab,
  Avatar,
  Button,
  Divider,
  Skeleton,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  Card,
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@nextui-org/react";
import { useState, useEffect, Suspense } from "react";

import PostCard from "../components/post/post-card.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../lib/baseURL";
import type { Post, Profile, ProfileResponse, Quiz } from "../types.ts";
import {
  IconBookmark,
  IconSquareRoundedCheck,
  IconBorderAll,
  IconClipboardText,
  IconAbc,
  IconDotsVertical,
} from "@tabler/icons-react";
import { AuthActions } from "../components/auth/utils.tsx";
import {
  convertPostResponseToPost,
  convertProfileResponseToProfile,
  convertQuizResponseToQuiz,
} from "../components/common/utils.tsx";
import { UserCard } from "../components/common/user-card.tsx";
import Cookies from "js-cookie";
import { usePageTitle } from "../components/common/usePageTitle.ts";
import QuizCard from "../components/quiz/quiz-card.tsx";
import GuestAuthModal from "../components/auth/guest-auth-modal.tsx";
import ClickableText from "../components/common/clickable-text.tsx";

export default function Profile() {
  usePageTitle("Profile");
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const { getToken } = AuthActions();
  const token = getToken("access");
  const isGuest = !token;
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [bookmarkedQuizzes, setBookmarkedQuizzes] = useState<Quiz[]>([]);
  const [bookmarkedWords, setBookmarkedWords] = useState<any[]>([]);
  const [solvedQuizzes, setSolvedQuizzes] = useState<Quiz[]>([]);
  const [createdQuizzes, setCreatedQuizzes] = useState<Quiz[]>([]);
  const [likedQuizzes, setLikedQuizzes] = useState<Quiz[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [followings, setFollowings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [type, setType] = useState<string>("following");
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);


  const handleOpen = (type) => {
    setType(type);
    onOpen();
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
          console.log(data);
          const profile = convertProfileResponseToProfile(data);
          const sortedVersion = [...profile.posts].sort((a, b) => {
            return (
              new Date(b.post.created_at).getTime() -
              new Date(a.post.created_at).getTime()
            );
          });
          setFollowCount(profile.followers);
          setIsFollowing(profile.is_followed);
          setSortedPosts(sortedVersion);
          setProfile(profile);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [username, token]);

  useEffect(() => {
    if (username === Cookies.get("username")) {
      axios
        .post(
          `${BASE_URL}/get_bookmarked_posts/`,
          {
            username: profile?.username,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("bookmarked posts:", response.data);
          const bookmarked = response.data.map(convertPostResponseToPost);
          setBookmarkedPosts(bookmarked);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Not fetching bookmarked posts");
    }
  }, [token]);

  useEffect(() => {
    if (username === Cookies.get("username")) {
      axios
        .get(`${BASE_URL}/quiz/bookmarks/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("bookmarked quizzes:", response.data);
          const bookmarked = response.data.map(convertQuizResponseToQuiz);
          setBookmarkedQuizzes(bookmarked);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Not fetching bookmarked posts");
    }
  }, [token]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/quiz/solved/${username}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("solved", response.data);
        const solved = response.data.map(convertQuizResponseToQuiz);
        setSolvedQuizzes(solved);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/quiz/likes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("liked quizzes", response.data);
        const liked = response.data.map(convertQuizResponseToQuiz);
        setLikedQuizzes(liked);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/quiz/created/${username}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const createdquiz = response.data.map(convertQuizResponseToQuiz);
        setCreatedQuizzes(createdquiz);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile/followers/${username}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("followers", response.data);
        setFollowers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile/following/${username}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("following", response.data);
        setFollowings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/word/bookmarks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBookmarkedWords(response.data.bookmarked_words);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const toggleFollow = () => {
    axios
      .post(
        `${BASE_URL}/profile/${isFollowing ? "unfollow" : "follow"}/`,
        {
          username: profile?.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setFollowCount(response.data.follower_count);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsFollowing(!isFollowing);
  };

  const ProfileSkeleton = () => (
    <div className="flex justify-center gap-6 items-center w-full px-32 py-3">
      <div className="flex items-center px-2 rounded-lg">
        <Skeleton className="rounded-full w-24 h-24" />
        <div className="mx-4 max-w-52">
          <Skeleton className="h-6 w-16 rounded-lg mb-2" />
          <Skeleton className="h-4 w-12 rounded-lg mb-2" />
          <Skeleton className="h-4 w-24 rounded-lg" />
        </div>
      </div>
      <div className="flex flex-row pl-32 gap-6">
        <Skeleton className="h-14 w-36 rounded-lg" />
        <Skeleton className="h-14 w-36 rounded-lg" />
        <Skeleton className="h-14 w-36 rounded-lg" />
      </div>
    </div>
  );

  return (
    <div className="h-full w-full items-center overflow-hidden flex flex-col">
      <GuestAuthModal isOpen={guestModalOpen} setIsOpen={setGuestModalOpen} />
      <Navbar />
      {isLoading ? (
        <>
          <ProfileSkeleton />
        </>
      ) : (
        profile && (
          <div className="flex justify-center gap-6 items-center w-full px-32 py-3">
            <div className="flex items-center px-2 rounded-lg">
              <Avatar
                src="https://nextui.org/avatars/avatar-1.png"
                className="mr-2 w-24 h-24"
              />
              <div className="mx-4 max-w-52">
                <h3 className="text-xl font-semibold">{profile.username}</h3>
                <p className="text-gray-500">@{profile.level}</p>
                <p className="text-zinc-600 break-words">
                  {profile.bio || "Hey, new learner here!"}
                </p>
              </div>
            </div>
            <div
              className={`flex flex-row ${profile.username === Cookies.get("username") ? "pl-32" : "pl-0"
                } gap-6 items-center`}
            >
              {profile.username !== Cookies.get("username") && (
                <Button
                  variant={isFollowing ? "faded" : "solid"}
                  color="primary"
                  onClick={
                    isGuest ? () => setGuestModalOpen(true) : toggleFollow
                  }
                  className={`border-2 rounded-lg min-w-36 font-bold px-8 py-6 ${isFollowing ? "text-blue-900" : ""
                    }`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
              <Button
                variant="faded"
                onPress={() => handleOpen("following")}
                color="primary"
                className="border-2 rounded-lg font-bold text-blue-900 px-8 py-6 "
              >
                {profile.following} Following
              </Button>
              <Button
                variant="faded"
                onPress={() => handleOpen("follower")}
                color="primary"
                className="border-2 rounded-lg font-bold text-blue-900 px-8 py-6 "
              >
                {followCount} Followers
              </Button>
              <Popover key="bottom-end" placement="bottom-end" onOpenChange={(isOpen) => setPopoverOpen(isOpen)} isOpen={popoverOpen}>
                <PopoverTrigger>
                  <IconDotsVertical size={30} />
                </PopoverTrigger>
                <PopoverContent className="p-1 pb-2">
                  <Button
                    variant="light"
                    onClick={() => {
                      handleOpen("quiz");
                      setPopoverOpen(false); // Close the popover
                    }}
                    className="text-medium mt-2"
                  >
                    Liked Quizzes
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => {
                      handleOpen("post");
                      setPopoverOpen(false); // Close the popover
                    }}
                    className="text-medium w-full"
                  >
                    Liked Posts
                  </Button>
                </PopoverContent>
              </Popover>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className={`${type === "quiz" || type === "post" ? "max-w-[740px]" : "max-w-[360px]"
                  } flex flex-col items-center`}
                backdrop="blur"
              >
                <ModalContent className="pb-6 gap-3">
                  <ModalHeader className="text-lg font-semibold">
                    {type === "follower"
                      ? "Followers"
                      : type === "following"
                        ? "Following"
                        : type === "post"
                          ? "Liked Posts"
                          : type === "quiz"
                            ? "Liked Quizzes"
                            : ""}
                  </ModalHeader>
                  {type === "quiz" ? (
                    likedQuizzes.length > 0 ? (
                      likedQuizzes.map((quiz) => (
                        <div key={quiz.id} className="border-1 rounded-xl">
                          <QuizCard
                            id={quiz.id}
                            username={quiz.author.username}
                            title={quiz.quiz.title}
                            content={quiz.quiz.description}
                            timePassed={quiz.quiz.timestamp}
                            timesTaken={quiz.quiz.times_taken}
                            likeCount={quiz.engagement.like_count}
                            tags={quiz.quiz.tags}
                            initialIsLiked={quiz.engagement.is_liked}
                            initialIsBookmarked={quiz.engagement.is_bookmarked}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-default-500">No liked quizzes found.</p>
                    )
                  ) 
                  : type === "post" ? (
                    <p>No liked post found.</p>
                  )
                  : (type === "follower" || type === "following") &&
                    (type === "follower" ? followers : followings).length > 0 ? (
                    (type === "follower" ? followers : followings).map((user) => (
                      <div key={user.username} className="border-1 rounded-xl">
                        <UserCard
                          username={user.username}
                          bio={user.bio}
                          follower_count={user.follower_count}
                          following_count={user.following_count}
                          is_followed={user.is_followed}
                          level={user.level}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-default-500">
                      No {type === "follower" ? "followers" : "following"} found.
                    </p>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        )
      )}
      <Divider className="my-4 w-1/2 border-t-4 p-[0.75px] rounded-2xl border-gray-400" />
      <div className="flex w-full flex-col items-center">
        <Tabs aria-label="Options">
          <Tab
            key="post"
            title={
              <div className="flex items-center space-x-2">
                <IconBorderAll size={20} stroke={1.5} />
                <span>Posts</span>
              </div>
            }
          >
            {profile && (
              <div className="flex flex-col p-5 items-center">
                <div className="flex flex-col gap-4 items-center">
                  {profile &&
                    sortedPosts.map((post) => {
                      return (
                        <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                          <PostCard
                            id={post.id}
                            username={profile.username}
                            title={post.post.title}
                            content={post.post.content}
                            timePassed={post.post.timestamp}
                            likeCount={post.engagement.likes}
                            tags={post.post.tags}
                            initialIsLiked={post.engagement.is_liked}
                            initialIsBookmarked={post.engagement.is_bookmarked}
                          />
                        </Suspense>
                      );
                    })}
                </div>
              </div>
            )}
          </Tab>
          <Tab
            key="quiz"
            title={
              <div className="flex items-center space-x-2">
                <IconClipboardText size={20} stroke={1.5} />
                <span>Quizzes</span>
              </div>
            }
          >
            <div className="flex flex-col gap-4 items-center">
              {createdQuizzes.map((quiz) => (
                <Suspense key={quiz.id} fallback={<PostCardSkeleton />}>
                  <QuizCard
                    id={quiz.id}
                    username={quiz.author.username}
                    title={quiz.quiz.title}
                    content={quiz.quiz.description}
                    timePassed={quiz.quiz.timestamp}
                    timesTaken={quiz.quiz.times_taken}
                    likeCount={quiz.engagement.like_count}
                    tags={quiz.quiz.tags}
                    initialIsLiked={quiz.engagement.is_liked}
                    initialIsBookmarked={quiz.engagement.is_bookmarked}
                  />
                </Suspense>
              ))}
            </div>
          </Tab>
          <Tab
            key="solved"
            title={
              <div className="flex items-center space-x-2">
                <IconSquareRoundedCheck size={20} stroke={1.5} />
                <span>Solved</span>
              </div>
            }
          >
            <div className="flex flex-col gap-4 items-center">
              {solvedQuizzes.map((quiz) => (
                <Suspense key={quiz.id} fallback={<PostCardSkeleton />}>
                  <QuizCard
                    id={quiz.id}
                    username={quiz.author.username}
                    title={quiz.quiz.title}
                    content={quiz.quiz.description}
                    timePassed={quiz.quiz.timestamp}
                    timesTaken={quiz.quiz.times_taken}
                    likeCount={quiz.engagement.like_count}
                    tags={quiz.quiz.tags}
                    initialIsLiked={quiz.engagement.is_liked}
                    initialIsBookmarked={quiz.engagement.is_bookmarked}
                  />
                </Suspense>
              ))}
            </div>
          </Tab>
          {profile?.username === Cookies.get("username") && (
            <Tab
              key="saved"
              title={
                <div className="flex items-center space-x-2">
                  <IconBookmark size={20} stroke={1.5} />
                  <span>Saved</span>
                </div>
              }
            >
              <div>
                <Tabs
                  aria-label="SavedOptions"
                  placement="start"
                  className="mr-1"
                >
                  <Tab
                    key="posts"
                    title={
                      <div className="flex items-start text-left space-x-2">
                        <IconBorderAll size={20} stroke={1.5} />
                        <span>Posts</span>
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-4 items-left w-[740px]">
                      {bookmarkedPosts.map((post) => (
                        <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                          <PostCard
                            id={post.id}
                            username={post.author.username}
                            title={post.post.title}
                            content={post.post.content}
                            timePassed={post.post.timestamp}
                            likeCount={post.engagement.likes}
                            tags={post.post.tags}
                            initialIsLiked={post.engagement.is_liked}
                            initialIsBookmarked={post.engagement.is_bookmarked}
                          />
                        </Suspense>
                      ))}
                    </div>
                  </Tab>
                  <Tab
                    key={"quizzes"}
                    title={
                      <div className="flex items-center space-x-2">
                        <IconClipboardText size={20} stroke={1.5} />
                        <span>Quizzes</span>
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-4 items-left w-[740px]">
                      {bookmarkedQuizzes.map((quiz) => (
                        <Suspense key={quiz.id} fallback={<PostCardSkeleton />}>
                          <QuizCard
                            id={quiz.id}
                            username={quiz.author.username}
                            title={quiz.quiz.title}
                            content={quiz.quiz.description}
                            timePassed={quiz.quiz.timestamp}
                            likeCount={quiz.engagement.like_count}
                            tags={quiz.quiz.tags}
                            initialIsLiked={quiz.engagement.is_liked}
                            initialIsBookmarked={quiz.engagement.is_bookmarked}
                            timesTaken={quiz.quiz.times_taken}
                          />
                        </Suspense>
                      ))}
                    </div>
                  </Tab>
                  <Tab
                    key={"words"}
                    title={
                      <div className="flex items-center space-x-2">
                        <IconAbc size={20} stroke={1.5} />
                        <span>Words</span>
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-4 items-left w-[740px]">
                      {bookmarkedWords.map((word, index) => (
                        <Suspense key={index} fallback={<PostCardSkeleton />}>
                          <Card className="w-48 px-2 py-2 text-center">
                            <ClickableText text={word} />
                          </Card>
                        </Suspense>
                      ))}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
}
