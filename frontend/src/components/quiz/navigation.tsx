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

const SidebarLayout = ({
  id,
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
            <Button color="primary" variant="faded" className="items-center">
              Quit Quiz
            </Button>
            <Button color="primary" onClick={() => navigate(`/quiz/${id}/end`)} variant="solid" className="items-center">
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
