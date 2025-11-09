import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../auth/Login/Login";
import SignUp from "../auth/SignUp/SignUp";
import AddTransaction from "../pages/AddTransaction/AddTransaction";
import MyTransaction from "../pages/MyTransaction/MyTransaction";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Myprofile from "../pages/MyProfile/Myprofile";
import Reports from "../pages/Reports/Reports";
import PrivetRoutes from "./PrivetRoutes";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path:'/add-transaction',
        element: <PrivetRoutes><AddTransaction /></PrivetRoutes>
      },
      {
        path: '/my-transactions',
        Component: MyTransaction
      },
      {
        path: '/reports',
        Component: Reports
      },
      {
        path: '/profile',
        Component: Myprofile
      }
    ],
  },
]);
