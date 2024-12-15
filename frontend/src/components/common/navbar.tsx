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
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { IconBell } from "@tabler/icons-react";
import { ThemeSwitcher } from "./theme-switcher";
import { AuthActions } from "../auth/utils";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../lib/baseURL";
import { convertProfileResponseToProfile, formatTimeAgo } from "./utils";
import NotificationCard from "../notification/notification-card";
import GuestAuthModal from "../auth/guest-auth-modal";
import { Profile, ProfileResponse } from "../../types";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const username = Cookies.get("username");

  const { logout, removeTokens, getToken } = AuthActions();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const token = getToken("access");
  const isGuest = !token;
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsViewed, setIsNotificationsViewed] = useState(false);
  const [search, setSearch] = useState("");
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setIsNotificationsViewed(true);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      setIsLoading(true);
      axios
        .get(`${BASE_URL}/profile/${username}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data: ProfileResponse = response.data;
          console.log("profile",data);
          setProfileImage(response.data.profile_picture);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [username, token]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user-activities-as-object/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.activities);
        setNotifications(
          response.data.activities.map((activity, i) => ({
            id: i,
            content:
              activity.verb == "followed" ? (
                <div>
                  <a
                    href={`/profile/${activity.actor}`}
                    className="text-blue-500"
                  >
                    {activity.actor}
                  </a>{" "}
                  followed you
                </div>
              ) : activity.verb == "liked" ? (
                <div>
                  <a
                    href={`/profile/${activity.actor}`}
                    className="text-blue-500"
                  >
                    {activity.actor}
                  </a>{" "}
                  liked your{" "}
                  <a
                    href={`/post/${activity.object_id}`}
                    className="text-blue-500"
                  >
                    post
                  </a>
                </div>
              ) : (
                <div>Unknown activity</div>
              ),
            timePassed: formatTimeAgo(activity.timestamp),
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  function handleSearch(query) {
    navigate(`/browse?q=${query}`);
    navigate(0);
  }

  const content = (
    <PopoverContent>
      <div className="px-2 pb-2">
        <div className="text-medium font-semibold px-5 py-2 text-center">
          {isGuest ? "Guest" : username}
        </div>
        <Divider className="w-full bg-zinc-300" />
        <div className="flex flex-col">
          {!isGuest ? (
            <>
              <Button
                variant="light"
                onClick={() => navigate(`/profile/${username}`)}
                className="text-medium mt-2"
              >
                Profile
              </Button>
              <Button
                variant="light"
                onClick={() => navigate(`/profile/${username}/edit`)}
                className="text-medium w-full"
              >
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
            </>
          ) : (
            <Button
              variant="light"
              onClick={() => setGuestModalOpen(true)}
              className="text-medium mt-2"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </PopoverContent>
  );

  return (
    <div className="w-screen p-2 shadow-none" data-testid="navbar">
      <GuestAuthModal isOpen={guestModalOpen} setIsOpen={setGuestModalOpen} />
      <Card className="flex flex-row w-full px-5 py-3 rounded-full shadow-md">
        <div className="flex-1 flex flex-row gap-6 items-center">
          <Link
            className="text-blue-800 text-3xl font-semibold transition-transform duration-300 hover:scale-105 inline-block"
            to="/forum"
          >
            bu<span className="text-blue-600">lingo</span>
          </Link>
          <Input
            type="text"
            placeholder="Browse..."
            variant="flat"
            size="sm"
            className="w-64"
            radius="full"
            value={search}
            onValueChange={setSearch}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearch(search);
              }
            }}
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
          {!isGuest && (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  radius="full"
                  isIconOnly
                  aria-label="more than 99 notifications"
                  variant="light"
                  onClick={() => setIsNotificationsViewed(true)}
                >
                  {!isNotificationsViewed ? (
                    <Badge content="" shape="circle" color="danger" size="sm">
                      <IconBell size={24} />
                    </Badge>
                  ) : (
                    <IconBell size={24} />
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with description"
                className="max-h-[360px] overflow-y-auto"
              >
                <DropdownSection title="Notifications" showDivider>
                  {notifications.map((notification) => (
                    <DropdownItem isReadOnly className="cursor-default">
                      <NotificationCard
                        key={notification.id}
                        content={notification.content}
                        timePassed={notification.timePassed}
                      />
                    </DropdownItem>
                  ))}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          )}

          <Popover key="bottom-end" placement="bottom-end">
            <PopoverTrigger>
              <Avatar
                as="button"
                isBordered
                color="success"
                src={profileImage || "https://nextui.org/avatars/avatar-1.png"}
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
