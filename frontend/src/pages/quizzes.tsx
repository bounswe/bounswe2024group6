import Navbar from "../components/common/navbar.tsx";
import CreateQuizButton from "../components/post/create-quiz-button.tsx";
import QuizCard from "../components/quiz/quiz-card.tsx";
import { usePageTitle } from "../components/common/usePageTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../lib/baseURL";
import { AuthActions } from "../components/auth/utils.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";
import { Quiz, QuizResponse } from "../types.ts";
import { convertQuizResponseToQuiz } from "../components/common/utils.tsx";
import { Select, SelectItem } from "@nextui-org/react";

const Tags = [
  "#Activities",
  "#Basics",
  "#Education",
  "#Food",
  "#Health",
  "#Other",
  "#Shopping",
  "#Family",
  "#Sports",
  "#Travel",
  "#Work",
];
const DifficultyTags = ["A1", "A2", "B1", "B2", "C1", "C2"];
const SortFilters = ["Most Recent", "Most Liked", "Most Taken"];


export default function Quizzes() {
  usePageTitle("Quizzes");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
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
      .get(`${BASE_URL}/feed/quiz/`, {
        headers
      })
      .then((response) => {
        console.log(response.data);
        const quizData: QuizResponse[] = response.data;
        setQuizzes(quizData.map(convertQuizResponseToQuiz));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    // Show all posts if no tags are selected
    if (selectedTags.length === 0) return true;

    // Check if the post has at least one tag from the selectedTags
    return quiz.quiz.tags.some((tag) => selectedTags.includes(tag));
  });

  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    switch (sortFilter) {
      case "Most Recent":
        return (
          new Date(b.quiz.created_at).getTime() -
          new Date(a.quiz.created_at).getTime()
        );
      case "Most Liked":
        return b.engagement.like_count - a.engagement.like_count;
      case "Most Taken":
        return b.quiz.times_taken - a.quiz.times_taken;
      default:
        return 0;
    }
  });

  const quiz2 = {
    id: 1,
    author: "elifndeniz",
    title: "Fruits",
    content: "Which one is a fruit?",
    picture:
      "data:image/jpeg;base64,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",
    timestamp: "1h ago",
    likes: 10,
    tags: ["#food", "#A2"],
  };

  return (
    <div className="items-center gap-4 flex flex-col overflow-hidden pb-4">
      <Navbar />
      <CreateQuizButton />
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
                {"#"+tag}
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
      {isLoading ?
        Array(2)
          .fill(0)
          .map((_, index) => <PostCardSkeleton key={index} />)
        :
        (
          sortedQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              username={quiz.author.username}
              title={quiz.quiz.title}
              content={quiz.quiz.description}
              picture={quiz2.picture}
              timePassed={quiz.quiz.timestamp}
              likeCount={quiz.engagement.like_count}
              tags={quiz.quiz.tags}
              initialIsLiked={quiz.engagement.is_liked}
              initialIsBookmarked={quiz.engagement.is_bookmarked}
              timesTaken={quiz.quiz.times_taken}
            />
          ))
        )}
    </div>
  );
}