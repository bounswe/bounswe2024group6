import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Quizzes from "./pages/quizzes.tsx";
import Quiz from "./pages/quiz.tsx";
import Forum from "./pages/forum.tsx";
import Post from "./pages/post.tsx";
import Profile from "./pages/profile.tsx";
import Browse from "./pages/browse.tsx";
import ComposePost from "./pages/compose-post.tsx";
import QuizEnd from "./pages/quiz-end.tsx";
import QuizDetails from "./pages/quiz-details.tsx";
import QuizCreation from "./pages/quiz-creation.tsx";
import Home from "./pages/home.tsx";
import ProtectedRoute from "./components/auth/protect-routes.tsx";
import "./index.css";
import ProfileUpdate from "./pages/profile-update.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quizzes",
    element: (
      <ProtectedRoute>
        <Quizzes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz/:quizID",
    element: (
      <ProtectedRoute>
        <Quiz />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz/:quizID/details",
    element: (
      <ProtectedRoute>
        <QuizDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz/:quizID/end",
    element: (
      <ProtectedRoute>
        <QuizEnd />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz/:quizID/details",
    element: (
      <ProtectedRoute>
        <QuizDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-quiz",
    element: (
      <ProtectedRoute>
        <QuizCreation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz/:quizID/end",
    element: (
      <ProtectedRoute>
        <QuizEnd />
      </ProtectedRoute>
    ),
  },
  {
    path: "/forum",
    element: (
      <ProtectedRoute>
        <Forum />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post/:postID",
    element: (
      <ProtectedRoute>
        <Post />
      </ProtectedRoute>
    ),
  },
  {
    path: "/compose-post",
    element: (
      <ProtectedRoute>
        <ComposePost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/:username",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/:username/edit",
    element: (
      <ProtectedRoute>
        <ProfileUpdate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/browse",
    element: (
      <ProtectedRoute>
        <Browse />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <RouterProvider router={router} />
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>
);

