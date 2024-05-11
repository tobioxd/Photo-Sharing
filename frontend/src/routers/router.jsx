import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../screen/Home";
import UserDetail from "../components/userDetail/userDetail";
import EditInfo from "../components/home/EditInfo";
import SignUp from "../components/home/Signup";
import LogIn from "../components/home/LogIn";
import LogOut from "../components/home/LogOut";
import ForgotPassword from "../components/home/ForgotPassword";
import ResetPassword from "../components/home/ResetPassword";
import Photo from "../components/singlePhoto";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user/:id",
        element: <UserDetail />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "updateinfo",
        element: <EditInfo />,
      },
      {
        path: "logout",
        element: <LogOut />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/photos/:id",
        element: <Photo />,
      }
    ],
    },
]);

export default router;
