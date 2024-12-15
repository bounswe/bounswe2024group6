import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import { BASE_URL } from "../../lib/baseURL.ts";
import axios from "axios";
import { AuthActions } from "../../components/auth/utils.tsx";
import ClickableText from "../common/clickable-text.tsx";

type Props = {
  quiz_progress_id: number;
  ques_count: number;
  cur_question: number;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  question: string;
  correct?: number;
  previous_answer?: number;
  isReview?: boolean;
};
enum Answer {
  None,
  A,
  B,
  C,
  D,
}

export default function QuestionCard({
  quiz_progress_id,
  ques_count,
  cur_question,
  answers,
  setAnswers,
  option_a,
  option_b,
  option_c,
  option_d,
  question,
  correct,
  previous_answer,
  isReview,
}: Props) {
  const { getToken } = AuthActions();
  const token = getToken("access");

  const handleClick = (answer: number) => async () => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      if (updatedAnswers[cur_question - 1] === answer) {
        updatedAnswers[cur_question - 1] = Answer.None;
        answer = 0;
      } else {
        updatedAnswers[cur_question - 1] = answer;
      }
      console.log("Updated answers:", updatedAnswers);
      return updatedAnswers;
    });

    // Send the answer to the backend
    try {
      console.log("Submitting answer:", answer);
      const response = await axios.post(
        `${BASE_URL}/quiz/question/solve/`,
        {
          quiz_progress_id: quiz_progress_id,
          question_number: cur_question,
          answer: answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Answer submitted:", response.data);
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit answer. Please try again.");
    }
  };

  return (
    <Card className="max-w-[600px]">
      <CardHeader className="flex flex-row justify-center w-full items-center gap-3">
        <p className="text-md text-center items-center border border-gray-300 rounded-lg p-1 px-3">
          {cur_question} / {ques_count}
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col justify-center shadow-lg rounded-lg w-[550px] h-[200px]">
        <div className="text-center text-5xl text-blue-900">
          {isReview ? <ClickableText text={question} /> : question}
        </div>
      </CardBody>

      <CardFooter className="w-[550px] h-[170px] py-6">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
          <Button
            color={
              correct == 1
                ? "success"
                : previous_answer == 1
                ? "danger"
                : "primary"
            }
            onClick={
              previous_answer !== undefined && correct !== undefined
                ? undefined
                : handleClick(1)
            }
            variant={
              answers[cur_question - 1] === Answer.A ||
              correct == 1 ||
              previous_answer == 1
                ? "solid"
                : "bordered"
            }
            className={`flex items-center justify-center text-xl h-12 mx-3 ${
              answers[cur_question - 1] === Answer.C ||
              correct == 1 ||
              previous_answer == 1
                ? "text-white"
                : ""
            }`}
          >
            {isReview ? <ClickableText text={option_a} /> : option_a}
          </Button>
          <Button
            color={
              correct == 2
                ? "success"
                : previous_answer == 2
                ? "danger"
                : "primary"
            }
            onClick={
              previous_answer !== undefined && correct !== undefined
                ? undefined
                : handleClick(2)
            }
            variant={
              answers[cur_question - 1] === Answer.B ||
              correct == 2 ||
              previous_answer == 2
                ? "solid"
                : "bordered"
            }
            className={`flex items-center justify-center text-xl h-12 mx-3 ${
              answers[cur_question - 1] === Answer.C ||
              correct == 2 ||
              previous_answer == 2
                ? "text-white"
                : ""
            }`}
          >
            {isReview ? <ClickableText text={option_b} /> : option_b}
          </Button>
          <Button
            color={
              correct == 3
                ? "success"
                : previous_answer == 3
                ? "danger"
                : "primary"
            }
            onClick={
              previous_answer !== undefined && correct !== undefined
                ? undefined
                : handleClick(3)
            }
            variant={
              answers[cur_question - 1] === Answer.C ||
              correct == 3 ||
              previous_answer == 3
                ? "solid"
                : "bordered"
            }
            className={`flex items-center justify-center text-xl h-12 mx-3 ${
              answers[cur_question - 1] === Answer.C ||
              correct == 3 ||
              previous_answer == 3
                ? "text-white"
                : ""
            }`}
          >
            {isReview ? <ClickableText text={option_c} /> : option_c}
          </Button>
          <Button
            color={
              correct == 4
                ? "success"
                : previous_answer == 4
                ? "danger"
                : "primary"
            }
            onClick={
              previous_answer !== undefined && correct !== undefined
                ? undefined
                : handleClick(4)
            }
            variant={
              answers[cur_question - 1] === Answer.D ||
              correct == 4 ||
              previous_answer == 4
                ? "solid"
                : "bordered"
            }
            className={`flex items-center justify-center text-xl h-12 mx-3 ${
              answers[cur_question - 1] === Answer.C ||
              correct == 4 ||
              previous_answer == 4
                ? "text-white"
                : ""
            }`}
          >
            {isReview ? <ClickableText text={option_d} /> : option_d}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
