import { useEffect } from "react";
import Navbar from "../components/common/navbar.tsx";
import NotificationCard from "../components/notification/notification-card.tsx";
import axios from "axios";
import { BASE_URL } from "../lib/baseURL";
import { AuthActions } from "../components/auth/utils.tsx";

export default function Notifications() {
  const { getToken } = AuthActions();
  const token = getToken("access");
  const notifications = [
    {
      id: "1233",
      content: "alitariksahin liked your post.",
      timePassed: "1h ago",
    },
    {
      id: "1245",
      content: "elifndeniz solved your quiz.",
      timePassed: "2h ago",
    },
    {
      id: "1257",
      content: "oktayozel started following you.",
      timePassed: "1d ago",
    },
  ];

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/user-activities-as-object/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Navbar />
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
