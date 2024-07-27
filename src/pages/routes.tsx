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
import ChatPage from "./chat-page";
import MailPage from "./mail-page";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "messages",
        element: <ChatPage />,
      },
      {
        path: "test",
        element: <MailPage />,
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
