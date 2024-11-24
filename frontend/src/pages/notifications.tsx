import { useEffect, useState } from "react";
import Navbar from "../components/common/navbar.tsx";
import NotificationCard from "../components/notification/notification-card.tsx";
import axios from "axios";
import { BASE_URL } from "../lib/baseURL";
import { AuthActions } from "../components/auth/utils.tsx";
import { formatTimeAgo } from "../components/common/utils.tsx";
import { Card } from "@nextui-org/react";
import { IconChevronDown } from "@tabler/icons-react";

export default function Notifications() {
  const { getToken } = AuthActions();
  const token = getToken("access");
  const [notifications, setNotifications] = useState([]);

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

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex justify-center">
        <Card className="py-1 pl-4 pr-3 rounded-full">
          <div className="flex gap-1 items-center text-default-600">
            <div>Notifications</div>
            <IconChevronDown size={20} />
          </div>
        </Card>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            content={notification.content}
            timePassed={notification.timePassed}
          />
        ))}
      </div>
    </div>
  );
}
