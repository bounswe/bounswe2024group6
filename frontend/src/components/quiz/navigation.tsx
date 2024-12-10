import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
enum Answer {
  None,
  A,
  B,
  C,
  D,
}
import { BASE_URL } from "../../lib/baseURL.ts";
import axios from "axios";
import { AuthActions } from "../../components/auth/utils.tsx";

const SidebarLayout = ({
  id,
  quiz_progress_id,
  cur_question,
  setCurrentPage,
  answers,
  isOpen,
  toggleSidebar,
  children,
}) => {
  const sidebarClasses = `fixed top-32 right-0 w-[15vw] h-96 transition-transform duration-500 ease-in-out transform ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`;

  const { getToken } = AuthActions();
  const token = getToken("access");

  const buttonClasses = `fixed top-40 transition-transform duration-500 ease-in-out transform ${
    isOpen ? "translate-x-[-15vw] " : "translate-x-0"
  } right-4 z-20 flex items-center  justify-center w-12 h-12 bg-white rounded-full hover:scale-110 focus:scale-100 shadow-xl`;

  const contentClasses = `ml-0 transition-all duration-500 ease-in-out ${
    isOpen ? "mr-[15vw]" : ""
  }`;
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Sidebar */}
      <div className={sidebarClasses}>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3 text-center">
            <h1 className="text-center w-full text-lg text-blue-900 font-semibold">
              Quiz Navigation
            </h1>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-4 gap-4">
              {Array.from(answers).map((_, index) => (
                <Button
                  isIconOnly
                  key={index}
                  color={answers[index] === Answer.None ? "default" : "primary"}
                  variant={cur_question === index + 1 ? "solid" : "flat"}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex items-center justify-center gap-2">
            <Button onClick={() => navigate(`/quiz/${id}/details`)} color="primary" variant="faded" className="items-center">
              Quit Quiz
            </Button>
            <Button color="primary" onClick={
              async () => {
                try {
                  const response = await axios.post(
                    `${BASE_URL}/quiz/submit/`,
                    {
                      quiz_progress_id: quiz_progress_id, 
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  console.log("Quiz Finished:", response.data);
                  navigate(`/quiz/${id}/end`);
                } catch (error) {
                  console.error("Error finishing quiz:", error);
                }
              }}
              variant="solid" className="items-center">
              Finish Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className={buttonClasses}
      >
        <svg
          className={`w-6 h-6 text-blue-500 transition-transform duration-500 ease-in-out transform ${
            isOpen ? "rotate-180 " : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
        >
          <path
            d="M15 19l-7-7 7-7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Main Content */}
      <div className={contentClasses}>{children}</div>
    </div>
  );
};

export default SidebarLayout;
