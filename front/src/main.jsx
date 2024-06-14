import {createRoot} from 'react-dom/client';
import './index.css';
import React from 'react';
import {createBrowserRouter, RouterProvider, useParams} from "react-router-dom";
import Room from "./pages/room/RoomPage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import RoomsPage from "./pages/rooms/RoomsPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/room-list",
        element: <Rooms/>,
    },
    {
        path: "/room/:roomName",
        element: <RoomPage/>,
    },
]);
createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    );

function Login() {
    return <LoginPage/>;
}

function RoomPage() {
    // Extract roomName from URL params
    let {roomName} = useParams();
   // let roomName="Pizza"
    return <Room roomName={roomName}/>;
}

function Rooms() {
    let {rooms} = useParams();
    return <RoomsPage rooms={rooms}/>;
}
