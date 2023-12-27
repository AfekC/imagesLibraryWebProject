import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../components/Login/login";
import { Profile } from "../components/Profile/profile";

export const router = createBrowserRouter([
    {
        path: "*",
        element: <Navigate to='/login' />,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/profile",
        element: <Profile/>,
    }
]);
