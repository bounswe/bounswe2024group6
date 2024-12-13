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
import { div } from "framer-motion/client";

export default function Profile() {
  usePageTitle("Profile");
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const { getToken } = AuthActions();
  const token = getToken("access");
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [solvedQuizzes, setSolvedQuizzes] = useState<Quiz[]>([]);
  const [createdQuizzes, setCreatedQuizzes] = useState<Quiz[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [followings, setFollowings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [type, setType] = useState("following");

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
      console.log("Fetching bookmarked posts");
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
          console.log(response);
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
    axios
      .get(
        `${BASE_URL}/quiz/solved/${username}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
      .get(
        `${BASE_URL}/quiz/created/${username}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
      .get(
        `${BASE_URL}/profile/followers/${username}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
      .get(
        `${BASE_URL}/profile/following/${username}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("following", response.data);
        setFollowings(response.data);
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
                } gap-6`}
            >
              {profile.username !== Cookies.get("username") && (
                <Button
                  variant={isFollowing ? "faded" : "solid"}
                  color="primary"
                  onClick={toggleFollow}
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
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className="max-w-[360px] flex flex-col items-center"
                backdrop="blur"
              >
                <ModalContent className="pb-6 gap-3">
                  <ModalHeader className="text-lg font-semibold">
                    {type === "follower" ? "Followers" : "Following"}
                  </ModalHeader>
                  {(type === "follower" ? followers : followings).length > 0 ? (
                    (type === "follower" ? followers : followings).map((user) => (
                      <div className="border-1 rounded-xl">
                        <UserCard
                          key={user.username} // Ensure a unique key for each UserCard
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
              <div className="flex flex-col gap-4 items-center">
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
          )}
        </Tabs>
      </div>
    </div>
  );
}

