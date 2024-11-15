import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Quizzes from "./pages/quizzes.tsx";
import Quiz from "./pages/quiz.tsx";
import Forum from "./pages/forum.tsx";
import Post from "./pages/post.tsx";
import Profile from "./pages/profile.tsx";
import Browse from "./pages/browse.tsx";
import ComposePost from "./pages/compose-post.tsx";
import Home from "./pages/home.tsx";
import ProtectedRoute from "./components/auth/protect-routes.tsx";
import "./index.css";

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
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);

