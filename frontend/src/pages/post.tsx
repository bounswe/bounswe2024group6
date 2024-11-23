import Navbar from "../components/common/navbar.tsx";
import { Suspense, useEffect, useState } from "react";
import PostCard from "../components/post/post-card.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";
import { Card } from "@nextui-org/react";
import { IconChevronDown } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../lib/baseURL";
import type { Comment, Post, PostResponse } from "../types.ts";
import { AuthActions } from "../components/auth/utils.tsx";
import { convertPostResponseToPost } from "../components/common/utils.tsx";

export default function Post() {
  const { postID } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { getToken } = AuthActions();
  const token = getToken("access");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/feed/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const postData: PostResponse = response.data.feed.filter(
          (post: PostResponse) => post.id === parseInt(postID!)
        )[0];
        setPost(convertPostResponseToPost(postData));
        setComments(convertPostResponseToPost(postData).comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postID]);
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Navbar />
      <div className="flex flex-col gap-6">
        {post && (
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
        )}
        <div className="flex justify-center">
          <Card className="py-1 pl-4 pr-3 rounded-full">
            <div className="flex gap-1 items-center text-default-600">
              <div>Comments</div>
              <IconChevronDown size={20} />
            </div>
          </Card>
        </div>
        {comments.map((comment) => (
          <Suspense key={comment.id} fallback={<PostCardSkeleton />}>
            <PostCard
              id={comment.id}
              username={comment.author.username}
              content={comment.comment}
              timePassed={comment.timestamp}
              likeCount={comment.likes}
              initialIsLiked={comment.is_liked}
              initialIsBookmarked={comment.is_bookmarked}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

