import {useEffect, useRef, useState} from "react";
import Header from "../../components/header/Header.jsx";
import RoomsPageStyle from "./RoomsPage.module.css";
import ListOfRoomCards from "../../components/listOfRoomCards/ListOfRoomCards.jsx";
import Button from "../../components/button/button.jsx";
import {connectWS, disconnectWS, onSetRooms} from "../../services/socketio/index.js";
import CreateRoomModal from "../../components/createRoomModal/CreateRoomModal.jsx";

export const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = connectWS();
    fetchRooms();
    fakeLogin();
    // const onroomJOINCleanUp = onJoinedRoom(socket.current, (args) => {
    //   setRooms(args.roomUserList)
    // })
    // const onSetRoomsCleanUp = onSetRooms(socket.current, (args) => {
    //   setRooms(args.rooms)
    // })

    const onSetRoomsCleanUp = onSetRooms(socket.current, (args) => {
      setRooms(args.rooms)
    })

    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      localStorage.setItem("googleToken", atob(token));
      setShowModal(true);
    }

    return () => {
      // onroomJOINcleanup()
      onSetRoomsCleanUp()
      disconnectWS(socket.current);
      socket.current = null;
    };
  }, []);

  const fakeLogin = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": "random.mail@gmail.com",
        "username": "sampleUsername",
        "password": "samplePassword",
        "room": "random",
      }),
    });
    const json_response = await response.json();
    localStorage.setItem("userUuid", json_response.uuid);
  };

  const fetchRooms = async () => {
    const response = await fetch("/api/rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json_response = await response.json();
    setRooms(json_response.rooms);
  };

  const handleClick = async () => {
    const googleToken = localStorage.getItem("googleToken");
    if (!googleToken) {
      location = "/api/google/login";
    } else {
      setShowModal(true);
    }
  };

  return (
    <section className={RoomsPageStyle.page}>
      <Header/>
      <h1 className={RoomsPageStyle.title}>Rooms</h1>
      <Button
        text={"Create Room"}
        onClick={async () => {
          await handleClick();
        }}/>
      <ListOfRoomCards rooms={rooms}/>
      {showModal && <CreateRoomModal
        socket={socket}
        onClose={async () => {
          setShowModal(false);
        }}/>}
    </section>
  );
};
