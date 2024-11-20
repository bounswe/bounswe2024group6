import { Popover, PopoverTrigger, PopoverContent, Avatar, Card, Input, Button, Divider } from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const username = "oktay_ozel";

  const content = (
    <PopoverContent>
      <div className="px-2 pb-2">
        <div className="text-medium font-semibold px-5 py-2">{username}</div>
        <Divider className="w-full bg-zinc-300" />
        <div className="flex flex-col">
          <Button variant="light" onClick={() => navigate(`/profile/${username}`)} className="text-medium mt-2">Profile</Button>
          <Button variant="light" className="text-medium w-full">Edit Profile</Button>
          <Button variant="light" color="danger" className="text-medium w-full">Log out</Button>
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
        <div className="flex-1 flex justify-end items-center">
          <Popover key="bottom-end" placement="bottom-end">
            <PopoverTrigger>
              <button>
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

