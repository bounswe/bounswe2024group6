import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  Card,
  Input,
  Button,
  Divider,
} from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeSwitcher } from "./theme-switcher";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const username = "oktay_ozel";

  const content = (
    <PopoverContent>
      <div className="px-2 pb-2">
        <div className="text-medium font-semibold px-5 py-2">{username}</div>
        <Divider className="w-full bg-zinc-300" />
        <div className="text-medium pt-2">Edit Profile</div>
        <div className="text-medium">Log Out</div>
      </div>
    </PopoverContent>
  );

  return (
    <div className="w-screen p-2 shadow-none">
      <Card className="flex flex-row w-full px-5 py-3 rounded-full shadow-md">
        <div className="flex-1 flex flex-row gap-6 items-center">
          <div
            className="text-blue-800 text-3xl font-semibold"
            onClick={() => navigate("/")}
          >
            bu<span className="text-blue-600">lingo</span>
          </div>
          <Input
            type="text"
            placeholder="Browse..."
            variant="flat"
            size="sm"
            className="w-64"
            radius="full"
          />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-row gap-2">
            <Button
              variant={pathname === "/quizzes" ? "solid" : "light"}
              onClick={() => navigate("/quizzes")}
              color={pathname === "/quizzes" ? "primary" : "default"}
              radius="full"
              size="md"
              className="h-8"
            >
              Quizzes
            </Button>
            <Button
              variant={pathname === "/forum" ? "solid" : "light"}
              onClick={() => navigate("/forum")}
              color={pathname === "/forum" ? "primary" : "default"}
              radius="full"
              size="md"
              className="h-8"
            >
              Forum
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center gap-2">
          <ThemeSwitcher />
          <Popover key="bottom-end" placement="bottom-end">
            <PopoverTrigger>
              <button onClick={() => navigate("/profile/oktay_ozel")}>
                <Avatar
                  isBordered
                  color="success"
                  src="https://nextui.org/avatars/avatar-1.png"
                />
              </button>
            </PopoverTrigger>
            {content}
          </Popover>
        </div>
      </Card>
    </div>
  );
}
