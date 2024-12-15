import { useEffect, useState } from "react";
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
import { usePageTitle } from "../components/common/usePageTitle.ts";

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
const DifficultyTags = ["#A1", "#A2", "#B1", "#B2", "#C1", "#C2"];
const SortFilters = ["Most Recent", "Most Liked", "Most Commented"];

export default function Forum() {
  usePageTitle("Forum");
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = AuthActions();
  const token = getToken("access");
  const [sortFilter, setSortFilter] = useState<string>("Most Recent");
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortFilter(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    axios
      .get(`${BASE_URL}/feed/`, { headers
      })
      .then((response) => {
        console.log(response.data);
        const postData: PostResponse[] = response.data.feed;
        setPosts(postData.map(convertPostResponseToPost));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) => {
    // Show all posts if no tags are selected
    if (selectedTags.length === 0) return true;

    // Check if the post has at least one tag from the selectedTags
    return post.post.tags.some((tag) => selectedTags.includes(tag));
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortFilter) {
      case "Most Recent":
        return (
          new Date(b.post.created_at).getTime() -
          new Date(a.post.created_at).getTime()
        );
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
        <Select
          onChange={handleSelectionChange}
          placeholder="Sort By"
          defaultSelectedKeys={["Most Recent"]}
          className="w-44 text-black"
        >
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
              <SelectItem onPress={() => handleTagClick(tag)} key={tag}>
                {tag}
              </SelectItem>
            ))}
          </Select>
          <Select
            placeholder="Categories"
            selectionMode="multiple"
            className="w-32 text-black"
          >
            {Tags.map((tag) => (
              <SelectItem onPress={() => handleTagClick(tag)} key={tag}>
                {tag}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-6 m-6">
        {isLoading
          ? // Show multiple skeletons while loading
            Array(2)
              .fill(0)
              .map((_, index) => <PostCardSkeleton key={index} />)
          : // Show actual posts when loaded
            sortedPosts.map((post) => (
              <PostCard
                key={post.id}
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
            ))}
      </div>
    </div>
  );
}

