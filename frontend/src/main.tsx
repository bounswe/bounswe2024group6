import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { typesafeBrowserRouter } from 'react-router-typesafe';
import { Home, Feed, Profile, Architect, Building, Style } from './pages/index'
import './index.css'
import Browse from './pages/Browse'

const { router, href } = typesafeBrowserRouter([
  {
    path: "/",
    Component: Home
  },
  {
    path: "/feed",
    Component: Feed
  },
  {
    path: "/profile/:username",
    Component: Profile
  },
  {
    path: "/wiki/architect/:qid",
    Component: Architect
  },
  {
    path: "/wiki/building/:qid",
    Component: Building
  },
  {
    path: "/wiki/style/:qid",
    Component: Style
  },
  {
    path: "/wiki/browse",
    Component: Browse
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
