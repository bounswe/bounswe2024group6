import { Suspense, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";

import Navbar from "../components/common/navbar.tsx";
import ComposePostButton from "../components/post/compose-post-button.tsx";
import PostCard from "../components/post/post-card.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";
import { BASE_URL } from "../lib/baseURL";

const Tags = [
  "@Vocabulary",
  "@Daily Words",
  "@Vocabulary Tips",
  "@Flashcards",
  "@Memorization",
];
const SortFilters = ["Most Recent", "Most Liked", "Most Commented"];

export default function Forum() {
  useEffect(() => {
    axios
      .get(`${BASE_URL}/`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Navbar />
      <ComposePostButton />
      <div className="absolute top-[7.5rem] w-32 right-[25rem]">
        <Select
          placeholder="Select Tags"
          selectionMode="multiple"
          className="max-w-xs text-black"
        >
          {Tags.map((tag) => (
            <SelectItem key={tag}>{tag}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="absolute top-[7.5rem] w-32 left-[25rem]">
        <Select placeholder="Sort By" className="max-w-xs text-black">
          {SortFilters.map((sortFilter) => (
            <SelectItem key={sortFilter}>{sortFilter}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-6">
        {mockData.map((post) => (
          <Suspense key={post.id} fallback={<PostCardSkeleton />}>
            <PostCard
              id={post.id}
              username={post.username}
              title={post.title}
              content={post.content}
              timePassed={post.timePassed}
              likeCount={post.likes}
              tags={post.tags}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

const mockData = [
  {
    id: 1,
    username: "@alitariksahin",
    title: "Mastering Vocabulary: 10 Words to Learn Today",
    content:
      "Learning new words every day can significantly improve your vocabulary. Today's words include 'serendipity', 'eloquent', and 'ubiquitous'. Practice using them in sentences to reinforce your learning!",
    timePassed: "1 hour ago",
    likes: 150,
    tags: ["@Vocabulary", "@Daily Words"],
  },
  {
    id: 2,
    username: "@elifnd",
    title: "Top 5 Tips for Learning New Words in Any Language",
    content:
      "Learning vocabulary in a new language can be challenging, but using techniques like spaced repetition, mnemonic devices, and context-based learning can make the process easier. Start by setting small daily goals!",
    timePassed: "3 days ago",
    likes: 200,
    tags: ["@Vocabulary Tips"],
  },
  {
    id: 3,
    username: "@yunusemreozdemir",
    title: "The Power of Flashcards in Learning New Words",
    content:
      "Flashcards are an effective tool to memorize new vocabulary. By consistently reviewing and testing yourself, you can retain words for the long term. Try using apps like Anki or Quizlet for better results!",
    timePassed: "5 minutes ago",
    likes: 75,
    tags: ["@Flashcards", "@Memorization"],
  },
];
