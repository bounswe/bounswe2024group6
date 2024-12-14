import { Button } from "@nextui-org/react";
import Navbar from "../components/common/navbar.tsx";
import QuestionCard from "../components/quiz/question-card.tsx";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarLayout from "../components/quiz/navigation.tsx";
import { usePageTitle } from "../components/common/usePageTitle.ts";
import { BASE_URL } from "../lib/baseURL.ts";
import axios from "axios";
import { AuthActions } from "../components/auth/utils.tsx";

enum Answer {
  None,
  A,
  B,
  C,
  D,
}

export default function QuizReview() {
  const { quizResultID } = useParams<{ quizResultID: any }>();
  const [quizData, setQuizData] = useState<any>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [answers, setAnswers] = useState(Array(10).fill(Answer.None));
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [previousAnswers, setPreviousAnswers] = useState<Boolean[]>();
  const { getToken } = AuthActions();
  const token = getToken("access");
  usePageTitle("Quiz");

  useEffect(() => {
    if (quizResultID) {
      setIsLoading(true);
      axios
        .get(
          `${BASE_URL}/quiz/review/${quizResultID}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setQuizData(response.data);
          const initialAnswers = response.data.questions.map(
            (question: any) => Answer.None
          );
          setAnswers(initialAnswers);
          const answersArray = Array.from({ length: response.data.question_count }, (_, index) => {
            const question = response.data.questions[index];
            return question.correct_choice === question.previous_answer;
          });
          setPreviousAnswers(answersArray);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [quizResultID]);

  const currentQuestion = quizData?.questions[currentPage - 1];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />

      <SidebarLayout
        id={quizResultID}
        quiz_progress_id={quizData?.quiz_progress_id}
        cur_question={currentPage}
        setCurrentPage={setCurrentPage}
        answers={answers}
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isReview={true}
        previous_answers={previousAnswers}
      >
        <div className="flex flex-col items-center overflow-hidden">
          <h1 className="font-semibold text-4xl mt-3 mb-1 text-blue-900">
            {quizData?.quiz_title}
          </h1>
          <div className="flex flex-col items-center py-4">
            <QuestionCard
              quiz_progress_id={quizData?.quiz_progress_id}
              ques_count={quizData?.question_count}
              answers={answers}
              setAnswers={setAnswers}
              cur_question={currentPage}
              option_a={currentQuestion?.choices[0]}
              option_b={currentQuestion?.choices[1]}
              option_c={currentQuestion?.choices[2]}
              option_d={currentQuestion?.choices[3]}
              question={currentQuestion?.question}
              correct={currentQuestion?.correct_choice}
              previous_answer={currentQuestion?.previous_answer}
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
              {...(currentPage === quizData?.question_count && { disabled: true })}
              onPress={() =>
                setCurrentPage((prev) => (prev < quizData?.question_count ? prev + 1 : prev))
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

