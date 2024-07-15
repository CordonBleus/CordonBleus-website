import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header.jsx";
import RoomsPageStyle from "./RoomsPage.module.css";
import ListOfRoomCards from "../../components/listOfRoomCards/ListOfRoomCards.jsx";
import Button from "../../components/button/button.jsx";
import { useNavigate } from "react-router-dom";
import { connectWS, disconnectWS, joinRoom } from "../../services/socketio/index.js";
import CreateRoomModal from "../../components/createRoomModal/CreateRoomModal.jsx";

export const RoomsPage = () => {
  const [rooms, setRooms] = useState([])
  const [showModal, setShowModal] = useState(false)
  const socket = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.current = connectWS()
    fetchRooms()
    fakeLogin()
    // const onroomJOINCleanUp = onJoinedRoom(socket.current, (args) => {
    //   setRooms(args.roomUserList)
    // })
    // const onSetRoomsCleanUp = onSetRooms(socket.current, (args) => {
    //   setRooms(args.rooms)
    // })

    const url = new URL(window.location.href)
    const token = url.searchParams.get('token')
    if (token) {
      localStorage.setItem('googleToken', atob(token))
      setShowModal(true)
    }

    return () => {
      // onroomJOINcleanup()
      // onSetRoomsCleanUp()
      disconnectWS(socket.current)
      socket.current = null
    }
  }, []);

  const fakeLogin = async () => {
    const response = await fetch(import.meta.env.VITE_API_URI + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": "gotaga.gros+caca@gmail.com",
        "username": "ZroGizi",
        "password": "ZroGizi",
        "room": "random"
      })
    })
    const json_response = await response.json();
    localStorage.setItem('userUuid', json_response.uuid);
  }

  const fetchRooms = async () => {
    const response = await fetch(import.meta.env.VITE_API_URI + "/rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const json_response = await response.json();
    setRooms(json_response.rooms)
  }

  const handleClick = async () => {
    const googleToken = localStorage.getItem('googleToken')
    if (!googleToken) {
      location = import.meta.env.VITE_API_URI + '/api/google/login'
    } else {
      setShowModal(true)
    }
  }

  const createRoom2 = async (roomName, roomDescription) => {
    if (socket.current == null) return;
    const userUuid = localStorage.getItem("userUuid")
    joinRoom(
      socket.current,
      userUuid,
      roomName,
      roomDescription,
      "1",
      'https://meet.google.com/new'
    )
    // navigate(`/room/${roomName}`)
  };

  // const createRoom = async () => {
  //   const response = await fetch(import.meta.env.VITE_API_URI + '/api/meet', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       type: 'authorized_user',
  //       refresh_token: localStorage.getItem('googleToken'),
  //       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  //       client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET
  //     })
  //   })
  //   const result = await response.json()
  //   console.log(result)
  //
  //   rooms.push({
  //     id: result.roomName.substring(result.roomName.indexOf('/') + 1, result.roomName.length),
  //     meetingUrl: result.meetingUri,
  //     title: "Lorem Ipsum Title",
  //     description: "Lorem Ipsum Dolor Sit Amet Description",
  //     time: "60 min"
  //   })
  //   setRooms([...rooms])
  // }

  return (
    <section className={RoomsPageStyle.page}>
      <Header />
      <h1 className={RoomsPageStyle.title}>Rooms</h1>
      <Button text={"Create Room"} onClick={async () => {await handleClick()}}/>
      <Button text={"Create Room 2"} onClick={async () => {await createRoom2("La room remplis de CACA", "roomDescription")}}/>
      <ListOfRoomCards rooms={rooms} />
      {showModal && <CreateRoomModal onClose={async () => {
        setShowModal(false)
      }} />}
    </section>
  );
}