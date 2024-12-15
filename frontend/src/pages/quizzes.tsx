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
              picture={quiz.quiz.picture}
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