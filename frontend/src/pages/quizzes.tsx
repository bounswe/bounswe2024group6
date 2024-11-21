import Navbar from "../components/common/navbar.tsx";
import CreateQuizButton from "../components/post/create-quiz-button.tsx";
import QuizCard from "../components/quiz/quiz-card.tsx";

export default function Quiz() {
  const quiz = {
    id: 1,
    author: "elifndeniz",
    title: "Geographical Landforms",
    content: "Different types of landforms.",
    timestamp: "1h ago",
    likes: 10,
    tags: ["geography", "A2"],
  };

  return (
    <div className="h-screen w-screen items-center gap-4 flex flex-col">
      <Navbar />
      <CreateQuizButton />
      <QuizCard
        key={quiz.id}
        id={quiz.id}
        username={quiz.author}
        title={quiz.title}
        content={quiz.content}
        timePassed={quiz.timestamp}
        likeCount={quiz.likes}
        tags={quiz.tags}
      />
      <QuizCard
        key={quiz.id}
        id={quiz.id}
        username={quiz.author}
        title={quiz.title}
        content={quiz.content}
        timePassed={quiz.timestamp}
        likeCount={1000}
        tags={quiz.tags} // if exists
      />
    </div>
  );
}
