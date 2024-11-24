import { Pagination, Button } from "@nextui-org/react";
import Navbar from "../components/common/navbar.tsx";
import QuestionCard from "../components/quiz/question-card.tsx";
import React, { useState } from "react";
import SidebarLayout from "../components/quiz/navigation.tsx";
import { usePageTitle } from '../components/common/usePageTitle.ts';

enum Answer {
  None,
  A,
  B,
  C,
  D,
}

export default function Quizzes() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [answers, setAnswers] = useState(Array(10).fill(Answer.None));
  const [isOpen, setIsOpen] = useState(false);

  usePageTitle('Quiz');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />

      <SidebarLayout
        id={1}
        cur_question={currentPage}
        setCurrentPage={setCurrentPage}
        answers={answers}
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
      >
        <div className="flex flex-col items-center overflow-hidden">
          <h1 className="font-semibold text-4xl mt-3 mb-1 text-blue-900">
            Daily Words
          </h1>
          <div className="flex flex-col items-center py-4">
            <QuestionCard
              ques_count={10}
              answers={answers}
              setAnswers={setAnswers}
              cur_question={currentPage}
            />
          </div>
          <div className="flex justify-center items-center gap-24 my-1">
            <Button
              size="lg"
              variant="flat"
              color="primary"
              {...(currentPage === 1 && { disabled: true })}
              onPress={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
              className="w-32"
            >
              Previous
            </Button>
            <Button
              size="lg"
              variant="flat"
              color="primary"
              {...(currentPage === 10 && { disabled: true })}
              onPress={() =>
                setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
              }
              className="w-32"
            >
              Next
            </Button>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
}

