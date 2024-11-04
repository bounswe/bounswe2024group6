import { Pagination, Button } from "@nextui-org/react";
import Navbar from "../components/common/navbar.tsx";
import QuestionCard from "../components/quiz/question-card.tsx";
import React from "react";

export default function Quizzes() {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center overflow-hidden">
        <h1 className="font-semibold text-4xl mt-3 mb-1 text-blue-900">
          Daily Words
        </h1>
        <div className="flex flex-col items-center py-4">
          <QuestionCard ques_count={10} cur_question={currentPage} />
        </div>
        <div className="flex justify-center items-center gap-6 my-1">
          <Button
            size="lg"
            variant="flat"
            color="primary"
            {...(currentPage === 1 && { disabled: true })}
            onPress={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
          >
            Previous
          </Button>
          <Pagination
            total={10}
            color="primary"
            page={currentPage}
            onChange={setCurrentPage}
          />
          <Button
            size="lg"
            variant="flat"
            color="primary"
            {...(currentPage === 10 && { disabled: true })}
            onPress={() =>
              setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

