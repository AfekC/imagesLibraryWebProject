import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../components/Login/login";
import { Profile } from "../components/Profile/profile";
import { ImageLibraryDisplay } from '../components/ImageLibraryDisplay/imageLibraryDIsplay'
import { ImageDisplay } from '../components/ImageDisplay/ImageDisplay';

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
    },
    {
        path: "/library",
        element: <ImageLibraryDisplay />,
    },
    {
        path: "/image/:imageId",
        element: <ImageDisplay />
    }
]);
