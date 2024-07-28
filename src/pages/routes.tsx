import { createBrowserRouter } from "react-router-dom";
import Login from "./login";
import PageNotFound from "./page-not-found";
import UserLayout from "@/layout/user-layout";
import Unauthorized from "./unauthorized";
import Homepage from "./home-page";
import Signup from "./signup";
import ProtectedRoute from "@/components/effect/protected-route";
import Role from "@/entities/enums/role";
import AdminLayout from "@/layout/admin-layout";
import UserExistedCheck from "@/components/effect/user-existed-check";
import ChatPage from "./chat-page";
import Playground from "./play-ground";

const routes = createBrowserRouter([
  {
    path: "login",
    element: (
      <UserExistedCheck>
        <Login />
      </UserExistedCheck>
    ),
  },
  {
    path: "signup",
    element: (
      <UserExistedCheck>
        <Signup />
      </UserExistedCheck>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={[Role.ADMIN, Role.USER]}>
        <UserLayout />
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "messages",
        element: <ChatPage />,
      },
      {
        path: "test",
        element: <Playground />,
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute allowedRoles={[Role.ADMIN]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <></>,
      },
    ],
  },
]);

export default routes;
