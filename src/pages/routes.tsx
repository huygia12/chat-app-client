import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import PageNotFound from "./PageNotFound";
import UserLayout from "@/layout/UserLayout";
import Unauthorized from "./Unauthorized";
import Homepage from "./Homepage";
import Signup from "./Signup";
import ProtectedRoute from "@/components/effect/ProtectedRoute";
import Role from "@/entities/enums/Role";
import AdminLayout from "@/layout/AdminLayout";

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
