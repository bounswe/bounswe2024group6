import { useState } from "react";
import Navbar from "../components/common/navbar.tsx";
import CreateQuizMetadata from "../components/quiz/create-quiz-metadata.tsx";
import CreateQuizQuestion from "../components/quiz/create-quiz-question.tsx";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@nextui-org/react";

export default function QuizCreation() {
  const [quizCount, setQuizCount] = useState(0);
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Navbar />
      <div className="flex flex-col gap-6 py-6">
        <CreateQuizMetadata />
        {Array(quizCount)
          .fill(0)
          .map((_, idx) => (
            <CreateQuizQuestion key={idx} />
          ))}
        <button
          onClick={() => setQuizCount((prev) => prev + 1)}
          className="bg-default-100 hover:bg-default-200 p-[60px] flex justify-center items-center rounded-2xl"
        >
          <IconPlus className="text-default-500" size={36} />
        </button>
        <Button size="lg" color="primary">
          Create
        </Button>
      </div>
    </div>
  );
}
