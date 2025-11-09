import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../auth/Login/Login";
import SignUp from "../auth/SignUp/SignUp";
import AddTransaction from "../pages/AddTransaction/AddTransaction";
import MyTransaction from "../pages/MyTransaction/MyTransaction";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Reports from "../pages/Reports/Reports";
import PrivetRoutes from "./PrivetRoutes";
import MyProfile from "../pages/MyProfile/Myprofile";
import TransactionDetails from "../pages/TransactionDetails/TransactionDetails";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/add-transaction",
        element: (
          <PrivetRoutes>
            <AddTransaction />
          </PrivetRoutes>
        ),
      },
      {
        path: "/my-transactions",
        element: (
          <PrivetRoutes>
            <MyTransaction />
          </PrivetRoutes>
        ),
      },
      {
        path: "/reports",
        element: (
          <PrivetRoutes>
            <Reports />
          </PrivetRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivetRoutes>
            <MyProfile></MyProfile>
          </PrivetRoutes>
        ),
      },
      {
        path: "/transaction-details/:id",
        element: (
          <PrivetRoutes>
            <TransactionDetails />
          </PrivetRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://financeflow-tau-eight.vercel.app/addtranstion/${params.id}`
          ),
      },
    ],
  },
]);
