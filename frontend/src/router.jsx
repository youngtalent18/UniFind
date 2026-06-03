import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./Componnets/layout/MainLayout";
import AuthLayout from "./Componnets/layout/AuthLayout";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/RegisterPage";
import NotFound from "./Pages/NotFound";
import FeedPage from "./Pages/FeedPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/feed",
        element: <FeedPage />,
      },
    ],
  },

  {
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  // fallback route
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;