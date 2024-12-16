import { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
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

const DifficultyTags = ["#A1", "#A2", "#B1", "#B2", "#C1", "#C2"];
const SortFilters = ["Most Recent", "Most Liked"];

export default function Forum() {
  usePageTitle("Forum");
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedDifficultyTags, setSelectedDifficultyTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState<{ key: string; label: string }[]>([]);
  const { getToken } = AuthActions();
  const token = getToken("access");
  const [sortFilter, setSortFilter] = useState<string>("Most Recent");
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortFilter(e.target.value);
  };

  const handleDifficultyTagClick = (tag: string) => {
    if (selectedDifficultyTags.includes(tag)) {
      setSelectedDifficultyTags(
        selectedDifficultyTags.filter((t) => t !== tag)
      );
    } else {
      setSelectedDifficultyTags([...selectedDifficultyTags, tag]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    axios
      .get(`${BASE_URL}/feed/`, { headers })
      .then((response) => {
        console.log(response.data);
        const postData: PostResponse[] = response.data.feed;
        setPosts(postData.map(convertPostResponseToPost));
        setTags(
          response.data.feed
            .map((post) => post.tags)
            .flat()
            .filter((tag) => !DifficultyTags.includes(tag))
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((tag) => ({ key: tag, label: tag }))
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (
      selectedDifficultyTags.length > 0 &&
      !post.post.tags.some((tag) => selectedDifficultyTags.includes(tag))
    ) {
      return false;
    }

    // Show all posts if no tags are selected
    if (!selectedTags || selectedTags.length === 0 || !selectedTags[0]) {
      return true;
    }

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
          size="lg"
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
            size="lg"
            placeholder="Difficulty"
            selectionMode="multiple"
            className="w-40 text-black"
          >
            {DifficultyTags.map((tag) => (
              <SelectItem
                onPress={() => handleDifficultyTagClick(tag)}
                key={tag}
              >
                {tag}
              </SelectItem>
            ))}
          </Select>
          <Autocomplete
            size="sm"
            radius="lg"
            className="max-w-[200px]"
            defaultItems={tags}
            label="Tags"
            placeholder="Search a tag"
            onSelectionChange={(e) => {
              setSelectedTags([e]);
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
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
