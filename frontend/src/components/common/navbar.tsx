import { Avatar } from "@nextui-org/avatar";
import { IconQuestionMark, IconMessages } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface TabsProps {
  active: boolean;
  onClick: () => void;
  icon: JSX.Element;
  text: string;
}

function Tab({ active, onClick, icon, text }: TabsProps) {
  return (
    <div
      className={`flex flex-row py-1 px-4 gap-1 items-center rounded-lg font-bold ${
        active ? "bg-blue-800 text-blue-200" : "text-blue-800"
      }`}
      onClick={onClick}
    >
      {icon}
      {text}
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const currentPage = window.location.pathname;
  return (
    <div className="p-5">
      <div className="flex flex-row w-full border-blue-700 bg-blue-200 border rounded-3xl px-5 py-3">
        <div className="flex-1 flex flex-row gap-6 items-center">
          <div
            className="text-blue-900 text-3xl font-semibold"
            onClick={() => navigate("/")}
          >
            bu<span className="text-blue-700">lingo</span>
          </div>
          <input
            type="text"
            className="w-72 h-8 rounded-lg px-4 bg-blue-100 text-blue-800 placeholder-gray-500"
            placeholder="Browse..."
          />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-row">
            <Tab
              active={currentPage === "/quizzes"}
              onClick={() => navigate("/quizzes")}
              icon={<IconQuestionMark size={20} strokeWidth={3} />}
              text="Quizzes"
            />
            <Tab
              active={currentPage === "/forum"}
              onClick={() => navigate("/forum")}
              icon={<IconMessages size={20} strokeWidth={3} />}
              text="Forum"
            />
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <Avatar onClick={() => navigate("/profile/anon")} />
        </div>
      </div>
    </div>
  );
}
