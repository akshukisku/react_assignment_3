import { createBrowserRouter } from "react-router-dom";
import Login from "../layout/Login";
import Register from "../layout/Register";
import HomeWrapper from "../layout/HomeWrapper";
import AdminWrapper from "../layout/admin/AdminWrapper";
import Dashboard from "../layout/admin/Dashboard";
import UserWrapper from "../layout/user/UserWrapper";
import UserDashboard from "../pages/user/UserDashboard";
import UserProtected from "../components/UserProtected";
import AdminProtected from "../components/AdminProtected";
import User from "../pages/admin/User";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeWrapper />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminProtected />,
    children: [
      {
        element: <AdminWrapper />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path:"user",
            element:<User/>
          }
        ],
      },
    ],
  },
  {
    path: "/user",
    element: <UserProtected />,
    children: [
      {
        element: <UserWrapper />,
        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
          },
        ],
      },
    ],
  },
]);

export default Routes;
