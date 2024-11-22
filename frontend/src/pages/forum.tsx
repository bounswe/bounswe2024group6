import { Suspense, useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";

import Navbar from "../components/common/navbar.tsx";
import ComposePostButton from "../components/post/compose-post-button.tsx";
import PostCard from "../components/post/post-card.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";
import { BASE_URL } from "../lib/baseURL";
import type { Post, PostResponse } from "../types.ts";
import { AuthActions } from "../components/auth/utils.tsx";
import { convertPostResponseToPost } from "../components/common/utils.tsx";

const Tags = [
  "#Vocabulary",
  "#Grammar",
  "#Vocabulary Tips",
  "#Idioms & Expressions",
  "#Cultural Insights",
  "#Challenges",
  "#Learning Material",
  "#Common Mistakes",
  "#General",
  "#Fun",
];
const DifficultyTags = ["A1", "A2", "B1", "B2", "C1", "C2"];
const SortFilters = ["Most Recent", "Most Liked", "Most Commented"];

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { getToken } = AuthActions();
  const token = getToken("access"); 

  const [sortFilter, setSortFilter] = useState<string>("Most Recent");

  const handleSelectionChange = (e) => {
    setSortFilter(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/feed/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const postData: PostResponse[] = response.data.feed;
        setPosts(postData.map(convertPostResponseToPost));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortFilter) {
      case "Most Recent":
        return new Date(b.post.created_at).getTime() - new Date(a.post.created_at).getTime();
      case "Most Liked":
        return b.engagement.likes - a.engagement.likes;
      // case "Most Commented":
      //   return b.engagement.comments - a.engagement.comments; 
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Navbar />
      <ComposePostButton />
      <div className="flex w-[740px] justify-between items-center  mt-4">
        <Select onChange={handleSelectionChange} placeholder="Sort By" defaultSelectedKeys={["Most Recent"]} className="w-32 text-black">
          {SortFilters.map((sortFilter) => (
            <SelectItem key={sortFilter}>{sortFilter}</SelectItem>
          ))}
        </Select>
        <div className="flex flex-row gap-2">
          <Select
            placeholder="Difficulty"
            selectionMode="multiple"
            className="w-32 text-black"
          >
            {DifficultyTags.map((tag) => (
              <SelectItem key={tag}>{tag}</SelectItem>
            ))}
          </Select>
          <Select
            placeholder="Categories"
            selectionMode="multiple"
            className="w-32 text-black"
          >
            {Tags.map((tag) => (
              <SelectItem key={tag}>{tag}</SelectItem>
            ))}
          </Select>
        </div>

      </div>

      <div className="flex flex-col gap-6 m-6">
        {sortedPosts.map((post) => (

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
