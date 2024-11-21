import { Suspense, useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";

import Navbar from "../components/common/navbar.tsx";
import ComposePostButton from "../components/post/compose-post-button.tsx";
import PostCard from "../components/post/post-card.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";
import { BASE_URL } from "../lib/baseURL";
import type { Post } from "../types.ts";

const Tags = [
  "@Vocabulary",
  "@Daily Words",
  "@Vocabulary Tips",
  "@Flashcards",
  "@Memorization",
];
const SortFilters = ["Most Recent", "Most Liked", "Most Commented"];

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/posts/`)
      .then((response) => {
        const posts = response.data.posts;
        setPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Navbar />
      <ComposePostButton />
      <div className="flex w-[740px] justify-between items-center mb-4 mt-4">
        <Select placeholder="Sort By" className="w-32 text-black">
          {SortFilters.map((sortFilter) => (
            <SelectItem key={sortFilter}>{sortFilter}</SelectItem>
          ))}
        </Select>
        <Select
          placeholder="Select Tags"
          selectionMode="multiple"
          className="w-32 text-black"
        >
          {Tags.map((tag) => (
            <SelectItem key={tag}>{tag}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Suspense key={post.id} fallback={<PostCardSkeleton />}>
            <PostCard
              id={post.id}
              username={post.author.username}
              title={post.post.title}
              content={post.post.content}
              timePassed={post.post.timestamp}
              likeCount={post.engagement.likes}
              tags={post.post.tags}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
