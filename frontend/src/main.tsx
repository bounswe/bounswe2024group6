import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Navigate, RouterProvider } from "react-router-dom";
import { typesafeBrowserRouter } from "react-router-typesafe";
import { Quizzes, Quiz, Forum, Post, Profile, Browse } from "./pages";
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
    path: "/forum",
    Component: Forum,
  },
  {
    path: "/post/:postID",
    Component: Post,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/profile/:username",
    Component: Profile,
  },
  {
    path: "/browse",
    Component: Browse,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
