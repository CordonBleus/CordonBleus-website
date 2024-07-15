import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Room from "./pages/room/RoomPage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import { RoomsPage } from "./pages/rooms/RoomsPage.jsx";
import { RegisterPage } from "./pages/register/RegisterPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        Component: RegisterPage,
    },
    {
        path: "/room-list",
        Component: RoomsPage,
    },
    {
        path: "/room/:roomName",
        element: <Room/>,
    },
]);

createRoot(document.getElementById("root"))
    .render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    );
