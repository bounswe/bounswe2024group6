import { Button } from "@nextui-org/react";
import Navbar from "../components/common/navbar.tsx";
import QuestionCard from "../components/quiz/question-card.tsx";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import SidebarLayout from "../components/quiz/navigation.tsx";
import { usePageTitle } from "../components/common/usePageTitle.ts";
import { BASE_URL } from "../lib/baseURL.ts";
import axios from "axios";
import { AuthActions } from "../components/auth/utils.tsx";
import QuizDetailsCardSkeleton from "../components/quiz/quiz-details-skeleton.tsx";
import QuizQuestionSkeleton from "../components/quiz/quiz-question-skeleton.tsx";

enum Answer {
  None,
  A,
  B,
  C,
  D,
}

export default function Quiz() {
  const { quizID } = useParams<{ quizID: any }>();

  const location = useLocation();
  const { isNotResuming } = location.state || {};

  const [quizData, setQuizData] = useState<any>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [answers, setAnswers] = useState(Array(10).fill(Answer.None));
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = AuthActions();
  const token = getToken("access");
  usePageTitle("Quiz");

  useEffect(() => {
    axios
      .post(
        `${BASE_URL}/quiz/start/`,
        {
          quiz_id: quizID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setQuizData(response.data); // Store response data
        const initialAnswers = response.data.questions.map(
          (question: any) => question.previous_answer || Answer.None
        );
        setAnswers(initialAnswers);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [quizID]);

  const currentQuestion = quizData?.questions[currentPage - 1];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <SidebarLayout
        id={quizID}
        quiz_progress_id={quizData?.quiz_progress_id}
        cur_question={currentPage}
        setCurrentPage={setCurrentPage}
        answers={answers}
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isReview={false}
      >
        <div className="flex flex-col items-center overflow-hidden">
          <div className="flex flex-row items-start gap-8 w-full justify-center">
            {currentQuestion?.question_image && (
              <div className="w-[400px] h-[400px] flex mt-24 items-center justify-center rounded-lg overflow-hidden bg-gray-50 shadow-md">
                <img
                  src={currentQuestion.question_image}
                  alt="Question"
                  className="max-w-full max-h-full object-contain p-2"
                />
              </div>
            )}
            {isLoading ? (
              <QuizQuestionSkeleton />
            ) : (
              <div className="flex flex-col items-center py-4">
                <h1 className="font-semibold text-4xl mt-3 mb-4 text-blue-900">
                  {quizData?.quiz_title}
                </h1>
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
                />
                <div className="flex justify-center items-center gap-24 mt-4 my-1">
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
                    {...(currentPage === quizData?.question_count && {
                      disabled: true,
                    })}
                    onPress={() =>
                      setCurrentPage((prev) =>
                        prev < quizData?.question_count ? prev + 1 : prev
                      )
                    }
                    className="w-32"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
}

