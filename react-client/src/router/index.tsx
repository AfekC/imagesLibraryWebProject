import { createBrowserRouter } from "react-router-dom";
import { BaseCard } from "../components/BaseCard/BaseCard";
import { Login } from "../components/Login/login";
import { Profile } from "../components/Profile/profile";

export const router = createBrowserRouter([
    {
        path: "*",
        element: <BaseCard/>,
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
