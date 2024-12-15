import Navbar from "../components/common/navbar.tsx";
import { Suspense, useEffect, useState } from "react";
import PostCard from "../components/post/post-card.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";
import { Card, Textarea, Button } from "@nextui-org/react";
import { IconChevronDown } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../lib/baseURL";
import type { Comment, CommentResponse, Post, PostResponse } from "../types.ts";
import { AuthActions } from "../components/auth/utils.tsx";
import {
  convertCommentResponseToPost,
  convertPostResponseToPost,
  formatTimeAgo,
} from "../components/common/utils.tsx";
import Cookies from "js-cookie";
import CommentSkeleton from "../components/post/comment-skeleton.tsx";

export default function Post() {
  const { postID } = useParams();
  const { commentID } = useParams();
  console.log(postID, commentID);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = AuthActions();
  const token = getToken("access");
  const username = Cookies.get("username");

  useEffect(() => {
    if (postID) {
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };
      axios
        .post(
          `${BASE_URL}/post/`,
          {
            post_id: postID,
          },
          {
            headers
          }
        )
        .then((response) => {
          console.log(response.data);
          const postData: PostResponse = response.data.post;
          setPost(convertPostResponseToPost(postData));
          setComments(
            convertPostResponseToPost(postData).comments.filter(comment => comment.parent === null)
          );
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [postID]);

  useEffect(() => {
    if (commentID) {
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };
      axios
        .post(
          `${BASE_URL}/comment/`,
          {
            comment_id: commentID,
          },
          {
            headers
          }
        )
        .then((response) => {
          console.log("comment:",response.data);
          const postData: CommentResponse = response.data.comment;
          setPost(convertCommentResponseToPost(postData));
          setComments(convertCommentResponseToPost(postData).comments);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [commentID]);

  const handleSubmit = () => {
    if(postID) {
      const { getToken } = AuthActions();
      const token = getToken("access");
  
      axios
        .post(
          `${BASE_URL}/post/comment/add/`,
          {
            post_id: postID,
            body: comment,
            parent_id: postID,
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
          setComment("");
          setComments([
            {
              id: response.data.id,
              content: response.data.body,
              author: username || "Me",
              created_at: response.data.created_at,
              like_count: 0,
              is_liked: false,
              is_bookmarked: false,
            },
            ...comments,
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if(commentID) {
      axios
        .post(
          `${BASE_URL}/post/comment/reply/`,
          {
            body: comment,
            parent_id: commentID,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("reply",response.data);
          setComment("");
          setComments([
            {
              id: response.data.id,
              content: response.data.body,
              author: username || "Me",
              created_at: response.data.created_at,
              like_count: 0,
              is_liked: false,
              is_bookmarked: false,
            },
            ...comments,
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="flex flex-col items-center overflow-hidden mb-4">
      <Navbar />
      <div className="flex flex-col gap-6 mt-4">
        {isLoading ? (
          <PostCardSkeleton />
        ) : (
          post && (
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
          )
        )}
        <div className="flex justify-center">
          <Card className="py-1 pl-4 pr-3 rounded-full">
            <div className="flex gap-1 items-center text-default-600">
              <div>Comments</div>
              <IconChevronDown size={20} />
            </div>
          </Card>
        </div>
        <Card className="w-[740px] p-4">
          <div className="flex flex-col gap-2">
            <Textarea
              placeholder="Write a comment..."
              value={comment}
              onValueChange={setComment}
            />
            <div className="flex justify-end">
              <Button
                variant="solid"
                color="primary"
                isDisabled={!comment}
                onClick={handleSubmit}
              >
                Comment
              </Button>
            </div>
          </div>
        </Card>
        {isLoading
          ? Array(1)
            .fill(0)
            .map((_, index) => <CommentSkeleton key={index} />)
          : comments.map((comment) => (
            <Suspense key={comment.id} fallback={<CommentSkeleton />}>
              <PostCard
                id={comment.id}
                username={comment.author}
                content={comment.body || comment.content}
                timePassed={formatTimeAgo(comment.created_at)}
                likeCount={comment.like_count}
                initialIsLiked={comment.is_liked}
                initialIsBookmarked={comment.is_bookmarked}
              />
            </Suspense>
          ))}
      </div>
    </div>
  );
}

