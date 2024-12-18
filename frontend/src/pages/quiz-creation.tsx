import { useState } from "react";
import Navbar from "../components/common/navbar.tsx";
import CreateQuizMetadata from "../components/quiz/create-quiz-metadata.tsx";
import CreateQuizQuestion from "../components/quiz/create-quiz-question.tsx";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@nextui-org/react";
import { Question, QuizCreationModel, QuizHeader } from "../types.ts";
import axios from "axios";
import { AuthActions } from "../components/auth/utils.tsx";
import { BASE_URL } from "../lib/baseURL.ts";
import { useNavigate } from "react-router-dom";

export default function QuizCreation() {
  const [quizCount, setQuizCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [quizHeader, setQuizHeader] = useState<QuizHeader>({
    title: "",
    description: "",
    tags: [
      {
        name: "",
      },
    ],
    level: "",
  });
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const { getToken } = AuthActions();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsLoading(true);
    const token = getToken("access");
    const formData = new FormData();

    // Add quiz details
    formData.append("title", quizHeader.title);
    formData.append("description", quizHeader.description);
    formData.append("level", quizHeader.level);
    formData.append("tags", JSON.stringify(quizHeader.tags));

    // Add title image if exists
    if (quizHeader.title_image) {
      formData.append("title_image", quizHeader.title_image);
    }

    // Handle questions with images
    
    const questionsWithImages = quizQuestions.map((question, index) => {
      if (question.image) {
        formData.append(`question_image_${index + 1}`, question.image);
      }
      return {
        ...question,
      };
    });

    formData.append('questions', JSON.stringify(questionsWithImages));
    // Log FormData contents for debugging
    console.log('FormData content:');
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    
    axios
      .post(`${BASE_URL}/quiz/create/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("quiz created", response);
        navigate("/quizzes");
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Navbar />
      <div className="flex flex-col gap-6 py-6">
        <CreateQuizMetadata setQuizHeader={setQuizHeader} />
        {Array(quizCount)
          .fill(0)
          .map((_, idx) => (
            <CreateQuizQuestion
              setQuizQuestions={setQuizQuestions}
              key={idx}
              idx={idx}
            />
          ))}
        <button
          onClick={() => setQuizCount((prev) => prev + 1)}
          className="bg-default-100 hover:bg-default-200 p-[60px] flex justify-center items-center rounded-2xl"
        >
          <IconPlus className="text-default-500" size={36} />
        </button>
        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          size="lg"
          color="primary"
        >
          Create
        </Button>
      </div>
    </div>
  );
}

