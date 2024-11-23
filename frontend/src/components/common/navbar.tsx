import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  Card,
  Input,
  Button,
  Divider,
  Badge,
  Link,
} from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconBell } from "@tabler/icons-react";
import { ThemeSwitcher } from "./theme-switcher";
import { AuthActions } from "../auth/utils";
import Cookies from "js-cookie";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const username = Cookies.get("username");

  const { logout, removeTokens } = AuthActions();

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();

        navigate("/");
      })
      .catch(() => {
        removeTokens();
        navigate("/");
      });
  };

  const content = (
    <PopoverContent>
      <div className="px-2 pb-2">
        <div className="text-medium font-semibold px-5 py-2 text-center">{username}</div>
        <Divider className="w-full bg-zinc-300" />
        <div className="flex flex-col">
          <Button
            variant="light"
            onClick={() => navigate(`/profile/${username}`)}
            className="text-medium mt-2"
          >
            Profile
          </Button>
          <Button variant="light" onClick={() => navigate(`/profile/${username}/edit`)} className="text-medium w-full">
            Edit Profile
          </Button>
          <Button
            variant="light"
            color="danger"
            className="text-medium w-full"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
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
        <div className="flex-1 flex justify-end items-center flex-row">
          <ThemeSwitcher />
          <Badge content="3" shape="circle" color="danger" className="">
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="light"
              onClick={() => navigate("/notifications")}
            >
              <IconBell size={24} />
            </Button>
          </Badge>
          <Popover key="bottom-end" placement="bottom-end">
            <PopoverTrigger>
              <Avatar
                as="button"
                isBordered
                color="success"
                src="https://nextui.org/avatars/avatar-1.png"
                className="ml-4"
              />
            </PopoverTrigger>
            {content}
          </Popover>
        </div>
      </Card>
    </div>
  );
}
