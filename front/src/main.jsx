import {createRoot} from 'react-dom/client';
import './index.css';
import React from 'react';
import {createBrowserRouter, RouterProvider, useParams} from "react-router-dom";
import Room from "./components/Room.jsx";
import RoomList from "./components/RoomList.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/room/:roomName",
    element: <RoomPage/>,
  },
  {
    path: "/room-list",
    element: <RoomListPage/>,
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
  return <Room roomName={roomName}/>;
}

function RoomListPage() {
  let {rooms} = useParams();
  return <RoomList rooms={rooms}/>;
}
