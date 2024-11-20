import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Navigate, RouterProvider } from "react-router-dom";
import { typesafeBrowserRouter } from "react-router-typesafe";

import Quizzes from "./pages/quizzes.tsx";
import Quiz from "./pages/quiz.tsx";
import Forum from "./pages/forum.tsx";
import Post from "./pages/post.tsx";
import Profile from "./pages/profile.tsx";
import Browse from "./pages/browse.tsx";
import ComposePost from "./pages/compose-post.tsx";
import QuizEnd from "./pages/quiz-end.tsx";
import QuizDetails from "./pages/quiz-details.tsx";
import Notifications from "./pages/notifications.tsx";
import "./index.css";


const { router } = typesafeBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/forum" replace />,
  },
  {
    path: "/quizzes",
    Component: Quizzes,
  },
  {
    path: "/quiz/:quizID",
    Component: Quiz,
  },
  {
    path: "/quiz/:quizID/details",
    Component: QuizDetails,
  },
  {
    path: "/quiz/:quizID/end",
    Component: QuizEnd,
  },
  {
    path: "/forum",
    Component: Forum,
  },
  {
    path: "/post/:postID",
    Component: Post,
  },
  {
    path: "/compose-post",
    Component: ComposePost,
  },
  {
    path: "/profile/:username",
    Component: Profile,
  },
  {
    path: "/browse",
    Component: Browse,
  },
  {
    path: "/notifications",
    Component: Notifications,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
