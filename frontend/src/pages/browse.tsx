import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Navbar from "../components/common/navbar.tsx";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../lib/baseURL";
import { Tabs, Tab } from "@nextui-org/react";
import {
  IconUser,
  IconClipboardText,
  IconBorderAll,
  IconMessage,
} from "@tabler/icons-react";
import { UserCard } from "../components/common/user-card.tsx";
import QuizCard from "../components/quiz/quiz-card.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";
import { formatTimeAgo } from "../components/common/utils.tsx";
import PostCard from "../components/post/post-card.tsx";

export default function Browse() {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/search/?q=${searchParams.get("q")}`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.users);
        setPosts(response.data.posts);
        setComments(response.data.comments);
        setQuizzes(response.data.quizzes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams, setUsers, setPosts, setComments, setQuizzes]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex w-full flex-col items-center mt-4">
        <Tabs aria-label="Options">
          <Tab
            key="quiz"
            title={
              <div className="flex items-center space-x-2">
                <IconClipboardText size={20} stroke={1.5} />
                <span>Quizzes</span>
              </div>
            }
          >
            {quizzes.length > 0 ? (
              <div className="flex flex-col gap-4 items-center">
                {quizzes.map((quiz) => (
                  <Suspense key={quiz.id} fallback={<PostCardSkeleton />}>
                    <QuizCard
                      id={quiz.id}
                      username={quiz.author}
                      title={quiz.title}
                      content={quiz.description}
                      timePassed={formatTimeAgo(quiz.created_at)}
                      likeCount={quiz.likeCount}
                      tags={quiz.tags}
                      initialIsLiked={quiz.isLiked}
                      initialIsBookmarked={quiz.isBookmarked}
                    />
                  </Suspense>
                ))}
              </div>
            ) : (
              <div className="flex flex-col p-5 items-center">
                No quizzes found.
              </div>
            )}
          </Tab>
          <Tab
            key="post"
            title={
              <div className="flex items-center space-x-2">
                <IconBorderAll size={20} stroke={1.5} />
                <span>Posts</span>
              </div>
            }
          >
            {posts.length > 0 ? (
              <div className="flex flex-col p-5 items-center">
                <div className="flex flex-col gap-4 items-center">
                  {posts.map((post) => {
                    return (
                      <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                        <PostCard
                          id={post.id}
                          username={post.author}
                          title={post.title}
                          content={post.description}
                          timePassed={formatTimeAgo(post.created_at)}
                          likeCount={post.like_count}
                          tags={post.tags}
                          initialIsLiked={post.is_liked}
                          initialIsBookmarked={post.is_bookmarked}
                        />
                      </Suspense>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-5 items-center">
                No posts found.
              </div>
            )}
          </Tab>
          <Tab
            key="comment"
            title={
              <div className="flex items-center space-x-2">
                <IconMessage size={20} stroke={1.5} />
                <span>Comments</span>
              </div>
            }
          >
            {comments.length > 0 ? (
              <div className="flex flex-col p-5 items-center">
                <div className="flex flex-col gap-4 items-center">
                  {comments.map((comment) => {
                    return (
                      <Suspense
                        key={comment.id}
                        fallback={<PostCardSkeleton />}
                      >
                        <PostCard
                          id={comment.id}
                          username={comment.author}
                          content={comment.body}
                          timePassed={formatTimeAgo(comment.created_at)}
                          likeCount={comment.like_count}
                          initialIsLiked={comment.isLiked}
                        />
                      </Suspense>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-5 items-center">
                No comments found.
              </div>
            )}
          </Tab>
          <Tab
            key="user"
            title={
              <div className="flex items-center space-x-2">
                <IconUser size={20} stroke={1.5} />
                <span>Users</span>
              </div>
            }
          >
            {users.length > 0 ? (
              <div className="flex flex-col p-5 items-center">
                <div className="flex flex-col gap-4 items-center">
                  {users.map((user) => (
                    <div className="border-1 rounded-xl">
                      <UserCard
                        key={user.username} // Ensure a unique key for each UserCard
                        username={user.username}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-5 items-center">
                No users found.
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
